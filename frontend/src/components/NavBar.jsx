import '../styles/NavBar.css';
import NavBarContact from './NavBar/NavBarContact';
import NavBarProfile from './NavBar/NavBarProfile';
import NavBarSearch from './NavBar/NavBarSearch';
import LogoutButton from './LogoutButton';
import { useState } from 'react';
import icon from '../assets/menu-burger.svg'

function NavBar({
    user, myUsername, myBio, myInfo, setMyInfo,
    setMessages, setCurrentFriend, currentFriend,
    setShowSendMessage, messages, collapsed
}) {
    

    const toggleNav = () => {
        setCollapsed(prev => !prev);
    };

    return (
        <>
            {/* Toggle Button (visible only on mobile) */}
            

            <div className={`nav-bar-wrapper ${collapsed ? 'collapsed' : ''}`}>
                <NavBarProfile myInfo={myInfo}/>
                <NavBarSearch
                    user={user}
                    myUsername={myUsername}
                    myBio={myBio}
                    myInfo={myInfo}
                    setMyInfo={setMyInfo}
                    setMessages={setMessages}
                />
                {Object.keys(myInfo).length > 0 &&
                    <NavBarContact
                        myInfo={myInfo}
                        user={user}
                        setMessages={setMessages}
                        setCurrentFriend={setCurrentFriend}
                        currentFriend={currentFriend}
                        setShowSendMessage={setShowSendMessage}
                        messages={messages}
                    />
                }
                <LogoutButton />
            </div>
        </>
    );
}

export default NavBar;
