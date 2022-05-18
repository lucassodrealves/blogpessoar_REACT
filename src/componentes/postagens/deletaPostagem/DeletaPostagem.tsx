import Postagem from '../../../models/Postagem'
import { buscaId, deleta } from '../../../services/Service';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import React,{useState, useEffect} from 'react';
import {Box,Card,CardContent,CardActions,Typography,Button} from '@material-ui/core'
import {useParams,useNavigate} from 'react-router-dom'
import './DeletaPostagem.css'

import  {TokenState}  from '../../../store/tokens/TokensReducer';
function DeletoPostagem(){
    const {id}=useParams<{id:string}>()
    let history=useNavigate()
    const[postagem,setPostagem]=useState<Postagem>()
   // const[token,setToken]=useLocalStorage('token')
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
        draggable:false,
        progress:undefined


    }
    )
    history('/login')
}
},[token]
)

async function findById(){
    buscaId(`/postagens/${id}`,setPostagem,{headers:{
        'Authorization':token
    }})
}

useEffect(()=>{
    if(id!=undefined)
    findById()
},[id])

async function sim(){
    history('/postagens')
    deleta(`/postagens/${id}`,{headers:{
        'Authorization':token
    }})
    toast.success('Postagem deletada com sucesso',{
        position:"top-right",
        theme:'colored',
        autoClose:1222,
        pauseOnHover:false,
        closeOnClick:true,
        draggable:false,
        progress:undefined


    })
}

async function n(){
     history('/postagens')
}




return(
    <Box m={2}>
        <Card variant='outlined'>
            <CardContent>
                <Box justifyContent='center'>
                <Typography color='textSecondary' gutterBottom>
                    Deseja deletar a postagem?
                </Typography>
                <Typography color='textSecondary' gutterBottom>
                    {postagem?.titulo}
                </Typography>
                </Box>
            </CardContent>
            <CardActions>
             <Box display='flex'>
                 <Box mx={2}>
                     <Button onClick={sim} variant='contained' color='primary' size='large' >
                         Sim
                     </Button>
                </Box>
                <Box mx={2}>
                     <Button onClick={n} variant='contained' color='secondary' size='large'>
                         Não
                     </Button>
                </Box>
                 </Box>
            </CardActions>
        </Card>
    </Box>

)}
export default DeletoPostagem