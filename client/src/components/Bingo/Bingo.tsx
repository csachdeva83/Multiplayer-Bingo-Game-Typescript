import React, { useState, useEffect } from 'react';
import { Button, Cell, Container, Grid } from './BingoStyle';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../service/socket-io';

const Bingo = () => {

    const { room } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState<Array<string>>(Array(25).fill(''));
    const [read, setRead] = useState(false);

    const exitGame = () => {
        socket.emit('leaveRoom', room, socket.id);
    };

    const changeColor = (idx: number) => {
        if (read) {
            const duplicateBoard = board.slice();

            if (duplicateBoard[idx] !== 'X') {
                duplicateBoard[idx] = 'X';
                setBoard(duplicateBoard);
            }
        }
    };

    const playerReady = () => {
        console.log(board);
        setRead(true);
        socket.emit('playerReady', room, socket.id);
    };

    useEffect(() => {

        socket.on('roomLeft', (socketId) => alert(`${socketId} left room ${room}`));
        socket.on('leaveBingoPage', () => navigate('/home'));
        socket.on('playerReady', (socketId: string) => alert(`${socketId} is ready!`));

        return () => {
            socket.off('roomLeft');
            socket.off('playerReady');
            socket.off('leaveBingoPage');
        }

    }, [socket]);

    return (
        <Container>
            <Grid>
                {board.map((value, idx) => {
                    return <Cell key={idx} value={board[idx]} onChange={event => {
                        setBoard(board.map((item, id) =>
                            id === idx ? item = event.target.value : item
                        ))
                    }} onClick={() => changeColor(idx)} readOnly={read} ></Cell>
                })}
            </Grid>
            <Button onClick={exitGame}>Exit</Button>
            <Button onClick={playerReady}>Ready</Button>
        </Container>
    )
}

export default Bingo;
