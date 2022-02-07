import axios from 'axios';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import UserContext from '../contexts/UserContext';
import dayjs from 'dayjs';

export default function Form(){

    const { token, setToken } = useContext(UserContext);
    const [valor, setValor] = React.useState('');
    const [descricao, setDescricao] = React.useState('');

    const navigate = useNavigate();
    function setarCampos(){
        setValor('');
        setDescricao('');
    }
    async function salvandoSaida(e){
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/saida', {
                date: dayjs().format('DD/MM'),
                value: valor,
                description: descricao
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            if(response.data){
                setToken(response.data.token);
                navigate('/registros');
            }
        }
        catch(e){
            if(e.response.status === 401){
                alert('Por favor, logue novamente.');
                navigate('/');
            }
            else{
                alert('Falha.');
                setarCampos();
            }
        }
    }

    return (
        
        <>
            <Formulario onSubmit={salvandoSaida}>
                <input type="text" onChange = {(e) => setValor(e.target.value)} value = {valor} placeholder='Valor'/>
                <input type="text" onChange = {(e) => setDescricao(e.target.value)} value = {descricao} placeholder='Descrição'/>
                <Botao type="submit">
                    <h2>Salvar Saída</h2>
                </Botao>
            </Formulario>
        </>
    );
}

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
const Botao = styled.button`
	background-color: #A328D6;
    margin-top: 20px;
    width: 100%;
    height: 46px;
    border-radius: 4.63636px;
    h2{
        color: white;
    }
`;