import React, { useEffect } from 'react';
import Page from '../components/Page';
import Hero from '../components/about/Hero';
import Mission from '../components/about/Mission';
import Footer from '../components/home/Footer';
import OurPartners from '../components/about/OurPartners';
import mixpanel from '../utils/mixpanel';

function About() {
  useEffect(() => {
    mixpanel.track('Page viewed', {
      page: window.location.pathname,
    });
  }, []);

  return (
    <Page title="About">
      <Hero />
      <Mission />
      <OurPartners />
      <Footer />
    </Page>
  );
}

export default About;
