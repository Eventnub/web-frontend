import React from 'react';
import FormSection from '../components/contactUs/FormSection';
import Hero from '../components/contactUs/Hero';
import Page from '../components/Page';
import Footer from '../components/home/Footer';

export default function ContactUs() {
  return (
    <Page title="Contact Us">
      <Hero />
      <FormSection />
      <Footer />
    </Page>
  );
}
