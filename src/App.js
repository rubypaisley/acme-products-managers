import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import { HashRouter, Route } from 'react-router-dom'
import { Managers } from './Managers'
import { Products } from './Products'
import { getProducts } from './store'

class DisconnectedApp extends Component {
    componentDidMount() {
        this.props.getProducts();
    }
    render() {
        const { products, managers } = this.props;
        const managerCount = managers.length;
        return (

            <HashRouter>
                <div>
                    <h1>Acme Products Managers</h1>
                    <Navbar managerCount={managerCount} />
                    <Route exact path="/" render={() => <div>Homepage</div>} />
                    <Route path="/products" render={() => <Products products={products} />} />
                    <Route path="/managers" render={() => <Managers managers={managers} />} />
                </div>

            </HashRouter>


        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

const mapStateToProps = (state) => {
    const managers = state.reduce((accum, product) => {
        if (product.manager && !accum.find(item => item.id === product.managerId)) {
            accum.push(product.manager)
        }
        return accum;
    }, [])
    return {
        products: state,
        managers
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(DisconnectedApp)

