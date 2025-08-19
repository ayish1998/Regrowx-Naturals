import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
}