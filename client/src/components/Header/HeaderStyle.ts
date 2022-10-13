import styled from "styled-components";

interface NavProps {
    visible: boolean;
}

export const Nav = styled.nav<NavProps>`
    border: 2px solid red;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(239, 73, 35);
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
    display: ${props => props.visible ? 'flex' : 'none'};
`;

export const Logo = styled.img`
    height: 100%;
    width: fit-content;
    border-radius: 50%;
`;

export const DropDown = styled.div`
    border: 1px solid rgba(151,151,151,0.34);
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    border-radius: 4px;
    font-size: 1.2rem;
    color: #fff;
    letter-spacing: 3px;
    cursor: pointer;
    position: absolute;
    top: 69px;
    right: 20px;
    padding: 10px;
    display: none;
`;

export const ProfileImg = styled.img`
    height: 100%;
    width: fit-content;
    border-radius: 50%;
    background-color: black;
    margin-bottom: 10px;
    position: relative;
`;

export const SignOut = styled.div`
    height: 70px;
    width: fit-content;
    cursor: pointer;

    &:hover{

        ${DropDown}{
            display: block;
        }
    }
`;