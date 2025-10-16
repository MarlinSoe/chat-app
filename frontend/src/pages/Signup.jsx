
import { BackgroundLinesDemo } from '../components/AlreadyComponent/SignupBg'
import '../styles/Signup.css'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await api.post('user/signup', {
                username, 
                password, 
                bio, 
                birthYear
            })

            setPassword('');
            setUsername('');
            setBio('');
            setBirthYear('');


            toast.success('Sign Up Successfully.')
        } catch (error) {
            toast.error(error.response?.data?.error)

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <div className='sign-up-outer-main-wrapper'>
            <div className="sign-up-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="sign-up-title-container">
                        <p>Sign Up</p>
                    </div>

                    <div className="sign-up-individual-main-container">
                        <p className='p-indvidual-title'>Account Info</p>
                        <div className="sign-up-individual-main-indvidual-container">
                            <input type="text" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="sign-up-individual-main-indvidual-container">
                            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="sign-up-individual-main-container"> 
                        <p className='p-indvidual-title'>Personal Info</p>
                        <div className="sign-up-individual-main-indvidual-container">
                            <input type="text" placeholder="bio" value={bio} onChange={(e) => setBio(e.target.value)}/>
                        </div>
                        <div className="sign-up-individual-main-indvidual-container">
                            <input
                                type="number"
                                placeholder="Birth year"
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                min="1900"
                                max={new Date().getFullYear()}
                            />

                        </div>
                    </div>

                    <div className="sign-up-button-container">
                        <button disabled={loading} onClick={(e) => handleSubmit}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
                    </div>
                    <p className='sign-up-link-page-p'>Already have an account? <Link to='/login'>Login</Link> </p>
                </form>
            </div> 
            <BackgroundLinesDemo/>
        </div>
        </>
    )
}

export default SignUp