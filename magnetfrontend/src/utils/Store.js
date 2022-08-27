import { createContext, useReducer } from 'react';
export const Store = createContext();


const initialState = {
  products:[],
  saleItems:[],
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};


function reducer(state=initialState, action) {
  const {type,payload} = action;
  switch (type) {
    case 'USER_LOGIN':
    case 'USER_LOAD':
     localStorage.setItem("userInfo",JSON.stringify(payload))
     return  { ...state,auth:true, userInfo: payload };
    case 'USER_LOGOUT':
      localStorage.clear();
      return {
        ...state,
        userInfo: null,
        auth:false,
        cart: {
          cartItems: [],
        },
    };
    case 'ADD_PRODUCT':
     return {
        ...state,
        products:payload
     }
    case 'ERROR':
      return {
        ...state,
        messages:payload
    };

    default:
      return state;
  }
}


export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log(state);
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}