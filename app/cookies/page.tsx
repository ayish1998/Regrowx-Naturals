import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
              <p className="text-gray-600 mb-6">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit our website. They help us provide you with a better experience.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• <strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li>• <strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                <li>• <strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li>• <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <p className="text-gray-600 mb-6">
                You can control and manage cookies in your browser settings. Please note that removing 
                or blocking cookies may impact your user experience and parts of our website may no longer be accessible.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-6">
                We may use third-party services like Google Analytics to help us understand website usage. 
                These services may place their own cookies on your device.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about our use of cookies, please contact us at hello@regrowx.com
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}