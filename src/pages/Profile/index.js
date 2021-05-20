import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';

import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import {FiSettings, FiUpload} from 'react-icons/fi';

import './profile.css'
export default function Profile(){

    const {user, signOut, setUser, storageUser} = useContext(AuthContext)


    const [name, setName] = useState( user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)


    // Busca imagem e cria um preview da imagem 
    function handleFile(e){

        if(e.target.files[0]){
            let image = e.target.files[0];
            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            }else{
                alert('Envie uma imagem do tipo PNG ou JPEG')
                setImageAvatar(null)
                return null;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;

        const uploadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then( async () => {
            console.log('Foto enviada com sucesso!')
            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then( async (url) => {

                let fotoUrl = url;

                await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    avatarUrl: fotoUrl,
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        avatarUrl: fotoUrl,
                        name: name
                    }

                    setUser(data)
                    storageUser(data)
                })

            })
        })
    }


    async function handleSave(e){
        e.preventDefault()

        if(imageAvatar == null && name !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                name: name
            })
            .then(() =>{
                let data = {
                    ...user,
                    name:name
                }

                setUser(data)
                storageUser(data)

            })
        }

        else if(name !== '' && imageAvatar !== null){
            handleUpload()
        }
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title title="Meu perfil" >
                    <FiSettings size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile}/>
                            {avatarUrl == null ?
                                <img src={avatar} alt="Foto de perfi do usuário" width="250" height="250"/>
                                :
                                <img src={avatarUrl} alt="Foto de perfi do usuário" width="250" height="250"/>
                            }
                        </label>
                        
                        <div className="card">
                            <h5 className="card-header">
                                Editar Perfil
                            </h5>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="name">Nome</label>
                                    <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input className="form-control" type="email" value={email} disabled={true}/>
                                </div>
                            </div>
    
                            <div className="btn-group p-4" role="group" aria-label="">
                                <button type="submit" className="btn btn-primary">Salva</button>
                                <button className="btn btn-primary ml-2" onClick={() => signOut()}>Logout</button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>


        </div>
    )
}