import Layout from '@/components/Layout';

export default function AccessibilityPage() {
  return (
    <Layout>
      <div className="pt-20">
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-600 mb-6">
                Regrowx is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Keyboard navigation support</li>
                <li>• Screen reader compatibility</li>
                <li>• High contrast color schemes</li>
                <li>• Scalable text and images</li>
                <li>• Alternative text for images</li>
                <li>• Clear and consistent navigation</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Standards Compliance</h2>
              <p className="text-gray-600 mb-6">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. 
                These guidelines help make web content more accessible to people with disabilities.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback and Support</h2>
              <p className="text-gray-600 mb-6">
                We welcome your feedback on the accessibility of our website. If you encounter any 
                accessibility barriers or have suggestions for improvement, please let us know.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="text-gray-600 space-y-2">
                <p>Email: accessibility@regrowx.com</p>
                <p>Phone: +233 (0) 123 456 789</p>
                <p>Address: Accra, Ghana</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}