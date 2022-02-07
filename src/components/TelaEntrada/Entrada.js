import React from 'react';
import styled from 'styled-components';

import Form from "./Form";

export default function Entrada(){

    return (
        <Tela>
            <Header>
                <h1>Nova Entrada</h1>
            </Header>
            <Form />
        </Tela>
    );
}
const Tela = styled.div`
    padding: 20px;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;