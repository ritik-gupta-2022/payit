'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const formSchema = (type:string)=> z.object({
    // sign-up
    firstName: type==='sign-in' ? z.string().optional(): z.string().min(2, {
        message: "Lirstname must contain at least 2 characters.",
    }),
    lastName: type==='sign-in' ? z.string().optional():  z.string().min(2, {
        message: "Last name must contain at least 2 characters.",
    }),
    address1: type==='sign-in' ? z.string().optional(): z.string().min(5, {
        message: "Address must contain at least 5 characters.",
    }),
    city: type==='sign-in' ? z.string().optional(): z.string().min(5, {
        message: "City must contain at least 2 characters.",
    }),
    state: type==='sign-in' ? z.string().optional(): z.string().length(2, {
        message: "State must contain 2 characters.",
    }),
    postalCode: type==='sign-in' ? z.string().optional(): z.string().min(3).max(6),
    dateOfBirth: type==='sign-in' ? z.string().optional(): z.string().length(10,{
        message: "Please input correct date format",
    }),
    ssn: type==='sign-in' ? z.string().optional(): z.string().length(4,{
        message: "SSN must contain 4 characters.",
    }),
    // both
    email: z.string().email(),
    password:z.string().min(8, {
        message: "Password must contain at least 8 characters.",
    }),
})

const AuthForm = ({type}:{type:string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const AuthformSchema = formSchema(type)
      // 1. Define your form.
    const form = useForm<z.infer<typeof AuthformSchema>>({
        resolver: zodResolver(AuthformSchema),
        defaultValues: {
        email: "",
        password:"",
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit= async (data: z.infer<typeof AuthformSchema>)=> {
        setIsLoading(true);
        try{
            // sign-up with appwrite & create a plaid link token

            if(type==='sign-up'){
                const newUser = await signUp(data);
                setUser(newUser);
            }

            if(type==='sign-in'){
                const response = await signIn({
                    email:data.email,
                    password:data.password,
                })

                if(response){
                    router.push('/');
                }
            }
        }catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href='/' className='flex cursor-pointer image-center gap-2'>
                <Image alt='logo' src='/icons/logo.svg' width={34} height={34} />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>PayIt</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className='text-24 lg:text-36  font-semibold text-gray-900'>
                    {user ? 'Link Account' : type==='sign-in' ? 'Sign In' : 'Sign Up'}
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 
                            'Link your account to get started'
                            : 'Please enter your details'    
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ? (
            <div className="flex flex-col gap-4">
                {/* PlaidLink */}
            </div>
        ):(
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type==='sign-up' && (
                            <>
                                <div className="flex gap-4">
                                    <CustomInput form={form} name="firstName" placeholder="Enter your First Name" label="First Name"/>
                                    <CustomInput form={form} name="lastName" placeholder="Enter your Last Name" label="Last Name"/> 
                                </div>
                                    <CustomInput form={form} name="address1" placeholder="Enter your Address" label="Address"/> 
                                    <CustomInput form={form} name="city" placeholder="Enter your City" label="City"/> 
                                <div className="flex gap-4">
                                    <CustomInput form={form} name="state" placeholder="ex: UP" label="State"/>
                                    <CustomInput form={form} name="postalCode" placeholder="ex: 281406" label="Postal Code"/> 
                                </div> 
                                <div className="flex gap-4">
                                    <CustomInput form={form} name="dateOfBirth" placeholder="yyyy-mm-dd" label="DoB"/> 
                                    <CustomInput form={form} name="ssn" placeholder="ex: 1234" label="SSN"/>      
                                </div>
                            </>
                        )}
                        <CustomInput form={form} name="email" placeholder="Enter your email" label="Email"/>          
                        <CustomInput form={form} name="password" placeholder="Enter your password" label="Password"/>

                        <div className='flex flex-col gap-4'>
                            <Button type="submit" className='form-btn' disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp;
                                        Loading...
                                    </>
                                ): type==='sign-in' ?'Sign in' : 'Sign up'}
                            </Button>
                        </div>

                    </form>
                </Form>

                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>{type==='sign-in' ? "Don't have an account?" : "Already have an account?"}</p>
                    <Link href={type==='sign-in' ? '/sign-up' : "/sign-in"} className='form-link'>
                        {type==='sign-in' ? "Sign-up" : "Sign-in"}
                    </Link>
                </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm
