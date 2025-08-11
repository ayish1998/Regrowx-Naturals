import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommunitySection from '@/components/CommunitySection';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <CommunitySection />
      </div>
      <Footer />
    </main>
  );
}