import React, { useState, useEffect, useRef } from 'react';
import { Button, Cell, Container, Grid, Text, ButtonContainer, BingoRow, BingoCell, Modal, BingoText, GridContainer } from './BingoStyle';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../service/socket-io';

let players: any = {};

const Bingo = () => {

    const { room } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState<Array<string>>(Array(25).fill(''));
    const boardRef = useRef(Array(25).fill(null));
    const [read, setRead] = useState<boolean>(false);
    const [showGrid, setShowGrid] = useState<boolean>(false);
    const [waitPlayerReady, setWaitPlayerReady] = useState<boolean>(true);
    const [turn, setTurn] = useState<string>(socket.id);
    const [count, setCount] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [playerWon, setPlayerWon] = useState<string>('');
    const [displayTurnContainer,setDisplayTurnContainer] = useState<boolean>(false);
    const countRef = useRef(0);


    const exitGame = () => {
        socket.emit('leaveRoom', room, socket.id);
    };

    const changeColor = (idx: number) => {

        if (read && !waitPlayerReady && turn === socket.id && !openModal) {
            const duplicateBoard = board.slice();

            if (duplicateBoard[idx] !== 'X') {
                duplicateBoard[idx] = 'X';
                socket.emit('cellClicked', board[idx], room);
                setBoard(duplicateBoard);
                setTurn(turn === Object.keys(players)[0] ? Object.keys(players)[1] : Object.keys(players)[0]);
            }
        }
    };

    const playerReady = () => {
        let error = false;
        let numberCountMap:any = {};
        for(let i=0;i<board.length;i+=1){
            if(/^\d+$/.test(board[i]) && board[i].length < 3 && board[i].length > 0){
                if(board[i] in numberCountMap){
                    error = true;
                    break;
                }else{
                    numberCountMap[board[i]] = 1;
                }
            }else{
                error = true;
                break;
            }
        }
        for(let i=1; i<=25; i+=1){
            if((i in numberCountMap) && numberCountMap[i] === 1){
                continue;
            }else{
                error = true;
                break;
            }
        }
        if(error){
            alert('Please fill all cells with unique numbers between 1-25, inclusive.')
        }else{
            setRead(true);
            setWaitPlayerReady(true);
            socket.emit('playerReady', room, socket.id);
        }
    };

    useEffect(() => {

        socket.on('roomLeft', (socketId) => alert(`${players[socketId]} left room ${room}`));
        socket.on('leaveBingoPage', () => {
            navigate('/home');
            setDisplayTurnContainer(false);
        });
        socket.on('playerReady', (socketId: string) => alert(`${players[socketId]} is ready!`));
        socket.on('roomSize', (playersObject: any) => {
            if (Object.keys(playersObject).length === 2) {
                setShowGrid(true);
                players = playersObject;
            }
        });
        socket.on('startGame', (socketId: string) => {
            setWaitPlayerReady(false);
            setTurn(socketId);
            setDisplayTurnContainer(true);
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
        socket.on('playerWon', (socketId: string) => {
            setPlayerWon(players[socketId]);
            setOpenModal(true);
        })

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
        countRef.current = 0;
        const lines = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c, d, e] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c] && board[a] === board[d] && board[a] === board[e]) {
                countRef.current = countRef.current + 1;
            }
            if (countRef.current === 5) {
                socket.emit('playerWon', socket.id, room);
                break;
            }
        }
        setCount(countRef.current);

    }, [board]);

    return (
        <>
            {openModal &&
                <Modal>
                    {playerWon} Bingo!
                    <ButtonContainer>
                        <Button onClick={exitGame}>Exit</Button>
                        <Button onClick={() => {
                            setRead(false);
                            setShowGrid(false);
                            setBoard(Array(25).fill(''));
                            setOpenModal(false);
                            setDisplayTurnContainer(false);
                        }}>Play Again</Button>
                    </ButtonContainer>
                </Modal>
            }
            <Container openModal={openModal}>

                {!showGrid ?
                    <>
                        <Text>Waiting for another player to join!</Text>
                        <ButtonContainer>
                            <Button onClick={exitGame}>Exit</Button>
                        </ButtonContainer>
                    </>
                    :
                    <>
                        <GridContainer>
                            <Grid>
                                {board.map((value, idx) => {
                                    return <Cell key={idx} value={board[idx]} onChange={event => {
                                        setBoard(board.map((item, id) =>
                                            id === idx ? item = event.target.value : item
                                        ))
                                    }} onClick={() => changeColor(idx)} readOnly={read} gameStart={board[idx] === 'X'} cursorPointer={read}></Cell>
                                })}
                            </Grid>
                            <BingoText show={displayTurnContainer}>{players[turn]} Turn</BingoText>
                        </GridContainer>
                        {
                            !read ?
                                <ButtonContainer>
                                    <Button onClick={exitGame}>Exit</Button>
                                    <Button onClick={playerReady}>Ready</Button>
                                </ButtonContainer>
                                :
                                <BingoRow marginLeft={displayTurnContainer}>
                                    <BingoCell changeColor={count >= 1}>B</BingoCell>
                                    <BingoCell changeColor={count >= 2}>I</BingoCell>
                                    <BingoCell changeColor={count >= 3}>N</BingoCell>
                                    <BingoCell changeColor={count >= 4}>G</BingoCell>
                                    <BingoCell changeColor={count >= 5}>O</BingoCell>
                                </BingoRow>
                                 
                        }
                    </>
                }
            </Container>
        </>
    )
}

export default Bingo;