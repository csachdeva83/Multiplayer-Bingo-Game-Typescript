import React, { useState, useEffect } from 'react'
import { Container, InputBox, ModalContainer, SubmitButton, Title } from './HomeStyle';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../service/socket-io';
import { useAppSelector } from '../../app/hooks';


const Home = () => {
    
    const userName = useAppSelector(state => state.user.name);

    const [room, setRoom] = useState<string>('');
    const navigate = useNavigate();

    const joinRoom = async () => {
        if(room.length > 0){
            socket.emit('joinRoom', room, socket.id, userName);
        }else{
            alert('Please enter a room with more than 1 characters.');
        }
    };

    useEffect(() => {

        socket.on('roomJoinError', (message) => {
            alert(message.error);
        })
        socket.on('roomJoined', (room: string, roomSize: number) => navigate(`/bingo/${room}`));

        return () => {
            socket.off('roomJoinError');
            socket.off('roomJoined');
        }

    },[socket])

    return (
        <Container>
            <ModalContainer>
                <Title> Create / Join Room</Title>
                <InputBox value={room} onKeyPress={(event) => event.key === 'Enter' ? joinRoom() : null} onChange={(event) => setRoom(event.target.value)} placeholder="ROOM NAME"></InputBox>
                <SubmitButton onClick={joinRoom}>SUBMIT</SubmitButton>
            </ModalContainer>
        </Container>
    )
}

export default Home
