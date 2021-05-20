import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiTrendingUp} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {FiSearch, FiEdit2} from 'react-icons/fi';
import './stock.css';


export default function Stock(){
    return(
        <div>
            <Header/>
            <div className="content stock">
                <Title title="Tabela de Estoque">
                    <FiTrendingUp size={25}/>
                </Title>

                <Link to="/inventario" className="new">
                    Novo Item
                </Link>

                <>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Nome do Dispositivo</th>
                                <th scope="col">Fabricante do Dispositivo</th>
                                <th scope="col">Modelo do Dispositivo</th>
                                <th scope="col">Número de serie</th>
                                <th scope="col">Tipo de Dispositivo</th>
                                <th scope="col">Setor alocado</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Data de entrada</th>
                                <th scope="col">Data de Saída</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Nome">ti002</td>
                                <td data-label="Fabricante">Lenovo</td>
                                <td data-label="Modelo">L100</td>
                                <td data-label="Serie">2001010200</td>
                                <td data-label="Tipo">Notebook</td>
                                <td data-label="Setor">T.I</td>
                                <td data-label="Usuário">Edson Bastos</td>
                                <td data-label="Data">23/01/2019</td>
                                <td data-label="Saida">23/01/2019</td>
                                <td data-label="Status">
                                    <span className="badge" style={{backgroundColor:'#5cb85c'}}>Ativo</span>
                                </td>
                                <td data-label="Ações">
                                    <button className="action" style={{backgroundColor: '#3583f6'}}>
                                        <FiSearch color="#fff" size={17}/>
                                    </button>
                                    <button className="action" style={{backgroundColor: '#F6a935'}}>
                                        <FiEdit2 color="#fff" size={17}/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </>

            </div>
        </div>
    )
}