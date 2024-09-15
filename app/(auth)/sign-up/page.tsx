import AuthForm from '@/components/shared/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';

const SignUp = async () => {
  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser);
  return (
    <section className='flex-center size-full max-sm:px-6'> 
      <AuthForm type="sign-up" />
    </section>
  )
}

export default SignUp