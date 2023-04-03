import { useLocation, Navigate } from 'react-router-dom';

import { PATH_AFTER_LOGIN } from '../config';

export default function AfterLoginRedirect() {
  const location = useLocation();

  // Extract the redirect URL param from the search string of the URL
  const redirectUrl = new URLSearchParams(location.search).get('redirectUrl');

  // Determine the destination URL after login
  const destinationUrl = redirectUrl || PATH_AFTER_LOGIN;

  // Redirect the user to the destination URL using the Navigate component
  return <Navigate to={destinationUrl} replace />;
}
