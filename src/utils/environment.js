export const isProduction = () => {
  const baseUrl = window.location.origin;
  if (baseUrl.indexOf('globeventnub.com') !== -1) {
    return true;
  }
  return false;
};

export const isStaging = () => {
  const baseUrl = window.location.origin;
  if (baseUrl.indexOf('netlify.app') !== -1) {
    return true;
  }
  return false;
};

export const isDevelopment = () => {
  const baseUrl = window.location.origin;
  if (baseUrl.indexOf('localhost') !== -1 || baseUrl.indexOf('127.0.0.1') !== -1) {
    return true;
  }
  return false;
};
