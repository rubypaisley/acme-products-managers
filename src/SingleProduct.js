import React from 'react'
import axios from 'axios'

export class SingleProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            allManagers: [],
            managerId: this.props.product.managerId
        }
    }
    componentDidMount() {
        axios.get('/api/users')
            .then(users => this.setState({ allManagers: users.data }))
    }
    handleChange = () => {
        return;
    }
    render() {
        const { product } = this.props;
        return (
            <li className="list-group-item">
                <h6>{product.name}</h6>
                <form className="form-group">
                    <label htmlFor="currentManager"><em>Product Manager</em></label>
                    <select className="form-control" name="currentManager" onChange={this.handleChange}>
                        <option key={null}>--none--</option>
                        {this.state.allManagers.length > 0 ? this.state.allManagers.map(manager => {
                            return (
                                <option value={manager.id} key={manager.id}>
                                    {manager.name}
                                </option>
                            )
                        })
                            : <option></option>}
                    </select>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </li>
        )
    }

}



