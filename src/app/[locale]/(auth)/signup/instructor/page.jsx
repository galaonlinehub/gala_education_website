import InstructorRegistrationForm from '@/components/ui/auth/signup/InstructorSignUpForm';

export default function InstructorSignUp() {
  return (
    <main className="min-h-full max-w-4xl flex flex-col justify-center mx-auto px-3 pt-5 pb-48">
      <section className="flex flex-col gap-2 justify-center items-center w-full mb-2">
        <span className="font-black text-xl sm:text-2xl">Sign Up</span>
        <span className="text-[12px] w-full text-center font-light hidden md:block">
          When registering with Gala, teachers undergo a vetting process to ensure only qualified
          candidates are selected, maintaining service quality. The first payment, which is
          non-refundable, serves as an application fee. Applications are processed within 2-3
          business days and may be approved or denied. Please note: All uploaded certificates must
          be certified by a registered Advocate to ensure their authenticity. Submissions without
          proper certification will not be accepted.
        </span>
      </section>
      <InstructorRegistrationForm />
    </main>
  );
}
