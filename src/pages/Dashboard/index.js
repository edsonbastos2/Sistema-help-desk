import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiTool, FiPlus} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import './dashboard.css';
import { useState } from 'react';

export default function Dashboard(){

    const [chamado, setchamado] = useState([])

    return(
        <div>
            <Header/>
            <div className="content">
                <Title title="Lista de Chamados">
                    <FiTool size={25}/>
                </Title>

                {
                    chamado.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nem um chamado registrando</span>
                            <Link to="/new" className="new">
                                <FiPlus size={25}/>
                                Abrir chamado
                            </Link>
                        </div>
                    ):(
                        <>
                            <Link to="/new" className="new">
                                <FiPlus size={25}/>
                                Abrir chamado
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}