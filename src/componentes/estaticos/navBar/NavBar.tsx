import React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import './NavBar.css';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {Box} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { addToken } from '../../../store/tokens/Actions';
import {toast} from 'react-toastify'

function NavBar(){

 //const [token,setToken]=useLocalStorage('token')
 const token=useSelector<TokenState,TokenState["tokens"]>(
     (state)=>state.tokens
 )
 const dispatch=useDispatch()
 let history=useNavigate()

 function logout(){
     dispatch(addToken(''))
     toast.info('Usuário deslogado!',{
         position:'top-right',
         autoClose:1999,
         hideProgressBar:false,
         closeOnClick:true,
         pauseOnHover:false,
         draggable:false,
         theme:'light',
         progress:undefined

     }

     )

     history('/login')

 }

 var navBarComponent;

 if(token !==""){
     navBarComponent=
     <AppBar className='caixaB' position="static">
        <Toolbar variant="dense">
            <Box display="flex" justifyContent="start">
            <Box className='cursor' >
            <Link to='/home' className='text-decorator-none corL'>
                <Typography variant="h5" color="inherit">
                    BlogPessoal
                </Typography>
            </Link>
            </Box>
                <Box mx={1} className='cursor'>
                    <Link to='/postagens' className='text-decorator-none corL'>
                    <Typography variant="h6" color="inherit">
                        postagens
                    </Typography>
                    </Link>
                </Box>
                <Box mx={1} className='cursor'>
                    <Link to='/temas' className='text-decorator-none corL'>
                    <Typography variant="h6" color="inherit">
                        temas
                    </Typography>
                    </Link>
                </Box>
                <Box mx={1} className='cursor'>
                    <Link to='/formularioTema' className='text-decorator-none corL'>
                    <Typography variant="h6" color="inherit">
                        cadastrar tema
                    </Typography>
                    </Link>
                </Box>
             
                <Box mx={1} className='cursor text-decorator-none' onClick={logout}>
                    <Link to='/login' className='corL'>
                     <Typography variant="h6" color="inherit"> 
                        deslogar
                    </Typography>
                    </Link>
                </Box>
            </Box>

        </Toolbar>
    </AppBar>

 }

    return(
        <>
        {navBarComponent}
        </>
        


    )
   
}
export default NavBar;

