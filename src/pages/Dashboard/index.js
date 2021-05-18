import {useContext} from 'react';
import {AuthContext} from '../../contexts/auth'

export default function Dashboard(){

    const {signOut} = useContext(AuthContext)
    return(
        <>
        <h1>DashBoard</h1>
        <button onClick={() => signOut()}>Fazer Logout</button>
        </>
    )
}