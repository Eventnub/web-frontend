import React from 'react';
import Hero from '../components/event/Hero';
import TicketSection from '../components/event/TicketSection';
import Page from '../components/Page';
import EventSection from '../components/event/EventSection';
import Footer from '../components/home/Footer';

export default function EventDetailsPage() {
  return (
    <Page title="Event Details">
      <Hero />
      <TicketSection />
      <EventSection />
      <Footer />
    </Page>
  );
}
