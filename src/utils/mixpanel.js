import mixpanel from 'mixpanel-browser';
import { MIXPANEL_API } from '../config';
import { isProduction } from './environment';

mixpanel.init(MIXPANEL_API, { debug: true });

const track = (eventName, eventData) => {
  if (isProduction()) {
    mixpanel.track(eventName, eventData);
  }
};

export default { track };
