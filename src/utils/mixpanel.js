import mixpanel from 'mixpanel-browser';
import { MIXPANEL_API } from '../config';

mixpanel.init(MIXPANEL_API, { debug: true });

const track = (eventName, eventData) => {
  mixpanel.track(eventName, eventData);
};

export default { track };
