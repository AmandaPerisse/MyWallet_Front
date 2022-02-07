import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Cadastrar(){

    return (

        <Link to = "/cadastro">
            <Texto>
                Primeira vez? Cadastre-se!
            </Texto>
        </Link>
    );
}
const Texto = styled.h5`
    margin-top: 20px;
    color: white;
`;