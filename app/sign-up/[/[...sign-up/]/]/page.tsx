import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen page-header-bg flex items-center justify-center px-5 py-16">
      <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/checkout" />
    </div>
  )
}
