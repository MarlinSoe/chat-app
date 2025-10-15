import profilePic from '../../assets/profile-pic.png'
import '../../styles/MessageCatlout.css'

function IndividualMessageCatloutStandalone ({message}) {
    return (
        <>
            
                <div className='individual-message-container-stand-alone'>
                    <div className='individual-message-container-stand-alone-inner-profile-image-container'>
                        <img src={profilePic} alt="" />
                    </div>
                    <div className='individual-message-container-stand-alone-inner-main-info-container'>
                        <div className='individual-message-container-stand-alone-inner-main-info-message-container'>
                            <p>{message.messageContent}</p>    
                            {/* Marlin is too handsome; he is like a rose that every girl adore. */}
                        </div>
                        <div className='individual-message-container-stand-alone-inner-main-info-time-container'>
                            <p>11:05 PM</p>
                        </div>

                    </div> 
                </div>

        </>
    )
}

export default IndividualMessageCatloutStandalone