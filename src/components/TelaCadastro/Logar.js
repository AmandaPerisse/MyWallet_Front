import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Logar(){

    return (

        <Link to = "/">
            <Texto>
                Já tem uma conta? Entre agora!
            </Texto>
        </Link>
    );
}
const Texto = styled.h5`
    margin-top: 20px;
    color: white;
`;