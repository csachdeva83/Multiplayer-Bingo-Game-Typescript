import React, { useState, useEffect, useRef } from 'react';
import { Button, Cell, Container, Grid, Text } from './BingoStyle';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../service/socket-io';

const Bingo = () => {

    const { room } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState<Array<string>>(Array(25).fill(''));
    const boardRef = useRef(Array(25).fill(null));
    const [read, setRead] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(false);
    const [waitPlayerReady, setWaitPlayerReady] = useState<boolean>(true);
    const [turn, setTurn] = useState(socket.id);

    const players: any = {};

    const exitGame = () => {
        socket.emit('leaveRoom', room, socket.id);
    };

    const changeColor = (idx: number) => {
        if (read && !waitPlayerReady && turn === socket.id) {
            const duplicateBoard = board.slice();

            if (duplicateBoard[idx] !== 'X') {
                duplicateBoard[idx] = 'X';
                socket.emit('cellClicked', board[idx], room);
                setBoard(duplicateBoard);
                setTurn(players['X'] ? players['O'] : players['X']);
            }
        }
    };

    const playerReady = () => {
        setRead(true);
        setWaitPlayerReady(true);
        socket.emit('playerReady', room, socket.id);
    };


    useEffect(() => {

        socket.on('roomLeft', (socketId) => alert(`${socketId} left room ${room}`));
        socket.on('leaveBingoPage', () => navigate('/home'));
        socket.on('playerReady', (socketId: string) => alert(`${socketId} is ready!`));
        socket.on('roomSize', (connectedSockets: string[]) => {
            if (connectedSockets.length === 2) {
                setShowGrid(true);
                players['X'] = connectedSockets[0];
                players['O'] = connectedSockets[1];


            }
        });
        socket.on('startGame', (socketId: string) => {
            setWaitPlayerReady(false);
            setTurn(socketId);
            alert(`${socketId} turn`);
        });
        socket.on('cellColorChange', (cellValue: string) => {
            const duplicateBoard = boardRef.current.slice();
            for (let i = 0; i < duplicateBoard.length; i += 1) {
                if (duplicateBoard[i] === cellValue) {
                    duplicateBoard[i] = 'X';
                }
            }
            setTurn(socket.id);
            setBoard(duplicateBoard);
        });

        return () => {
            socket.off('roomLeft');
            socket.off('playerReady');
            socket.off('leaveBingoPage');
            socket.off('roomSize');
            socket.off('startGame');
            socket.off('cellColorChange');
        }

    }, [socket]);

    useEffect(() => {

        socket.emit('isRoomFull', room);

    }, [showGrid]);

    useEffect(() => {

        boardRef.current = board;

    }, [board]);

    return (
        <Container>
            {!showGrid ?
                <Text>Waiting for another player to join!</Text>
                :
                <>
                    <Grid>
                        {board.map((value, idx) => {
                            return <Cell key={idx} value={board[idx]} onChange={event => {
                                setBoard(board.map((item, id) =>
                                    id === idx ? item = event.target.value : item
                                ))
                            }} onClick={() => changeColor(idx)} readOnly={read} gameStart={board[idx] === 'X'}></Cell>
                        })}
                    </Grid>
                    <Button onClick={exitGame}>Exit</Button>
                    <Button onClick={playerReady}>Ready</Button>
                </>
            }
        </Container>
    )
}

export default Bingo;