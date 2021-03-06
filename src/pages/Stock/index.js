import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiTrendingUp} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import {FiSearch, FiEdit2} from 'react-icons/fi';
import './stock.css';
import { useEffect, useState } from 'react';
import firebase from '../../services/firebaseConnection';
import Modal from '../../components/Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const listRef = firebase.firestore().collection('device').orderBy('name', 'asc');
const listFilter = firebase.firestore().collection('device');

export default function Stock(){

    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadMore, setLoadMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState();
    const [showModal, setShowModal] = useState(false)
    const [detail, setDetail] = useState('')
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        loadDevices()
    }, [])


    useEffect(() => {
        async function totalDevice(){
            await firebase.firestore().collection('device')
            .get()
            .then((snapshot) => {
                let listTotal = []
                snapshot.forEach(item => {
                    listTotal.push({
                        ...item
                    })
                })

                setTotal(listTotal)
            })
        }

        totalDevice()
    },[])

    async function loadDevices(){
        await listRef.limit(5)
        .get()
        .then((snapshot) =>{
            updateState(snapshot)
        })
        .catch((error)=>{
            console.log('Erro ao carregar ' + error)
            setLoadMore(false)
        })

        setLoading(false)
    }

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = []
            snapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    manufacturer: doc.data().manufacturer,
                    device_type: doc.data().device_type,
                    created: doc.data().created,
                    location: doc.data().location,
                    model: doc.data().model,
                    owner: doc.data().owner,
                    detail:doc.data().detail,
                    serial_number: doc.data().serial_number,
                    status: doc.data().status
                })
            });

            const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //Pega o utimo documento buscado 

            setDevices( devices => [...devices, ...lista])
            setLastDocs(lastDoc)
        }else{
            setIsEmpty(true)
        }

        setLoadMore(false)
    }



   async function handleMore(){
       setLoadMore(true)
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot => {
            updateState(snapshot)
        }))
    }

    // async function Filter(){
    //     await listFilter.where('device_type', '==', )
    // }

    function toggleModal(item){
        setShowModal(!showModal);
        setDetail(item);
        console.log(item)
    }


    if(loading){
        return(
            <div>
                <Header/>
                <div className="content stock">
                    <Title title="Tabela de Estoque">
                        <FiTrendingUp size={25}/>
                    </Title>

                    <div className="container">
                        <h5>Buscando Equipamentos...</h5>
                    </div>
                </div>
            </div>
        )
    }

    function handleCreatePDF(){
        const doc = new jsPDF();
        doc.autoTable({ html: '#mytable'})
        doc.save('table.pdf')
    }

    

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
                <span class="badge bg-info text-light p-2">Total de dispositivos: {total.length}</span>

                    <table id="mytable">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Fabricante</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Lote</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Setor</th>
                                <th scope="col">Usu??rio</th>
                                <th scope="col">Data de entrada</th>
                                <th scope="col">Status</th>
                                <th scope="col">A????es</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td data-label="Nome">{item.name}</td>
                                        <td data-label="Fabricante">{item.manufacturer}</td>
                                        <td data-label="Modelo">{item.model}</td>
                                        <td data-label="Serie">{item.serial_number}</td>
                                        <td data-label="Tipo">{item.device_type}</td>
                                        <td data-label="Setor">{item.location}</td>
                                        <td data-label="Usu??rio">{item.owner}</td>
                                        <td data-label="Data">{item.created}</td>
                                        <td data-label="Status">
                                            <span className="badge" 
                                            style={{
                                                backgroundColor: 
                                                item.status === 'Ativo' ? '#5cb85c' : '#FF0000'}}>{item.status}</span>
                                        </td>
                                        <td data-label="A????es">
                                            <button className="action" style={{backgroundColor: '#3583f6'}} onClick={() => toggleModal(item)}>
                                                <FiSearch color="#fff" size={17}/>
                                            </button>
                                            <Link to={`/inventario/${item.id}`} className="action" style={{backgroundColor: '#F6a935'}}>
                                                <FiEdit2 color="#fff" size={17}/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                    
                    {loadMore && <h3>Carregando dados...</h3>}
                    { !loadMore && !isEmpty && <button className="btn btn-success mt-4" onClick={handleMore}>Carregar mais</button>}
                    <button className="btn btn-primary mt-4 ml-3" onClick={handleCreatePDF}>Gerar PDF</button>
                </>

            </div>
            {showModal && <Modal conteudo={detail} close={toggleModal}/>}
            
        </div>
    )
}