import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SignupForm from '@/components/SignupForm';

export const metadata = {
  title: 'Sign Up - Regrowx | Start Your Hair Care Journey',
  description: 'Create your Regrowx account to access personalized hair analysis, traditional remedies, and join our community.',
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <SignupForm />
      </div>
      <Footer />
    </main>
  );
}