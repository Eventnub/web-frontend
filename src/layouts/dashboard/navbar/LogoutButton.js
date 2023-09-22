import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import useFirebase from '../../../hooks/useFirebase';

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
    <Button
      onClick={handleLogout}
      variant="text"
      startIcon={<LogoutIcon />}
      sx={{
        fontWeight: '300',
        color: "error.main"
      }}
    >
      Logout
    </Button>
  );
}
