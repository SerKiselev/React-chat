import { useState, useEffect } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot } from "firebase/firestore";

import { Layout } from './Layout';

import { FIREBASE_CONFIG } from "../../constants/firebaseConfig";

import './PrivatePage.scss';

export const PrivatePage = ({ user }) => {
    const [message, setMessage] = useState('');
    const [smsArr, setSmsArr] = useState([]);

    const app = initializeApp(FIREBASE_CONFIG);
    const db = getFirestore(app);
    const messages = collection(db, "messages");

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
    }, [ ]);
    
    useEffect(() => {
        const smsBlock = document.getElementsByClassName('smsBlock')[0];
        
        smsBlock.scrollTo(
            { top: smsBlock.scrollHeight, behavior: 'smooth' }
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
            photoURL 
        } = user;

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