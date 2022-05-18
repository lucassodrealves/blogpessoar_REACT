import React,{useEffect, useState, ChangeEvent} from 'react'
import {Container, Typography,TextField,Button,Box} from '@material-ui/core';
import './CadastroTema.css'
import Tema from '../../../models/Tema'
import {useNavigate,useParams} from 'react-router-dom'
import { atualiza, buscaId, cadastra } from '../../../services/Service';
import {useSelector} from 'react-redux'
import {TokenState} from '../../../store/tokens/TokensReducer'
import {toast} from 'react-toastify'



function CadastroTema(){
    let history=useNavigate()
   // const[tema,setTema]=useState<Tema[]>([])
    const{id}=useParams<{id:string}>()
    const[tema,setTema]=useState<Tema>({
         id:0,
         descricao:''
    })
    //const[token,setToken]=useLocalStorage('token')
    const token=useSelector<TokenState,TokenState["tokens"]>(
        (state)=>state.tokens
    )

function updatedModel(e:ChangeEvent<HTMLInputElement>){
   setTema({
   ...tema,
   [e.target.name]:e.target.value
})
}

useEffect(()=>{
    if(token==''){
        toast.error('Usuário não logado!',{
            position:'top-right',
            theme:'colored',
            autoClose:1999,
            pauseOnHover:false,
            closeOnClick:true,
            hideProgressBar:false,
            progress:undefined,
            draggable:false,


        }
        )
        history('/login')
    }
},[token])

useEffect(()=>{
    if(id!==undefined){
        findById(id)
    }

},[id])

async function findById(id:string){
buscaId(`/temas/${id}`,setTema,{headers:{
'Authorization':token
}})
}

 async function cadastrarTema(e:ChangeEvent<HTMLFormElement>){
     e.preventDefault()

     console.log("tema:"+JSON.stringify(tema))

     if(id==undefined){
     try{console.log(tema)
     await cadastra(`/temas`,tema,setTema,{headers:{
         'Authorization':token
        }
     })
     toast.success('Tema criado com tranquilidade!',{
        position:'top-right',
        theme:'colored',
        autoClose:1222 ,
        closeOnClick:true ,
        pauseOnHover:false ,
        draggable:false ,
        progress:undefined


    })
    }catch(error){
        toast.error('Tema não cadastrado!Erro na inserção dos campos',{
            position:'top-right',
            theme:'colored',
            autoClose:2222 ,
            closeOnClick:true ,
            pauseOnHover:true ,
            draggable:false ,
            progress:undefined


        })
    }
    }

     else{
    try{await atualiza(`/temas`,tema,setTema,{headers:
        {
            'Authorization':token
        }})
        toast.success('Tema atualizado!',{
            position:'top-right',
            theme:'colored',
            autoClose:1222 ,
            closeOnClick:true ,
            pauseOnHover:false ,
            draggable:false ,
            progress:undefined


        })
      
     }catch(error){
        toast.error('Tema não atualizado!Verifique a quantidade de carácteres na inserção dos campos e tente novamente.',{
            position:'top-right',
            theme:'colored',
            autoClose:2222 ,
            closeOnClick:true ,
            pauseOnHover:true ,
            draggable:false ,
            progress:undefined


        })
    }
    }
     pega()

     
     }
     function pega(){
        history('/temas')
 }


 return(
    

<Container maxWidth="sm" className='topo'>
<form onSubmit={cadastrarTema}>
    <Typography variant='h3' component='h1' color='textSecondary' align='center'>
Formulário de Cadastro de Tema
    </Typography>
    <TextField value={tema.descricao} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id='descricao' name='descricao' variant='outlined' label='descrição' fullWidth/>
    <Box className='topo'>
    <Button type='submit' variant='contained' color='primary' >
        Finalizar
    </Button>
    </Box>
</form>
</Container>

 )

}
export default CadastroTema;