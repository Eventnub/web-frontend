import React from 'react';
import Page from '../components/Page';
import Hero from '../components/about/Hero';
import Mission from '../components/about/Mission';
import Footer from '../components/home/Footer';
import OurPartners from '../components/about/OurPartners';

function About() {
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
