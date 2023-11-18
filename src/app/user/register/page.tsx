'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../components/Header';
import { Copyright } from '../../components/Copyright';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme(
    {
        palette: {
            mode: 'dark'
        }
    }
);

export default function BoardPage({ params }: { params: { id: string } }) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/users`, {
                method: 'POST',
                body: data,
            });
            if (response.ok) {
                window.location.href = '/login';
            } else {
                console.error('Error:', response.status, response.statusText);
                alert("登録に失敗しました");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("登録に失敗しました");
        }
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <ResponsiveAppBar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        User Registration
                    </Typography>
                    <Typography component="h5" variant="h5">
                        パスワードは、小文字、大文字、数字をそれぞれ1文字以上含み、総文字数が少なくとも6文字以上である必要があります。
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        type="email"
                                        id="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="image"
                                        label="image"
                                        type="file"
                                        id="image"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registration
                            </Button>
                        </form>
                    </Box>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}
