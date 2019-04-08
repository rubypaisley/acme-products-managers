import React from 'react'
import { SingleProduct } from './SingleProduct'

export const Products = (props) => {
    const { products } = props
    return (
        <ul className="list-group">
            {
                products.map(product => {
                    return (
                        <SingleProduct product={product} key={product.id} />
                    )
                })
            }
        </ul>
    )
}




