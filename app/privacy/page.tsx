import Layout from '@/components/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="pt-20">
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-6">
                At Regrowx, we collect information you provide directly to us, such as when you create an account, 
                use our hair analysis service, make a purchase, or contact us for support.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Provide and improve our hair analysis services</li>
                <li>• Process transactions and send related information</li>
                <li>• Send you technical notices and support messages</li>
                <li>• Communicate with you about products, services, and events</li>
                <li>• Preserve traditional knowledge with proper attribution</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-6">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at hello@regrowx.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}