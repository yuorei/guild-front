'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../components/Header';
import { defaultTheme } from '../theme';
import { Copyright } from '../components/Copyright';

export default function Teapot() {
    console.error('418 I\'m a teapot');
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <ResponsiveAppBar />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            418 I&#39;m a teapot
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            That the server refuses to brew coffee because it is, permanently, a teapot.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
                        </Stack>
                    </Container>
                </Box>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography> */}
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    yuorei GUILD
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider >
    );
}
