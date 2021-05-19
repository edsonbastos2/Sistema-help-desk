import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiTool, FiPlus} from 'react-icons/fi';
import {Link} from 'react-router-dom';

export default function Dashboard(){

    return(
        <div>
            <Header/>
            <div className="content">
                <Title title="Lista de Chamados">
                    <FiTool size={25}/>
                </Title>

                <div className="container dashboard">
                    <span>Nem um chamado registrado</span>
                    <Link to="/new" className="new">
                        <FiPlus size={25}/>
                        Abrir chamado
                    </Link>
                </div>
            </div>
        </div>
    )
}