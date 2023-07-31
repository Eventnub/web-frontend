export const getUserOS = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return 'iOS';
  }

  return 'Others';
};
