import Layout from '@/components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="pt-20">
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using Regrowx services, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Services</h2>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• You must be at least 18 years old to use our services</li>
                <li>• You agree to provide accurate information for hair analysis</li>
                <li>• You will not misuse our AI analysis technology</li>
                <li>• You respect the traditional knowledge we preserve and share</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
              <p className="text-gray-600 mb-6">
                Our products are made with traditional Ghanaian herbs and are ethically sourced from 
                local farming cooperatives. Results may vary based on individual hair conditions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-600 mb-6">
                We respect and properly attribute traditional knowledge to its cultural origins. 
                Our AI technology and platform are proprietary to Regrowx.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                For questions about these Terms of Service, contact us at hello@regrowx.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}