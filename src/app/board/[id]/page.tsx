'use client';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { Board } from '../../model/model';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../components/Header';
import { Copyright } from '../../components/Copyright';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import { Avatar } from '@mui/material';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

export default function Board({ params }: { params: { id: string } }) {
    const [cookies, setCookie, removeCookie] = useCookies(["token", "userID"]);
    const [board, setBoard] = useState<Board | null>(null);
    const [comments, setComments] = useState<any | null>(null);
    const [count, setCount] = useState<number | null>(null);
    const [canRegistered, setCanRegistered] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/board/challenge/user/${params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`
                    },
                });

                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();
                const canRegisterValue = data.check as boolean;
                setCanRegistered(canRegisterValue);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/board/${params.id}`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const resBoard = await response.json();
                // data.boardにboardをつけているのはjsonの仕様につけているから
                setBoard(resBoard.board);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/board/challenge/count/${params.id}`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const count = await response.json();
                setCount(count.count);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/comment/post/user/${params.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`
                    },
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setComments(data.comments);
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };
        fetchData();
    }, [cookies.token, params.id]);

    const register = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/board/challenge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.token}`
                },
                body: JSON.stringify({
                    board_id: params.id,  // Assuming you need to send the board ID in the request body
                    // Add other necessary data for registration
                }),
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            window.location.href = '/';
        } catch (error) {
            console.error('Error registering:', error);
            alert('登録に失敗しました');
        }
    };

    const finished = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/board/finished/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.token}`
                },
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            window.location.reload();
        } catch (error) {
            console.error('Error registering:', error);
            alert('終了に失敗しました');
        }
    };

    const defaultTheme = createTheme(
        {
            palette: {
                mode: 'light'
            }
        }
    );

    function convertDateFormat(input: string): string {
        const date = new Date(input);
        // 今より前の時間の場合は募集終了と返す
        if (date.getTime() <= Date.now()) {
            return "募集終了";
        }
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}年${month}月${day}日`;
    }

    function postComment() {
        const comment = document.getElementById("comment") as HTMLInputElement;
        if (comment.value === "") {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_GUILD_API}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookies.token}`
                    },
                    body: JSON.stringify({
                        user_id: cookies.userID,
                        post_id: params.id,
                        content: comment.value,
                    }),
                });
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Error:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching article data:', error);
            }
        };
        fetchData();
    }

    const convertedDate = convertDateFormat(board?.endDate || '');
    return (
        <>
            <ResponsiveAppBar />
            <ThemeProvider theme={defaultTheme}>
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
                        <Card
                            // sx={{ height: '300%', width: '300%', display: 'flex', flexDirection: 'column' }}
                            sx={{ width: '100%' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={board?.imageURL ? board?.imageURL : "https://source.unsplash.com/random?wallpapers"}//"https://source.unsplash.com/random?wallpapers"//{card.imageURL}//"https://source.unsplash.com/random?wallpapers"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h2" component="h1">
                                    {board?.title}
                                </Typography>
                                <Typography gutterBottom variant="h2">
                                    {board?.reward}円
                                </Typography>
                                <Typography gutterBottom variant="h4">
                                    定員: {count}/{board?.max}人
                                </Typography>
                                <Typography gutterBottom variant="h4">
                                    難易度: {board?.level}
                                </Typography>
                                <Typography gutterBottom variant="h4">
                                    終了: {convertedDate}
                                </Typography>
                                <Typography gutterBottom variant="h4">
                                    説明: {board?.description}
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={board?.user_id == cookies.userID ? finished : register}
                                    fullWidth
                                    disabled={!canRegistered || convertedDate === "募集終了" || count !== null && board?.max !== undefined && count >= board.max && board?.user_id !== cookies.userID || board?.finished}
                                >
                                    {board?.finished ? "Finished" :
                                        (cookies.userID === undefined ? "ログインしてください" :
                                            (canRegistered ?
                                                (board?.user_id === cookies.userID ? "Finish" : "Challenge") :
                                                (board?.user_id === cookies.userID ? "Finished" : "Registered")
                                            )
                                        )
                                    }
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Card
                            sx={{ width: '100%' }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h2" component="h1" align="center">
                                    コメント
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="comment"
                                    label="comment"
                                    name="comment"
                                    autoComplete="comment"
                                    autoFocus
                                />
                                <Button
                                    variant="contained"
                                    onClick={postComment}
                                    fullWidth
                                >
                                    投稿
                                </Button>
                                <Typography gutterBottom variant="h4">
                                    {comments?.map((comment: any, index: number) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                            <Link href={`/user/profile/${comment.commenter.id}`} underline="none">
                                                <Avatar
                                                    alt={comment.commenter.name}
                                                    src={comment.commenter.profileImageURL}
                                                    sx={{ width: 80, height: 80, marginRight: '16px' }}
                                                />
                                            </Link>
                                            <div>
                                                <Typography gutterBottom variant="h4">
                                                    {comment.commenter.name}: {comment.content}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Card>
                        <Copyright />
                    </Card>
                </Container>
            </ThemeProvider>
        </>
    );
};
