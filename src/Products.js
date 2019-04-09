import React from 'react'
import { SingleProduct } from './SingleProduct'

export const Products = (props) => {
    const { products } = props
    return (
        <ul className="list-group">
            {
                products.map(currentProduct => {
                    return (
                        <SingleProduct product={currentProduct} key={currentProduct.id} />
                    )
                })
            }
        </ul>
    )
}




