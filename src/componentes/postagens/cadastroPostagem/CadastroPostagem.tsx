import React,{useState,useEffect, ChangeEvent} from 'react';
import {Container,Typography,TextField,Button,Select,FormControl,FormHelperText,MenuItem,InputLabel} from '@material-ui/core';
import './CadastroPostagem.css';
import {useNavigate,useParams} from 'react-router-dom';
import Postagem from '../../../models/Postagem'
import { atualiza, busca, buscaId, cadastra } from '../../../services/Service';
import Tema from '../../../models/Tema'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import {toast} from 'react-toastify'



function CadastroPostagem(){
    const{id}=useParams<{id:string}>()
    const[tema,setTema]=useState<Tema[]>([]);
    let history=useNavigate()
    const[temaE,setTemaE]=useState<Tema>({
        id:0,
        descricao:''
    })
    const[postagem,setPostagem]=useState<Postagem>({
        id:0,
        titulo:'',
        texto:'',
        tema:null

    })
    
    //const[token,setToken]=useLocalStorage('token')

    const token=useSelector<TokenState,TokenState["tokens"]>(
        (state)=>state.tokens
    )

    function updatedModel(e:ChangeEvent<HTMLInputElement>){
        setPostagem({
            ...postagem,
            [e.target.name]:e.target.value,
            tema:temaE

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
        setPostagem({
        ...postagem,
        tema:temaE

         } )},[temaE])

    useEffect(()=>{
        getTemas()
        if(id!==undefined){
            findByIdPostagem(id)
        }
    },[id])
async  function getTemas(){
        busca(`/temas`,setTema,{headers:{
            'Authorization':token
        }})}

    async function findByIdPostagem(id:string){
        buscaId(`/postagens/${id}`,setPostagem,{headers:{
            'Authorization':token
        }})
    }

    async function cadastraPostagem(e:ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        if(id!==undefined){
            try{await atualiza(`/postagens`,postagem,setPostagem,{headers:{
                'Authorization':token
            }})
            toast.success('Postagem atualizada',{
            position:'top-right',
            theme:'colored',
            autoClose:1222 ,
            closeOnClick:true ,
            pauseOnHover:false ,
            draggable:false ,
            progress:undefined


        }
            )
        }catch(error){
                toast.error('Postagem não atualizada!Verifique a quantidade de carácteres na inserção dos campos e tente novamente.',{
                    position:'top-right',
                    theme:'colored',
                    autoClose:2222 ,
                    closeOnClick:true ,
                    pauseOnHover:true ,
                    draggable:false ,
                    progress:undefined
        

                })
            }}
        
        else{
            try{
                await cadastra(`/postagens`,postagem,setPostagem,{headers:{
                    'Authorization':token
                }})
                toast.success('Postagem cadastrada!',{
                    position:'top-right',
                    theme:'colored',
                    autoClose:1222 ,
                    closeOnClick:true ,
                    pauseOnHover:false ,
                    draggable:false ,
                    progress:undefined
        
        
                })
            }catch(error){
                toast.error('Postagem não cadastrada!Verifique a quantidade de carácteres na inserção dos campos e tente novamente.',{
                    position:'top-right',
                    theme:'colored',
                    autoClose:2222 ,
                    closeOnClick:true ,
                    pauseOnHover:true,
                    draggable:false ,
                    progress:undefined
        

                })
               
            }
               
        }
        volta()
       
        }
        function volta(){
            history('/postagens')


        
    }

    return(
<Container maxWidth='sm' className='topo'>
<form onSubmit={cadastraPostagem}>
    <Typography variant='h3' component='h1' color='textSecondary' align='center'>
        Formulário de cadastro de postagem
    </Typography>
    <TextField value={postagem.titulo} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} variant='outlined' name='titulo' id='titulo' label='título' margin='normal' fullWidth/>
    <TextField value={postagem.texto} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)}variant='outlined' id='texto' name='texto' margin='normal' label='texto' fullWidth/>

 <FormControl>
     <InputLabel id='demo-simple-select-helper-label'>Tema</InputLabel>
     <Select
      labelId='demo-simple-select-helper-label'
       id='demo-simple-select-helper-label'
       onChange={(e)=>buscaId(`/temas/${e.target.value}`,setTemaE,{headers:{
           'Authorization':token
       }})}>
       {
           tema.map(temaE=>(
      <MenuItem value={temaE.id}>{temaE.descricao}</MenuItem>

             ))

       }
      </Select>
      <FormHelperText>
          Escolha um tema para a postagem
      </FormHelperText>
      <Button type='submit' variant='contained' color='primary'>
          Finalizar
      </Button>
 </FormControl>

</form>


</Container>


    )
}
    

export default CadastroPostagem;
