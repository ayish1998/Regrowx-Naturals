import Layout from '@/components/Layout';
import StoryPage from '@/components/StoryPage';

export const metadata = {
  title: 'Our Story - Regrowx | African Hair Care Wisdom Meets AI Technology',
  description: 'Discover the inspiring journey of Regrowx - from traditional Ghanaian herbal wisdom to AI-powered hair analysis, empowering communities and transforming lives.',
};

export default function Story() {
  return (
    <Layout>
      <div className="pt-20">
        <StoryPage />
      </div>
    </Layout>
  );
}