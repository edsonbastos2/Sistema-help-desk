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
    const [dataEntrada, setDataEntrada] = useState('');
    const [dataSaida, setDataSaida] = useState('');


    async function handleCadastro(e){
        e.preventDefault()

        if(name !== '' && manufacturer !== '' && model !== '' && serial !== '' && setor !== '' && owner !== '' && dataEntrada !== '' && dataSaida !== ''){

            await firebase.firestore().collection('device')
            .add({
                name: name,
                manufacturer: manufacturer,
                model: model,
                serial_number: serial,
                device_type: device,
                location: setor,
                owner: owner,
                entry_date: dataEntrada,
                departure_date: dataEntrada
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
                setDataSaida('')
                
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
                <Title title="Cadastro de Equipamantos">
                    <FiPackage size={25}/>
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleCadastro}>

                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input 
                                type="text" id="nome" 
                                value={name} onChange={e => setName(e.target.value)} 
                                placeholder="Nome do Dispositivo"/>

                            <label htmlFor="fabri">Fabricante</label>
                            <input 
                                type="text" id="fabri" 
                                value={manufacturer} onChange={e => setManufacturer(e.target.value)}
                                placeholder="Fabricante do Dispositivo"/>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="model">Modelo</label>
                        <input 
                            type="text" id="model" 
                            value={model} onChange={e => setModel(e.target.value)} 
                            placeholder="Modelo do Dispositivo"/>

                        <label htmlFor="serie">Número de serie</label>
                        <input 
                            type="text" id="serie" value={serial} 
                            onChange={e => setSerial(e.target.value)} 
                            placeholder="Número de serie"/>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="dispo">Tipo de dispositivo</label>
                            <input 
                                type="text" id="dispo" 
                                value={device} onChange={e => setDevice(e.target.value)} placeholder="Tipo de Dispositivo"/>
                            <label htmlFor="">Setor</label>
                            <input 
                                type="text" value={setor} 
                                onChange={e => setSetor(e.target.value)} placeholder="Setor alocado"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Usuário</label>
                            <input 
                                type="text" value={owner} 
                                onChange={e => setOwner(e.target.value)} placeholder="Usuário"/>
                            <label htmlFor="">Data de entrada</label>
                            <input 
                                type="date" value={dataEntrada} 
                                onChange={e => setDataEntrada(e.target.value)} placeholder="Data Entrada"/>
                            <label htmlFor="">Data de saída</label>
                            <input 
                                type="date" value={dataSaida} 
                                onChange={e => setDataSaida(e.target.value)} placeholder="Data Saída"/>
                        </div>

                        <div className="form-group">
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}