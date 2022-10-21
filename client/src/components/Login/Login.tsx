import React, { useEffect } from 'react';
import { BgImage, Container, Content, Description, LeftContainer, LoginButton, RightContainer, Title } from './LoginStyle'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';
import { setUserLoginDetails } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userName = useAppSelector(state => state.user.name);

    const handleAuth = () => {
        signInWithPopup(auth, provider).then((result) => {
            setUser(result.user);
        }).catch((error) => {
            alert(error.message);
        })
    };

    const setUser = (user: any) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            })
        )
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                navigate('/home');
            }
        })
    },[userName]);

    return (
        <Container>
            <LeftContainer>
                <BgImage src="/images/bingo-left-container.png" alt="Bingo" />
            </LeftContainer>
            <RightContainer>
                <Content>
                    <Title>BINGO MULTIPLAYER GAME</Title>
                    <Description>Bingo is a game of chance in which each player matches the numbers printed in different arrangements on cards. The game host draws at random, marking the selected numbers with tiles.</Description>
                    <LoginButton onClick={handleAuth}>LOG IN</LoginButton>
                </Content>
            </RightContainer>
        </Container >
    )
}

export default Login;
