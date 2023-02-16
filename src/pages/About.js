import React from 'react';
import Page from '../components/Page';
import Hero from '../components/about/Hero';
import Mission from '../components/about/Mission';
import Team from '../components/about/Team';
import Footer from '../components/home/Footer';

function About() {
  return (
    <Page title="About">
      <Hero />
      <Mission />
      <Team />
      <Footer />
    </Page>
  );
}

export default About;
