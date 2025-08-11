import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HairAnalysisResults from '@/components/HairAnalysisResults';

export const metadata = {
  title: 'Your Hair Analysis Results - Regrowx',
  description: 'View your personalized hair analysis results and get AI-powered product recommendations based on traditional Ghanaian wisdom.',
};

export default function HairAnalysisResultsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <HairAnalysisResults />
      </div>
      <Footer />
    </main>
  );
}