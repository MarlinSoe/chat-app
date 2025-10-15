import '../../styles/NavBar.css'
import profilePic from '../../assets/profile-pic.png'
import searchIcon from '../../assets/Vector.svg'
import { useEffect, useState } from 'react'
import api from '../../lib/axios'
import add from '../../assets/add.svg'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function NavBarSearch({user, myInfo, setMyInfo}) {


    const handClick = () => {
        const el = document.querySelector('.nav-bar-search-wrapper');
        if (el) {
            el.classList.toggle('active');
        }

        const friendDiv = document.querySelector('.nav-bar-serach-friend-suggestion-container');
        if (friendDiv) {
            friendDiv.classList.toggle('active');
        }
    }

    const [suggestedUsers, setSuggestedUsers] = useState([])

    useEffect(()=> {
        const fetchSuggestedUser = async() => {
            try {
                const res = await api.get('/user/suggestion', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                setSuggestedUsers(res.data)
            } catch (error) {
                console.log('Error fetching to suggested users.', error);
            }
        }
        
        fetchSuggestedUser()
    }, [])

    const handleAddFriend = async(suggestedUserUsername) => {
        handClick()
        try {
            
            const res = await api.post(
                `/user/friend/add/${myInfo.username}/${suggestedUserUsername}`,
                {}, // empty body
                {
                    headers: {
                    'Authorization': `Bearer ${user.token}`
                    }
                }
            )
            toast.success(`${suggestedUserUsername} is added in your friend list.`)
            setMyInfo(res.data)

            const [first, second] = [myInfo.username, suggestedUserUsername].sort();
            const combinedUsername = `${first}${second}`; // e.g., "@marlin@soe"

            const establishFriendConnection = await api.post(
                `/messages/establish/${combinedUsername}`,
                {}, // body (if empty)
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            )


        } catch (error) {
            console.log("Error adding friend:", error.response?.data || error.message);

            const errorMessage = error.response?.data?.message || 'Something went wrong.';

            toast.error(errorMessage);
        }   
    }

    return (
        <>
        <div className='nav-bar-search-outer-main-wrapper'>
            <div className="nav-bar-search-wrapper" onClick={handClick}>
                <input type="text" placeholder='Find @username'/>
                <img src={searchIcon} alt="" />
            </div>


            <div className='nav-bar-serach-friend-suggestion-container'>
                {suggestedUsers.length > 0 && (
                    suggestedUsers.map(suggestedUser => (
                        
                        <div className='nav-bar-search-individual-friend-container' key={suggestedUser.username} onClick={() => handleAddFriend(suggestedUser.username)}>
                            <div className='nav-bar-search-individual-friend-profile-container'>
                                <img src={profilePic} alt="" />
                                <p>{suggestedUser.username}</p>
                            </div>
                            <div className='nav-bar-search-individual-friend-add-container'> 
                                <img src={add} alt="" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    );
}

export default NavBarSearch