import Layout from '@/components/Layout';
import CheckoutForm from '@/components/CheckoutForm';

export default function CheckoutPage() {
  return (
    <Layout>
      <div className="pt-20">
        <CheckoutForm />
      </div>
    </Layout>
  );
}