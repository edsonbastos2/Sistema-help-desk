import {FiX} from 'react-icons/fi';
import './modal.css';

export default function Modal({conteudo, close}){
    return(

        <div className="modalDetail">
            <div className="containerDetail">
                <button className="btn btn-danger close" onClick={close}>
                    <FiX size={25} color="#FFF"/>
                </button>
                <div>
                    <div className="row">
                        <h2>Detalhes do Dispositivo</h2>
                    </div>
                        <div className="row">
                            <h5>
                                Usuário alocado: <span>{conteudo.owner}</span>
                            </h5>
                        </div>
                        <div className="row">
                            <h5>
                                Nome Dispositivo: <span>{conteudo.name}</span>
                            </h5>
                        </div>
                        <div className="row">
                            <h6>
                                Status: <span 
                                style={{
                                        color:"#fff", backgroundColor: conteudo.status === 'Ativo' ? '#5cb85c' : '#ff0000'
                                    }}>{conteudo.status}</span>
                            </h6>

                        </div>

                        { conteudo.detail && 
                                <>
                                    <div className="row">
                                    <h5>Detalhes do Dispositivo</h5>

                                    </div>
                                    <p>{conteudo.detail}</p>
                                </>
                        }
                </div>
            </div>
        </div>
    )
}