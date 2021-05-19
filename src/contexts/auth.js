import {useState, useEffect, createContext} from 'react';
import firebase from '../services/firebaseConnection';

export const AuthContext = createContext({})

export default function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        function loadLocalStorage(){
            const storageUser = localStorage.getItem('SistemaUser')
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
    
            setLoading(false)
        }

        loadLocalStorage()
    }, [])


    // Fazendo um login do usuário
    async function signIn(email, password){
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async(value) => {
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                name: userProfile.data().name,
                email: value.user.email,
                avatarUrl: userProfile.data().avatarUrl,
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
        })
        .catch(error => {
            console.log(error)
            setLoadingAuth(false)
        })
    }


    // Cadastro de um novo usuário
    async function signUp(email, password, name){
        setLoadingAuth(true)

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({ 
                name: name,
                avatarUrl: null
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
            })
        })
        .catch(error => {
            console.log(error)
            setLoadingAuth(false)
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    // Fazer logout de usuário
    async function signOut(){
        await firebase.auth().signOut()
        localStorage.removeItem('SistemaUser')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, signUp, signOut,signIn,loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}