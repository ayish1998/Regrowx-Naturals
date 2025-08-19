import Layout from '@/components/Layout';
import SignupForm from '@/components/SignupForm';

export const metadata = {
  title: 'Sign Up - Regrowx | Start Your Hair Care Journey',
  description: 'Create your Regrowx account to access personalized hair analysis, traditional remedies, and join our community.',
};

export default function SignupPage() {
  return (
    <Layout>
      <div className="pt-20">
        <SignupForm />
      </div>
    </Layout>
  );
}