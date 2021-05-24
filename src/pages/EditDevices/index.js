import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiEdit2} from 'react-icons/fi';
import {useHistory, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';

export default function EditDevices(){

    const {id} = useParams();
    const history = useHistory(); 

    const [name, setName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [serial, setSerial] = useState('');
    const [device, setDevice] = useState('');
    const [setor, setSetor] = useState('');
    const [owner, setOwner] = useState('');
    const [status, setStatus] = useState('Ativo');
    const [detail, setDetail] = useState('')
    const [dataEntrada, setDataEntrada] = useState('');
    const [isId, setIsId] = useState('false');


    function handleOptionStatus(e){
        setStatus(e.target.value)
        console.log(e.target.value)
    }

    useEffect(() => {
        async function loadDevices(){
            await firebase.firestore().collection('device').doc(id)
            .get()
            .then((snapshot) => {
                setName(snapshot.data().name)
                setManufacturer(snapshot.data().manufacturer)
                setModel(snapshot.data().model)
                setSerial(snapshot.data().serial_number)
                setDevice(snapshot.data().device_type)
                setSetor(snapshot.data().location)
                setOwner(snapshot.data().owner)
                setStatus(snapshot.data().status)
                setDetail(snapshot.data().detail)

                setIsId(true)
            })
            .catch(error => {
                toast.error('Erro ! ID não encontrado')
                console.log(`ocorreu um erro ${error}`)
                setIsId(false)
            })
        }

        loadDevices()
    },[id])


    async function handleUpdate(e){
        e.preventDefault()
        if(isId){
            await firebase.firestore().collection('device')
            .doc(id)
            .update({
                name: name,
                manufacturer: manufacturer,
                model: model,
                serial_number: serial,
                device_type: device,
                location: setor,
                owner: owner,
                status: status,
                detail: detail
            })
            .then( () => {
                toast.success('Dispositivo atualizado com sucesso!')
                history.push('/stock')
            })
            .catch(error => {
                toast.error('Erroa na atualização')
                console.log(error)
            })
        }
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title title="Página de Edição">
                    <FiEdit2 size={25}/>
                </Title>
                <div className="container">
                    <form  onSubmit={handleUpdate}>
                        <div className="form-row">

                            <div className="form-group col-md-4">
                                <label>Nome do equipamento</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    
                                    placeholder="Nome do equipamento" value={name} onChange={e=> setName(e.target.value)}/>
                            </div>

                            <div className="form-group col-md-4">
                                <label>Fabricante</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    
                                    placeholder="Fabricante" value={manufacturer} onChange={e => setManufacturer(e.target.value)}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label>Modelo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    
                                    placeholder="Modelo" value={model} onChange={e => setModel(e.target.value)}/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="">Setor alocado</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Setor alocado" value={setor} onChange={e => setSetor(e.target.value)}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="">Número de serie</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Número de serie" value={serial} onChange={e => setSerial(e.target.value)}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="">Tipo do Dispositivo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Tipo do Dispositivo" value={device} onChange={e => setDevice(e.target.value)}/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="">Usuário alocado</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Usuário alocado" value={owner} onChange={e => setOwner(e.target.value)}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="date">Data</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    id="date" placeholder="Data" value={dataEntrada} onChange={e => setDataEntrada(e.target.value)} disabled/>
                            </div>
                        </div>
                        <div className="status">
                            <div className="form-check form-check-inline statu-group">
                                <input 
                                    className="form-check-input" 
                                    type="radio" name="status" 
                                    id="inlineRadio1" value="Ativo" onChange={handleOptionStatus} checked={status === 'Ativo'}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Ativo</label>
                            </div>
                            <div className="form-check form-check-inline statu-group">
                                <input 
                                    className="form-check-input" 
                                    type="radio" name="status" 
                                    id="inlineRadio2" value="Reserva" onChange={handleOptionStatus} checked={status === 'Reserva'}/>
                                <label className="form-check-label" htmlFor="inlineRadio2">Reserva</label>
                            </div>
                            <div className="form-check form-check-inline statu-group">
                                <input 
                                    className="form-check-input" 
                                    type="radio" name="status" 
                                    id="inlineRadio3" value="Defeito" onChange={handleOptionStatus} checked={status === 'Defeito'}/>
                                <label className="form-check-label" htmlFor="inlineRadio3">Defeito</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="detalhes">Detalhes do equipamento</label>
                            <textarea 
                                className="form-control form-detail"
                                id="detalhes" cols="5" rows="5" 
                                value={detail} onChange={e => setDetail(e.target.value)}></textarea>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Atualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}