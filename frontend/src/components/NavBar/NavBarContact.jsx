import { useEffect, useState } from 'react';
import '../../styles/NavBar.css';
import profilePic from '../../assets/profile-pic.png';
import api from '../../lib/axios.js';
import toast from 'react-hot-toast';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

function NavBarContact({ myInfo, user, setMessages, setCurrentFriend, currentFriend, setShowSendMessage}) {
    const friendList = myInfo.friends;

    const [localLastMessage, setLocalLastMessage] = useState([])
    const [localLastTime, setLocalLastTime] = useState([])

    const maxLength = 35;
    const text = "Falling in love with life—and with the little things along the way.";
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + "..." : text;


    const fetchMessages = async (friend) => {
        const [first, second] = [myInfo.username, friend].sort();
        const combinedUsername = `${first}${second}`;
        try {
            const response = await api.get(`messages/chat/fetch/${encodeURIComponent(combinedUsername)}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setMessages(response.data.Messages);
        } catch (error) {
            toast.error('Cannot fetch messages.');
            console.error(error);
        }
    };
    const formatTimestamp = (isoDateString) => {
        const date = parseISO(isoDateString);

        if (isToday(date)) {
            return `Today, ${format(date, 'hh:mm a')}`;
        } else if (isYesterday(date)) {
            return `Yesterday, ${format(date, 'hh:mm a')}`;
        } else {
            return format(date, 'MMM d, hh:mm a'); // e.g., Oct 12, 03:15 PM
        }
    };

    const fetchLastMessage = async (friend) => {
        const [first, second] = [myInfo.username, friend].sort();
        const combinedUsername = `${first}${second}`;
        try {
            const response = await api.get(`messages/chat/fetch/${encodeURIComponent(combinedUsername)}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const messages = response.data.Messages.messages;

            if (messages && messages.length > 0) {
                const lastMessage = messages[messages.length - 1].content;
                const lastTime = formatTimestamp(messages[messages.length-1].createdAt);
                setLocalLastMessage(prev => ({
                    ...prev,
                    [friend]: lastMessage
                }));
                setLocalLastTime(prev => ({
                    ...prev,
                    [friend]: lastTime
                }))
            }
        } catch (error) {
            console.error(`Error fetching last message for ${friend}:`, error);
        }
    };
    useEffect(() => {
        if (!friendList || friendList.length === 0) return;

        friendList.forEach(friend => {
            fetchLastMessage(friend);
        });
    }, [friendList]);
    const getTruncatedMessage = (message) => {
        const maxLength = 35;
        return message?.length > maxLength ? message.slice(0, maxLength) + "..." : message;
    };



    const handleClick = (e, friend) => {
        e.preventDefault();
        setShowSendMessage(true)
        setCurrentFriend(friend);
        fetchMessages(friend); // fetch immediately
    };

    useEffect(() => {
        if (!currentFriend) return;

        const interval = setInterval(() => {
            fetchMessages(currentFriend);
        }, 2000); // 2 seconds

        return () => clearInterval(interval); // cleanup on unmount or when currentFriend changes
    }, [currentFriend]); // re-run if currentFriend changes

    return (
        <div className="nav-bar-contact-wrapper">
            {friendList.length > 0 && (
                friendList.map((friend, index) => (
                    <div className='individual-nav-bar-contact-container' key={index} onClick={(e) => handleClick(e, friend)}>
                        <div className='individual-nav-bar-contact-profile-img-container'>
                            <img src={profilePic} alt="" />
                        </div>
                        <div className='individual-nav-bar-contact-info-container'>
                            <p>{friend}</p>
                            <p>{getTruncatedMessage(localLastMessage[friend] || "No messages yet. Say Hi!")}</p>
                        </div>
                        <div className='individual-nav-bar-contact-time-container'>
                            {localLastTime[friend]}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default NavBarContact;
