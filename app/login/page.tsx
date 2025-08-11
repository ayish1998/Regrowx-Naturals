import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Login - Regrowx | Access Your Hair Care Journey',
  description: 'Sign in to your Regrowx account to access personalized hair analysis, order history, and exclusive content.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <LoginForm />
      </div>
      <Footer />
    </main>
  );
}