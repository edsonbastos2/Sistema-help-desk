import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiPackage} from 'react-icons/fi';
import { useState } from 'react';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import './devices.css';

export default function Devices(){

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

    function handleOptionStatus(e){
        setStatus(e.target.value)
        console.log(e.target.value)
    }
    
    async function handleCadastro(e){
        e.preventDefault()

        if(name !== '' && manufacturer !== '' && model !== '' && serial !== '' && setor !== '' && owner !== '' && dataEntrada !== '' && status !== ''){

            await firebase.firestore().collection('device')
            .add({
                name: name,
                manufacturer: manufacturer,
                model: model,
                serial_number: serial,
                device_type: device,
                location: setor,
                owner: owner,
                created: dataEntrada,
                status: status,
                detail: detail
            })
            .then(() => {
                setName('')
                setManufacturer('')
                setModel('')
                setSerial('')
                setDevice('')
                setSetor('')
                setOwner('')
                setDataEntrada('')
                setDetail('')
                
                toast.info('Dispositivo cadastrado com sucesso!')
            })
            .catch((error) => {
                toast.error('Ocorreu um error!')
            })
        }else{
            toast.error('Todos os campos são obrigatórios')
        }
    }
    return(
        <div>
            <Header/>
            <div className="content">
                <Title title="Cadastro de Equipamentos">
                    <FiPackage size={25}/>
                </Title>

                <div className="container">
                    <form  onSubmit={handleCadastro}>
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
                                    id="date" placeholder="Data" value={dataEntrada} onChange={e => setDataEntrada(e.target.value)}/>
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
                            <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}