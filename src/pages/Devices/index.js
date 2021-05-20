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


    async function handleCadastro(e){
        e.preventDefault()

        if(name !== '' && manufacturer !== '' && model !== '' && serial !== '' && setor !== '' && owner !== '' && dataEntrada !== ''){

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
                        <div class="form-row">

                            <div class="form-group col-md-4">
                                <label>Nome do equipamento</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    
                                    placeholder="Nome do equipamento" value={name} onChange={e=> setName(e.target.value)}/>
                            </div>

                            <div class="form-group col-md-4">
                                <label>Fabricante</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    
                                    placeholder="Fabricante" value={manufacturer} onChange={e => setManufacturer(e.target.value)}/>
                            </div>
                            <div class="form-group col-md-4">
                                <label>Modelo</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    
                                    placeholder="Modelo" value={model} onChange={e => setModel(e.target.value)}/>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label>Setor alocado</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Setor alocado" value={setor} onChange={e => setSetor(e.target.value)}/>
                            </div>
                            <div class="form-group col-md-4">
                                <label>Número de serie</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Número de serie" value={serial} onChange={e => setSerial(e.target.value)}/>
                            </div>
                            <div class="form-group col-md-4">
                                <label>Tipo do Dispositivo</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Tipo do Dispositivo" value={device} onChange={e => setDevice(e.target.value)}/>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Usuário alocado</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    placeholder="Usuário alocado" value={owner} onChange={e => setOwner(e.target.value)}/>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="date">Data</label>
                                <input 
                                    type="date" 
                                    class="form-control" 
                                    id="date" placeholder="Data" value={dataEntrada} onChange={e => setDataEntrada(e.target.value)}/>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}