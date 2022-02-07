import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

import Sair from '../Imgs/Sair';
import Menos from '../Imgs/Menos';
import Mais from '../Imgs/Mais';

export default function Registros(){

    const {token, setToken} = useContext(UserContext);
    const {name, setName} = useContext(UserContext);
    const [justify, setJustify] = React.useState('space-between');
    const [display, setDisplay] = React.useState('none');
    const [display2, setDisplay2] = React.useState('flex');
    const [listaRegistros, setListaRegistros] = React.useState([]);
    const [saldo, setSaldo] = React.useState(0);
    const [cor, setCor] = React.useState('black');

    let contador = 0;
    const navigate = useNavigate();

    useEffect(() => {
        try{
            const promise = axios.get('http://localhost:5000/registros', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            promise.then(response => {
                console.log(response.data)
                if(response.data){
                    setListaRegistros(response.data);
                    for(let i = 0; i< response.data.length; i++){
                        if(response.data[i].type == "entrada"){
                            contador += parseFloat(response.data[i].value);
                        }
                        else if(response.data[i].type == "saida"){
                            contador -= parseFloat(response.data[i].value);
                        }
                    }
                    if (contador<0){
                        setCor('red');
                    }
                    else{
                        setCor('green;');
                    }
                    setSaldo(parseFloat(contador).toFixed(2));
                }
            });
        }
        catch(e){
            alert('Falha.');
        }
    }, []);

    function Componentes(contador){
        if (listaRegistros.length > 0){
            setDisplay('none');
            setJustify('space-between');
            setDisplay2('flex');
            return (
                listaRegistros.map(registro => {
                    let color = "";
                    if(registro.type == "entrada"){
                        color = "green";
                    }
                    else{
                        color = "red";
                    }
                    return(
                        <RegistrosCompletos key = {registro._id}>
                            <Esquerda>
                                <h4>{registro.date}</h4>
                                <h6>{registro.description}</h6>
                            </Esquerda>
                            <Direita color = {color}>
                                <span>{parseFloat((parseFloat(registro.value)).toFixed(2))}</span>
                            </Direita>
                        </RegistrosCompletos>
                    )
                    
                })
            )
        }
        else{
            setDisplay('block');
            setJustify('center');
            setDisplay2('none');
            return null;
        }
    }

    async function sair(){
        try{
            await axios.delete('http://localhost:5000/registros', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            alert("Volte sempre!");
            navigate('/');
        }
        catch(e){
            alert('Falha.');
        }
    }

    return (
        <Tela>
            <Header>
                <h1>Olá, {name} </h1>
                <button onClick={sair}>
                    <Sair />
                </button>
            </Header>
            <Conteudo display = {display}  justify = {justify}>
                <h2>
                    Não há registros de entrada ou saída
                </h2>
                <ComponentesCompleto>
                    <Componentes />
                </ComponentesCompleto>
                <Saldo cor = {cor} display2 = {display2}>
                    <div>
                        <h3><strong>SALDO</strong></h3>
                    </div>
                    <span>{saldo}</span>
                </Saldo>
            </Conteudo>
            <Botoes>
                <Botao onClick={ () => {navigate('/entrada');} }>
                    <Mais />
                    <h3>
                        Nova Entrada
                    </h3>
                </Botao>
                <Botao onClick={ () => {navigate('/saida');} }>
                    <Menos />
                    <h3>
                        Nova Saída
                    </h3>
                </Botao>
            </Botoes>
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
const Conteudo = styled.div`
    overflow-y: auto;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: ${props => props.justify};
    background-color: white;
    height: calc(100vh - 210px);
    border-radius: 5px;
    width: 100%;
    flex-direction: column;
    h2{
        color: #868686;
        text-align: center;
        display: ${props => props.display}
    }
`;
const Botoes = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    left: 0px;
    width: 100%;
    padding: 20px;
    bottom: -10px;
`;
const Botao = styled.button`
    background-color: #A328D6;
    height: 114px;
    width: 49%;
    border-radius: 5px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    h3{
        color: white;
    }
`;
const RegistrosCompletos = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: normal;
    }
    margin-top: 5px;
    width: 100%;
`;
const Esquerda = styled.div`
    width: 80%;
    h4{
        color: #C6C6C6;
        margin-right: 10px;
    }
    display: flex;
    align-items: center;
    justify-content: left;
`;
const Direita = styled.div`
    width: 20%;
    text-align: right;
    span{
        color: ${props => props.color};
    }
`;
const ComponentesCompleto = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-direction: column;
`;
const Saldo = styled.div`
    margin-top: 20px;
    display: ${props => props.display2};
    justify-content: space-between;
    align-items: center;
    width: 100%;
    span{
        font-family: 'Raleway', sans-serif;
        font-size: 17px;
        color: ${props => props.cor};
    }
`;