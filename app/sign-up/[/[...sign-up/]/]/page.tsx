import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen page-header-bg flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 xl:px-10">
      <SignUp path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/checkout" />
    </div>
  )
}
