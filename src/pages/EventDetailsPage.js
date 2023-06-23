import React from 'react';
import Hero from '../components/eventDetails/Hero';
import TicketSection from '../components/eventDetails/TicketSection';
import Page from '../components/Page';
import Footer from '../components/home/Footer';

export default function EventDetailsPage() {
  return (
    <Page title="Event Details">
      <Hero />
      <TicketSection />
      <Footer />
    </Page>
  );
}
