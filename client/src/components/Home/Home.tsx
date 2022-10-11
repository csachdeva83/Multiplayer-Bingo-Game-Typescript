import React, { useState, useEffect } from 'react'
import { Container, InputBox, ModalContainer, SubmitButton, Title } from './HomeStyle';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../service/socket-io';


const Home = () => {

    const [room, setRoom] = useState<string>('');
    const navigate = useNavigate();

    const joinRoom = async () => {
        socket.emit('joinRoom', room,socket.id);
    };

    useEffect(() => {

        socket.on('roomJoinError', (message) => {
            alert(message.error);
        })
        socket.on('roomJoined', (room: string) => navigate(`/bingo/${room}`));

        return () => {
            socket.off('roomJoinError');
            socket.off('roomJoined');
        }

    },[socket])

    return (
        <Container>
            <ModalContainer>
                <Title> Create / Join Room</Title>
                <InputBox value={room} onChange={(event) => setRoom(event.target.value)} placeholder="ROOM NAME"></InputBox>
                <SubmitButton onClick={joinRoom}>SUBMIT</SubmitButton>
            </ModalContainer>
        </Container>
    )
}

export default Home
