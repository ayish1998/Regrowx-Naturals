import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <Layout>
      <div className="pt-20">
        <ContactForm />
      </div>
    </Layout>
  );
}