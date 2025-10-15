import '../../styles/NavBar.css'
import profilePic from '../../assets/profile-pic.png'


function NavBarProfile({myInfo}) {
    
    

    return (
        <>
            <div className="nav-bar-profile-wrapper">
                <div className='nav-bar-profile-picture-container'>
                    <img src={profilePic} alt="Profile Pic" draggable="false"/>
                </div>
                <div className='nav-bar-profile-info-container'>
                    <p>{myInfo.username}</p>
                    <p>{myInfo.bio}</p>
                </div>
                <div className='nav-bar-profile-button-container' >
                    <button>My Profile</button>
                </div>
            </div>
        </>
    );
}

export default NavBarProfile