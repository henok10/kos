import { BottomNavigation, Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';

const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Konten utama di sini */}
      <Box sx={{ minHeight: 'calc(100vh - 56px)', paddingBottom: '56px' }}>
        {/* Isi konten utama Anda di sini */}

      </Box>

      {/* Bottom Navigation */}
      <Paper
        sx={{
          position: 'static',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '4rem'
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ width: '100%' }} // Pastikan lebar BottomNavigation mengisi seluruh lebar parent (Paper)
        >
          <Box margin='auto'>
            <Typography style={{ margin: 'auto', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              &copy;{new Date().getFullYear()} KOS SAYA | All rights reserved | Terms Of Service | Privacy
            </Typography>
          </Box>
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
