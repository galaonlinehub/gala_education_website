import StudentContract from '@/components/student/StudentContract';
import SignUpForm from '@/components/ui/auth/signup/SignUpForm';

export default function StudentSignUp() {
  return (
    <main className="h-full flex flex-col items-center pt-6 md:pt-16 px-3">
      <section className="text-center mb-4">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Sign Up</div>
        <p className="text-xs xs:text-sm text-gray-600 w-4/4 text-center">
          Step into the realm of endless possibilities! Your adventure in knowledge begins here.
        </p>
      </section>
      <SignUpForm />
      <StudentContract/>
    </main>
  );
}
