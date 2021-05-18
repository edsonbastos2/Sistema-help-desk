import { useState } from 'react';
import {Link} from 'react-router-dom';


export default function SignUp(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    function handleSubmit(){
        alert('Clicou')
    }

    return(
        <div className="container-area">
            <div className="login">
                <div className="logo-area">
                    <img src="" alt="Logo sistema"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar Usuário</h1>
                    <input type="text" placeholder=" Seu nome" value={name} onChange={e=> setName(e.target.value)}/>
                    <input type="text" placeholder="exemplo@padrao.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="**********" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/">Já tem uma conta?</Link>
            </div>
        </div>
    )
}