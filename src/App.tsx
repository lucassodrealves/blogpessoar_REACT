import React from 'react';
import './App.css';//
import { Grid } from "@material-ui/core"
import Home from './paginas/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './componentes/estaticos/navBar/NavBar';
import Footer from './componentes/estaticos/footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './componentes/temas/listaTema/ListaTema';
import ListaPostagem from './componentes/postagens/listaPostagem/ListaPostagem'
import CadastroTema from './componentes/temas/cadastroTema/CadastroTema';
import DeletaTema from './componentes/temas/deletaTema/DeletaTema';
import CadastroPostagem from './componentes/postagens/cadastroPostagem/CadastroPostagem'
import DeletaPostagem from './componentes/postagens/deletaPostagem/DeletaPostagem'
import {Provider} from 'react-redux'
import store from './store/Store' 
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
  <Provider store={store}>
    <ToastContainer/>
    <Router>
      <NavBar/>
      <div style={{ minHeight: '100vh' }}>
        <Routes>

          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastrar" element={<CadastroUsuario/>}/>
          <Route path="/temas" element={<ListaTema/>}/>
          <Route path="/postagens" element={<ListaPostagem/>}/>
          <Route path="/formularioTema" element={<CadastroTema/>}/>
          <Route path="/formularioTema/:id" element={<CadastroTema/>}/>
          <Route path="/deletaTema/:id" element={<DeletaTema/>}/>
          <Route path="/formularioPostagem" element={<CadastroPostagem/>}/>
          <Route path="/formularioPostagem/:id"element={<CadastroPostagem/>}/>
          <Route path="/deletaPostagem/:id" element={<DeletaPostagem/>}/>

        </Routes>
      </div>
      <Footer />
    </Router>
 </Provider>
  )
}

export default App;
