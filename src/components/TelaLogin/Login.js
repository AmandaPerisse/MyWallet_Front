import React from 'react';
import styled from 'styled-components';

import Logo from '../Imgs/Logo';
import Form from "./Form";
import Cadastrar from "./Cadastrar";

export default function Login(){

    return (
        <>
            <Fundo>
               <Logo />
               <Form />
               <Cadastrar />
            </Fundo>
        </>
    );
}
const Fundo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;