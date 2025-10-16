import '../styles/MessagePlace.css'
import sendIcon from '../assets/sendIcon.svg'
import IndividualMessageCatloutStandalone from './MessagePlaceComponent/Individual-message-catllout-standalone';
import IndividualMessageCatloutMiddle from './MessagePlaceComponent/Individual-message-catllout-middle';
import { useRef, useState, useEffect } from 'react';

import api from '../lib/axios.js'
import toast from 'react-hot-toast'

import icon from '../assets/menu-burger.svg'

function MessagePlace({myInfo, messages, user, currentFriend, setMessages, showSendMessage, setCollapsed}) {
    const messagesEndRef = useRef(null);
    const [isNearBottom, setIsNearBottom] = useState(true);

    const [loading, setLoading] = useState(false)

    

    const messagesList = messages?.messages || [];


    const [currentMessageWrite, setCurrentMessageWrite] = useState('')

    const [first, second] = [myInfo.username, currentFriend].sort();
    const combinedUsername = `${first}${second}`; // e.g., "@marlin@soe"

    

    const toggleNav = () => {
        setCollapsed(prev => !prev);
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const bottomThreshold = 50; // px from bottom to count as "near bottom"
        if (scrollHeight - scrollTop - clientHeight < bottomThreshold) {
            setIsNearBottom(true);
        } else {
            setIsNearBottom(false);
        }
    };


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const prevMessagesCount = useRef(messagesList.length);

    useEffect(() => {
    if (isNearBottom || messagesList.length > prevMessagesCount.current) {
        scrollToBottom();
    }
    prevMessagesCount.current = messagesList.length;
    }, [messagesList, isNearBottom]);




    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.put(`/messages/chat/update/${combinedUsername}`, {
                messageContent: currentMessageWrite,
                ownerUsername: myInfo.username
            }, {
                headers: {
                'Authorization': `Bearer ${user.token}`
                }
            } )
            console.log(messages)
            setMessages(response.data.data)
            setCurrentMessageWrite('')
            
        } catch (error) {
            toast.error('Could not send the message.')
        }
        finally {
            setLoading(false)
        }
    }

    

    


    return (
        <>
            <div className="message-place-wrapper">
                <div className='message-place-inner-wrapper'>
                    <div className='message-place-header-container'>
                        <p>{currentFriend ? currentFriend : 'Click A Friend To Chat'}</p>
                        <button 
                            className="nav-toggle-button"
                            onClick={toggleNav}
                        >
                                <img src={icon} alt="" />
                        </button>
                    </div>
                    <div className='message-place-message-display-container' onScroll={handleScroll}> 
                        {
                            messagesList.length > 0 && (
                                
                                messagesList.map(message => {
                                    return(<IndividualMessageCatloutMiddle message={message} myInfo={myInfo}/>);
                                })
                            )

                        }
                        
                        {/* <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutStandalone/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutStandalone/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/>
                        <IndividualMessageCatloutMiddle/> */}
                        <div ref={messagesEndRef} />
                    </div>
                    {showSendMessage && 
                        <div className='message-place-send-message-container'>
                            <form onSubmit={handleSubmit}>
                                <textarea name="" id="" placeholder='Write you message...' onChange={(e) => setCurrentMessageWrite(e.target.value)} value={currentMessageWrite}></textarea>
                                <button onClick={handleSubmit} disabled={loading}><img src={sendIcon} alt="" /></button>
                            </form>
                        </div>
                    }
                    

                </div>

            </div>
        </>
    );
}

export default MessagePlace