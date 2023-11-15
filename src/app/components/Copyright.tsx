import { Typography, Link } from '@mui/material';
export function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://yuorei.com/">
                yuorei
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
