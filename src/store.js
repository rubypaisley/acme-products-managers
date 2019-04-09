import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios'
import thunk from 'redux-thunk'


const GET_PRODUCTS = 'GET_PRODUCTS';

const getProductsActionCreator = (products) => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

export const getProducts = () => {
    return dispatch => {
        return axios.get('/api/products')
            .then(res => dispatch(getProductsActionCreator(res.data)))
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

const store = createStore(
    productReducer,
    composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true })))
);

export default store;


