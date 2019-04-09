import React from 'react'
import axios from 'axios'
import { updateProducts, getUsers } from './store'
import { connect } from 'react-redux'

class DisconnectedSingleProduct extends React.Component {
    constructor(props) {
        super(props)
        const { product } = this.props;
        this.state = {
            manager_id: product.manager_id
        }
    }
    componentDidMount() {
        this.props.getUsers();
    }


    handleChange = (evt) => {
        this.setState({ manager_id: evt.target.value })
    }
    handleSubmit = (evt) => {
        evt.preventDefault()
        const manager_id = this.state.manager_id === "none" ? null : this.state.manager_id;
        this.props.updateProducts(this.props.product.id, { manager_id })
    }
    render() {
        const { product, users } = this.props;
        return (
            <li className="list-group-item">
                <h6>{product.name}</h6>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="currentManager"><em>Product Manager</em></label>
                    <select className="form-control" name="currentManager" value={this.state.manager_id} onChange={this.handleChange}>
                        <option value="none"> --none-- </option>
                        {users.length > 0 ? users.map(manager => {
                            return (
                                <option value={manager.id} key={manager.id}>
                                    {manager.name}
                                </option>
                            )
                        })
                            : <option></option>}
                    </select>
                    <button disabled={this.state.manager_id === product.manager_id} className="btn btn-primary" type="submit">Submit</button>
                </form>
            </li>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProducts: (id, manager) => dispatch(updateProducts(id, manager)),
        getUsers: () => dispatch(getUsers())
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(DisconnectedSingleProduct)



