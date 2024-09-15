import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from '../ui/form'
import { Form, useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"

type nameType = 'email' | 'password' | 'firstName' | 'lastName' | 'address1' | 'state' | 'postalCode' | 'dateOfBirth' | 'ssn' | "city";
const CustomInput = ({form, name, label, placeholder}:{form:any , name:nameType , label:string, placeholder:string}) => {
  return (
    <FormField
        control={form.control}
        name= {name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>
                    {label}
                </FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            className='input-class'
                            type={name ==='password' ? 'password' : 'text'}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage className='form-message mt-2'/>
                </div>
            </div>
        )}
    />
  )
}

export default CustomInput