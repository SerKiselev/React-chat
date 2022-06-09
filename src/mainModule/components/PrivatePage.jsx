import { Layout } from './Layout';
import './PrivatePage.scss';

import { addDoc, getDocs, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app"; // fix
import { getFirestore, doc, onSnapshot } from "firebase/firestore"; // fix
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBujDv32R0dlSuNJf8EXN2adxIhvg7HthY",
    authDomain: "react-chat-6d3b1.firebaseapp.com",
    projectId: "react-chat-6d3b1",
    storageBucket: "react-chat-6d3b1.appspot.com",
    messagingSenderId: "31486350759",
    appId: "1:31486350759:web:5944c70ff62f1572901282"
};

export const PrivatePage = ({ user }) => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const messages = collection(db, "messages");
    const [message, setMessage] = useState('');
    const [smsArr, setSmsArr] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(messages, (querySnapshot) => {
            const sms = querySnapshot.docs.map(doc => {
                return {
                    uid: doc.data().uid,
                    displayName: doc.data().displayName,
                    email: doc.data().email,
                    photoURL: doc.data().photoURL,
                    message: doc.data().message,
                    time: doc.data().time
                };
            });

            setSmsArr(sms.sort((a, b) => a.time - b.time));
        });

        return unsub;
    }, []);
    
    useEffect(() => {
        const x = document.getElementsByClassName('smsBlock')[0];
        
        x.scrollTo(
            { top: x.scrollHeight, behavior: 'smooth' }
        )
    },[smsArr]);

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const { uid,
            displayName,
            email,
            metadata,
            photoURL } = user;
        const mes = message.trim();

        const sendObj = {
            uid,
            displayName,
            email,
            photoURL,
            message: mes,
            time: new Date().getTime(),
        };

        setMessage('');
        mes  && await addDoc(messages, sendObj);
    }

    const renderMessages = () => {
        const arr = smsArr.map(el => {
            return (
                <div className={user.uid === el.uid ? 'sms userSms' : 'sms'}>
                    <p>{el.displayName}</p>
                    <div>{el.message}</div>
                </div>
            );
        });

        return arr;
    }

    return (
        <Layout>
            <div className='privatePageContainer'>
                Private Page
                <div className="smsBlock">
                    {renderMessages()}
                </div>
                <form className='authPageForm' onSubmit={handleSubmitForm}>
                    <input
                        className='authPagePasswordField' // fix this
                        type='text'
                        placeholder='Type Message'
                        value={message}
                        onChange={handleChangeMessage}
                    />
                    <button>Send</button>
                </form>
            </div>
        </Layout>
    );
}