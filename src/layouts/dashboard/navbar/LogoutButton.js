// @mui
import { Button, Typography } from '@mui/material';
// hooks
import useFirebase from '../../../hooks/useFirebase';
//

export default function LogoutButton() {
  const { logout } = useFirebase();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Typography component={Button} onClick={handleLogout} variant="body2">
      Logout
    </Typography>
  );
}
