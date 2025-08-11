import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EducationHub from '@/components/EducationHub';

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <EducationHub />
      </div>
      <Footer />
    </main>
  );
}