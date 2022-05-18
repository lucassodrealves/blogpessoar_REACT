import {createStore} from 'redux';
import { TokenReducer } from './tokens/TokensReducer';

const store= createStore(TokenReducer);

export default store