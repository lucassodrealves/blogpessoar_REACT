import React,{useState,useEffect, ChangeEvent} from 'react';
import './Login.css';
import { Grid, Box, Typography, TextField } from '@material-ui/core'
import {Link,useNavigate} from 'react-router-dom';
import {Button} from '@material-ui/core';
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../services/Service';
import { useDispatch } from 'react-redux';
import {addToken} from '../../store/tokens/Actions'
import { toast } from 'react-toastify';


function Login() {
    const dispatch =useDispatch();
    let history= useNavigate();
   // const[token,setToken]= useLocalStorage('token');
    const[token,setToken]=useState('')


const [usuarioLogin,setUsuarioLogin]= useState<UsuarioLogin>({
    id:0,
    usuario:'',
    senha:'',
    token:''

})

function updateModel(e:ChangeEvent<HTMLInputElement>){
    setUsuarioLogin({
        ...usuarioLogin,
        [e.target.name]:e.target.value
    })
}

useEffect(()=>{
    dispatch(addToken(token))
    if(token !== ''){
        history('/home')   
    }
},[token])






async function logar(e:ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    try{
       await login(`/usuarios/logar`,usuarioLogin,setToken);
       toast.success('Usuário logado com tranquilidade!',{
        position:'top-right',
        theme:'colored',
        autoClose:1999,
        pauseOnHover:false,
        closeOnClick:true,
        draggable:false,
        progress:undefined


    })
    }catch(error){
        toast.error('Usuário não logado!Dados inseridos inconsistentes!',{
            position:'top-center',
            autoClose:2999,
            pauseOnHover:false,
            draggable:false,
            closeOnClick:true,
            hideProgressBar:false,
            theme:'colored'
        })

    }
    // console.log('usuarioLogin:' +Object.values(usuarioLogin));
}


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'  >
            <Grid item xs={6} alignItems='center'>
            <Box paddingX={20}>

                    <form onSubmit={logar}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='texto'>
                            Entrar
                        </Typography>
                        <TextField value={usuarioLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=>updateModel(e)} variant='outlined' label='usuário' id='usuario' name='usuario' margin='normal' fullWidth />
                        <TextField value={usuarioLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>)=>updateModel(e)} variant='outlined' label='senha' id='senha' name='senha' type='password' margin='normal' fullWidth />
                        <Box marginTop={2} textAlign=' center'>
                            {/* <Link to='/home' className='text-decorator-none'> */}
                               <Button type='submit' variant='contained' color='primary'> 
                                   Logar
                               </Button>
                            {/* </Link> */}
                        </Box>
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' align='center'>
                                ainda não tem conta queride?
                            </Typography>
                        </Box>
                        <Link to='/cadastrar'>
                        <Typography variant='subtitle1' align='center' className='texto'>Cadastre-se</Typography>
                        </Link>
                    </Box>
                           
                </Box>

            </Grid>

            <Grid item xs={6} alignItems='center' className='img'>
            {/* <img src="../../assets/img/coruja.jpg" alt="imagem atrativa na tela de login" width="75px" height="75px"/> */}
            

               
            </Grid>

        </Grid>
    );

}

export default Login;