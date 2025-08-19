import Layout from '@/components/Layout';
import ShoppingCart from '@/components/ShoppingCart';

export default function CartPage() {
  return (
    <Layout>
      <div className="pt-20">
        <ShoppingCart />
      </div>
    </Layout>
  );
}