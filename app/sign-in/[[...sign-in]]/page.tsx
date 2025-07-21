import { SignIn } from '@clerk/nextjs'

const SigninPage = () => {
    return (
        <main className='flex items-center'>
            <SignIn />
        </main>
    )
}

export default SigninPage
