import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen page-header-bg flex items-center justify-center px-5 py-16">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/checkout" />
    </div>
  )
}
