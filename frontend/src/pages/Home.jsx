import MessagePlace from "../components/MessagePlace";
import NavBar from "../components/NavBar";
import '../styles/Home.css'
import { useEffect, useState } from "react";
import api from "../lib/axios";

function Home() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [myUsername, setMyUsername] = useState('')
    const [myBio, setMyBio] = useState('')
    const [myInfo, setMyInfo] = useState({})
    const [currentFriend, setCurrentFriend] = useState('')

    const [messages, setMessages] = useState([])
    const [showSendMessage, setShowSendMessage] = useState(false)

    const [first, second] = [myInfo.username, currentFriend].sort();
    const combinedUsername = `${first}${second}`; // e.g., "@marlin@soe"

    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        const fetchMyInfoAndMessages = async () => {
            try {
                // Fetch user info
                const response = await api.get(`/user/myinfo/${user.username}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                const myInfo = response.data;
                setMyInfo(myInfo);
                setMyUsername(myInfo.username);
                setMyBio(myInfo.bio);


            } catch (error) {
                console.log('Error fetching info or messages:', error);
            }
        };

        fetchMyInfoAndMessages(); // Initial fetch on mount

        const intervalId = setInterval(fetchMyInfoAndMessages, 2000); // Fetch every 2s

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [user.username, user.token]);




    return (
        <>
            <div className="home-wrapper">
                <NavBar user={user} myUsername={myUsername} myBio={myBio} myInfo={myInfo} setMyInfo={setMyInfo} setMessages={setMessages} setCurrentFriend={setCurrentFriend}  currentFriend={currentFriend} setShowSendMessage={setShowSendMessage} messages={messages} collapsed={collapsed}/>
                <MessagePlace myInfo={myInfo} messages={messages} user={user} currentFriend={currentFriend} setMessages={setMessages} showSendMessage={showSendMessage} setCollapsed={setCollapsed}/>
            </div>
        </>
    );
}

export default Home 