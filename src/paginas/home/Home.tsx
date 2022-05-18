import React, { useEffect } from 'react'; 
import {Grid, Typography} from "@material-ui/core";
import { Box } from '@material-ui/core';
import './Home.css';
import {Button} from "@material-ui/core";
import TabPostagem from '../../componentes/postagens/tabPostagem/TabPostagem'
import ModalPostagem from '../../componentes/postagens/modalPostagem/ModalPostagem';
import { useNavigate,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/TokensReducer';
import {toast} from 'react-toastify'

function Home(){
    let history=useNavigate()
    
    
    const token=useSelector<TokenState,TokenState["tokens"]>(
        (state)=>state.tokens
    )
    
    useEffect(()=>{
        if(token==''){
            toast.error('Usuário não logado!',{
                position:'top-right',
                theme:'colored',
                autoClose:1999,
                pauseOnHover:false,
                closeOnClick:true,
                hideProgressBar:false,
                progress:undefined
        
            }
            )
            history("/login")
        }},[token])
    function postagens(){
        history('/postagens')
    }
    
        return(
            <>
        <Grid container direction="row" justifyContent="center" alignItems="center" className='caixa'>
                    <Grid alignItems="center" item xs={6} >
                        <Box paddingX={20} >
                            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo'>Seja bem vindo(a)!</Typography>
                            <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo'>expresse aqui os seus pensamentos e opiniões!</Typography>
                        </Box>
                        <Box display="flex" justifyContent="center">
                            <Box marginRight={1}>
                                <ModalPostagem/>
                            </Box>
                            <Button onClick={postagens} variant="outlined" className='botao' >Ver Postagens</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <img src="https://i.imgur.com/H88yIo2.png" alt="" width="500px" height="500px" />
                    </Grid>
                    <Grid xs={12} className='postagens caixaB' >
                        <TabPostagem/>
                    </Grid>
                </Grid>
                
         
         </>
          
            
    
    
        )
    
    
    }
    export default Home;