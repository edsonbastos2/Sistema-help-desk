import {useContext} from 'react';
import {AuthContext} from '../../contexts/auth';
import {Link} from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import {FiHome, FiUser, FiSettings,FiPackage,FiArchive} from 'react-icons/fi';
import './header.css';

export default function Header(){

    const {user} = useContext(AuthContext);

    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto avatar"/>
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24}/>
                Chamados
            </Link>
            <Link to="/customers">
                <FiUser color="#FFF" size={24}/>
                Clientes
            </Link>
            <Link to="/profile">
                <FiSettings color="#FFF" size={24}/>
                Configurações
            </Link>
            <Link to="/inventario">
                <FiArchive color="#FFF" size={24}/>
                Inventário
            </Link>
            <Link to="/stock">
                <FiPackage color="#FFF" size={25}/>
                Stock
            </Link>
        </div>
    )
}