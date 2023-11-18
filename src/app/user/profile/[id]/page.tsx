'use client';
import { useEffect, useState } from 'react';
import { User } from '../../../model/model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../../components/Header';
import { defaultTheme } from '../../../theme';
import { Copyright } from '../../../components/Copyright';

export default function Profile({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/users/${params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };
        fetchData();
    }, [params.id]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <ResponsiveAppBar />
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Avatar alt={user?.name} src={user?.profileImageURL} sx={{ width: 80, height: 80 }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">{user?.name}</Typography>
                                    {/* <Typography color="textSecondary">{user?.email}</Typography> */}
                                    <Typography variant="h6">ランク: {user?.rank}</Typography>
                                    <Typography variant="h6">達成数: {user?.total_achievements}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Copyright />
        </ThemeProvider>
    );
}
