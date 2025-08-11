import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HairAnalysisForm from '@/components/HairAnalysisForm';

export default function HairAnalysisPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <HairAnalysisForm />
      </div>
      <Footer />
    </main>
  );
}