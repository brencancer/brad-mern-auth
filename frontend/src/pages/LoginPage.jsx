import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    async function submitHandler(e) {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (

        <div className='bg-slate-700 p-4 m-2 rounded'>
            <h1 className='text-white text-2xl font-semibold text-center p-2 mb-2'>Login</h1>
            <form onSubmit={submitHandler}>
                <fieldset id='email' className='flex flex-col'>
                    <label className='text-white'>Email Address</label>
                    <input
                        type="Email"
                        className='p-2 my-1 rounded outline-none'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </fieldset>
                <fieldset id='password' className='flex flex-col '>
                    <label className='text-white'>Password</label>
                    <input
                        type="Password"
                        className='p-2 my-1 rounded outline-none'
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </fieldset>

                {
                    isLoading && <Loader />
                }
                <button type='submit' className=' w-full bg-slate-800 hover:bg-slate-600 p-2 mt-2 outline-none text-white rounded'>sign in</button>
            </form>
            <h4 className='text-slate-400 text-center'>Create new account?<br />
                <Link to='/register' className='hover:text-white ' >
                    Register here
                </Link>
            </h4>
        </div>
    )
}

export default LoginPage