import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useFirebase from '../hooks/useFirebase';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useFirebase();
  const location = useLocation();

  if (isAuthenticated) {
    const redirectUrl = new URLSearchParams(location.search).get('redirectUrl');
    const destinationUrl = redirectUrl || PATH_DASHBOARD.root;
    return <Navigate to={destinationUrl} replace />;
  }

  return <>{children}</>;
}
