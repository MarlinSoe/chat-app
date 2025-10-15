import profilePic from '../../assets/profile-pic.png'
import '../../styles/MessageCatlout.css'
import { format, isToday, isYesterday, parseISO } from 'date-fns';

function IndividualMessageCatloutMiddle ({message, myInfo}) {
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
    return (
        <>
            
                <div className='individual-message-container-middle'>
                    
                    <div className='individual-message-container-middle-inner-main-info-container' >
                        <div className={message.owner === myInfo.username
                            ? 'individual-message-container-middle-inner-main-info-message-container-owner'
                            : 'individual-message-container-middle-inner-main-info-message-container'}>
                            <p>{message.content}</p>    
                            {/* Marlin is too handsome; he is like a rose that every girl adore. */}
                        </div>
                        <div className='individual-message-container-middle-inner-main-info-time-container'>
                            <p>{formatTimestamp(message.createdAt)}</p>
                        </div>

                    </div> 
                </div>

        </>
    )
}

export default IndividualMessageCatloutMiddle