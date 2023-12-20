import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { logoText, logOutString, primaryColor, snackSuccessString } from 'utils/constant';
import { getRequest, removeLsItem } from 'utils/functions';
import { TReactChildren, UserData } from 'utils/types';

function Navbar({ children }: TReactChildren) {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userFirstLetter, setUserFirstLetter] = useState<string>();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    removeLsItem('token');
    navigate('/login');
    enqueueSnackbar(logOutString, {
      variant: snackSuccessString,
    });
  };
  const fetUserDetails = async () => {
    const userData = await getRequest('/users/me');
    console.log('userData', userData);
    setUserFirstLetter(userData.email[0]);
  };
  useEffect(() => {
    fetUserDetails();
  }, []);

  return (
    <>
      <AppBar position='static' sx={{ background: primaryColor }}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AdbIcon sx={{ mr: 1 }} />
                <Typography
                  variant='h6'
                  noWrap
                  component='a'
                  href='#app-bar-with-responsive-menu'
                  sx={{
                    mr: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  {logoText}
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'white', color: 'black' }}>{userFirstLetter}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogout} textAlign='center'>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component='main' sx={{ flexGrow: 1, padding: '1rem' }}>
        {children}
      </Box>
    </>
  );
}
export default Navbar;
