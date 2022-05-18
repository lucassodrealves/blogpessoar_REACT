import {Action} from './Actions';

export interface TokenState{
    tokens:string
}

export const initialToken={
    tokens:''
}

export const TokenReducer=(state:TokenState=initialToken,action:Action)=>
{switch(action.type){
    case "ADD_TOKEN":{
        return  {tokens:action.payload} 
    }
    
    default: {
    return state
    }
}
}