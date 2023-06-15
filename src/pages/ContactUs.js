import React, { useEffect } from 'react';
import FormSection from '../components/contactUs/FormSection';
import Hero from '../components/contactUs/Hero';
import Page from '../components/Page';
import Footer from '../components/home/Footer';
import mixpanel from '../utils/mixpanel';

export default function ContactUs() {
  useEffect(() => {
    mixpanel.track('Page viewed', {
      page: window.location.pathname,
    });
  }, []);

  return (
    <Page title="Contact Us">
      <Hero />
      <FormSection />
      <Footer />
    </Page>
  );
}
