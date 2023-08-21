import React, { useEffect } from 'react';
import Page from '../components/Page';
import AboutUs from '../components/about/AboutUs';
import Purpose from '../components/about/Purpose';
import Footer from '../components/home/Footer';
import Partners from '../components/about/Partners';
import mixpanel from '../utils/mixpanel';
import GoogleAnalytics from '../utils/googleAnalytics';

function About() {
  useEffect(() => {
    mixpanel.track('Page viewed', {
      page: window.location.pathname,
    });
    GoogleAnalytics.trackPageView(window.location.pathname);
  }, []);

  return (
    <Page title="About">
      <AboutUs />
      <Purpose />
      <Partners />
      <Footer />
    </Page>
  );
}

export default About;
