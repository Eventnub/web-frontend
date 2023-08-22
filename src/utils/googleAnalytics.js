import ReactGA4 from 'react-ga4';
import { isProduction } from './environment';

const GoogleAnalytics = {
  trackPageView: (page) => {
    if (isProduction()) {
      ReactGA4.send({
        hitType: 'pageview',
        page,
      });
    }
  },
  trackEvent: (name, params) => {
    if (isProduction()) {
      ReactGA4.event(name, params);
    }
  },
};

export default GoogleAnalytics;
