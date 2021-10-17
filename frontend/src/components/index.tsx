import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Todo } from './Todo'

type Props = {
    user: any
}

export const Main: React.FC<Props> = ({ user }) => {
    return (
        <div>
            <Navbar />
            <Todo user={user} />
        </div>
    )
}
