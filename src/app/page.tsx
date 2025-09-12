import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Events from '@/components/Events';
import About from '@/components/About';
import Team from '@/components/Team';
import Partners from '@/components/Partners';
import DonationWidget from '@/components/DonationWidget';
import Social from '@/components/Social';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Events />
        <About />
        <Team />
        <Partners />
        <DonationWidget />
        <Social />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
