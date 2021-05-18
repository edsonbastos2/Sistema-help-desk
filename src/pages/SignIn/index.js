import { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import './signIn.css';


export default function SignIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function handleSubmit(){
        alert('Clicou')
    }

    return(
        <div className="container-area">
            <div className="login">
                <div className="logo-area">
                    <img src={logo} alt="Logo sistema"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="text" placeholder="exemplo@padrao.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Acessar</button>
                </form>
                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}