import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiSettings} from 'react-icons/fi';

import './profile.css'
export default function Profile(){
    return(
        <div>
            <Header/>
            <div className="content">
                <Title title="Meu perfil" >
                    <FiSettings size={25}/>
                </Title>
            </div>
        </div>
    )
}