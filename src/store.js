import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'
import thunk from 'redux-thunk'


const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_USERS = 'GET_USERS';

const getProductsActionCreator = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

const getUsersActionCreator = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const getProducts = () => {
    return dispatch => {
        return axios.get('/api/products')
            .then(res => dispatch(getProductsActionCreator(res.data)))
            .catch(error => { throw new Error(error) })
    }
}

export const getUsers = () => {
    return dispatch => {
        return axios.get('/api/users')
            .then(res => dispatch(getUsersActionCreator(res.data)))
            .catch(error => { throw new Error(error) })
    }
}

export const updateProducts = (id, manager) => {
    console.log('this should be req.body', manager)
    return dispatch => {
        return axios.put(`/api/products/${id}`, manager)
            .then((product) => {
                console.log(product.data)
                return axios.get('/api/products')
                    .then(res => dispatch(getProductsActionCreator(res.data)))
            })
            .catch(er => console.log('oops!' + er))

    }
}

const productReducer = (state = [], action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
}

const reducer = combineReducers({ products: productReducer, users: userReducer })

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);

export default store;


