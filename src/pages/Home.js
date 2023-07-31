import { useEffect } from 'react';
import Concerts from '../components/home/Concerts';
import Hero from '../components/home/Hero';
import Page from '../components/Page';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import Footer from '../components/home/Footer';
import mixpanel from '../utils/mixpanel';

export default function HomePage() {
  useEffect(() => {
    mixpanel.track('Page viewed', {
      page: window.location.pathname,
    });
  }, []);

  return (
    <Page title="Home">
      <Hero />
      <Concerts />
      <About />
      <Testimonials />
      <Footer />
    </Page>
  );
}
