import Layout from '@/components/Layout';
import HairAnalysisForm from '@/components/HairAnalysisForm';

export default function HairAnalysisPage() {
  return (
    <Layout>
      <div className="pt-20">
        <HairAnalysisForm />
      </div>
    </Layout>
  );
}