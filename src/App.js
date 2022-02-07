import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './styles/reset.css';
import './styles/style.css';
import Login from './components/TelaLogin/Login';
import Cadastro from './components/TelaCadastro/Cadastro';
import Registros from './components/TelaRegistros/Registros';
import Entrada from './components/TelaEntrada/Entrada';
import Saida from './components/TelaSaida/Saida';
import UserContext from './components/contexts/UserContext';

function App() {

  const [token, setToken] = React.useState('');
  const [name, setName] = React.useState('');

  return (
    
    <BrowserRouter>
      <UserContext.Provider value = {{token, setToken, name, setName}}>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/cadastro" element={<Cadastro/>}></Route>
            <Route path="/registros" element={<Registros/>}></Route>
            <Route path="/entrada" element={<Entrada/>}></Route>
            <Route path="/saida" element={<Saida/>}></Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
