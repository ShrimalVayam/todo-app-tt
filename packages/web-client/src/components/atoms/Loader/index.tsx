import { Box, CircularProgress } from '@mui/material';
import { bgImage, loaderColor } from 'utils/constant';

const Loader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: loaderColor,
        backgroundImage: bgImage,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  );
};

export default Loader;
