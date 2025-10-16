
import { BackgroundLinesDemo } from '../components/AlreadyComponent/SignupBg'
import '../styles/Signup.css'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Login () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await api.post('user/login', {
                username, 
                password, 
            })

            setPassword('');
            setUsername('');

            const userData = {
                username: response.data.username,
                token: response.data.token
            };

            localStorage.setItem("user", JSON.stringify(userData));
            toast.success('Login Successfully.')

            navigate('/')

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
                        <p>Login</p>
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


                    <div className="sign-up-button-container">
                        <button disabled={loading} onClick={(e) => handleSubmit}>{loading ? 'Login...' : 'Login'}</button>
                    </div>
                    <p className='sign-up-link-page-p'>Doesn't have an account? <Link to='/signup'>Sign Up</Link> </p>
                </form>
            </div> 
            <BackgroundLinesDemo/>
        </div>
        </>
    )
}

export default Login