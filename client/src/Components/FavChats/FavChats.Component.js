import ChatShowcase from '../ChatShowcase/ChatShowcase.Component'
import API from '../../API'
import {useEffect, useState} from 'react'
import axios from 'axios'

const FavChats = ({username, chats}) => {
    const [favChats, setFavChats] = useState([])

    useEffect(() => {
        const collectUserData = async () => {
            console.log(username);
            const user = await API.get(`/users/${username}`)
            console.log(user);
            // setFavChats(chats.filter((chat) =>
            //   user.favoriteChats.includes(chat.name)
            // ));
        }

        collectUserData();
    }, [])

    return <div><h1>{favChats}</h1></div>;
}

export default FavChats;