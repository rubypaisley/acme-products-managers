import React from 'react'


export const Managers = ({ managers }) => {
    return (
        <ul>
            {
                managers.map(manager => {
                    return (
                        <li key={manager.id}>
                            {manager.name}
                        </li>
                    )
                })
            }
        </ul>
    )
}



