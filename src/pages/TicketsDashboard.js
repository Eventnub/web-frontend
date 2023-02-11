import React from 'react';
import Page from '../components/Page';
import Header from '../components/dashboard/Header';
import TicketsBar from '../components/dashboard/TicketsBar';
import Footer from '../components/home/Footer';

function TicketsDashboard() {
  return (
    <Page title="Dasboard">
      <Header />
      <TicketsBar />
      <Footer />
    </Page>
  );
}

export default TicketsDashboard;
