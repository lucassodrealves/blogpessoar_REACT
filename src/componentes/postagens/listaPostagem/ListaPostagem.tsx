import React,{useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {Box, Card, CardActions, CardContent, Button, Typography} from'@material-ui/core';
import './ListaPostagem.css';
import Postagem from '../../../models/Postagem'
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import {toast} from 'react-toastify'

function ListaPostagem(){
    let history=useNavigate();
    const[listaPostagem,setListaPostagem]=useState<Postagem[]>([])
    const token=useSelector<TokenState,TokenState["tokens"]>(
        (state)=>state.tokens
    )
useEffect(()=>{
    if(token===''){
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
},[token])

useEffect(()=>{
    getPostagens()

},[listaPostagem.length])

 async function getPostagens(){
     await busca(`/postagens`,setListaPostagem,{
         headers:{
             'Authorization':token
         }
     })
 }
return(
    <>
   
  { listaPostagem.map(postagem =>(
 <Box m={2}>
     <Card variant='outlined'>
         <CardContent>
             <Typography color='textSecondary' gutterBottom>
                 Postagens
             </Typography>
             <Typography variant='h5' component='h2'>
                 {postagem.titulo} 
             </Typography>
             <Typography variant='body2' component='p'>
                 {postagem.texto}
             </Typography>
             <Typography variant='body2' component='p'>
                 {postagem.tema?.descricao}
             </Typography>
           </CardContent>
           <CardActions>
               <Box mx={1} display='flex' justifyContent='center' mb={1.5}>

                   <Link to={`/formularioPostagem/${postagem.id}`} className='text-decorator-none'>
                       <Button variant='contained' color='primary' size='small' className='marginEsquerda'>
                          Atualizar
                       </Button>
                   </Link>
               </Box>

               <Box mx={1} display='flex' justifyContent='center' mb={1.5}>
                   <Link to={`/deletaPostagem/${postagem.id}`}>
                   <Button variant='contained' color='secondary' size='small' className='marginEsquerda'>
                       Deletar
                   </Button>
                   </Link>
               </Box>
           </CardActions>
           </Card>
             </Box>
  ))}




     </>
     );
    
    }

    export default ListaPostagem;
    
   