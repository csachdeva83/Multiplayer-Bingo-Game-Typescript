import React from 'react';
import { DropDown, Logo, Nav, ProfileImg, SignOut } from './HeaderStyle';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase';
import { setSignOutState } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

    const userName = useAppSelector(state => state.user.name);
    const userPhoto = useAppSelector(state => state.user.photo);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleAuth = () => {
        if(userName.length>0){
            signOut(auth).then(() => {
                dispatch(setSignOutState());
                navigate('/');
            }).catch((err) => alert(err.message)); 
        }
    };

    return (

        <Nav visible={userName.length > 0}>
            <Logo src="/images/Bingo Logo.png" />
            <SignOut>
                <ProfileImg src={userPhoto} alt={userName}></ProfileImg>
                <DropDown onClick={handleAuth}>
                    <span>Sign Out</span>
                </DropDown>
            </SignOut>
        </Nav>
    )
}

export default Header
