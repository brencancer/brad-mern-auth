import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

function RegisterPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")


    const { userInfo } = useSelector((state) => state.auth)
    const [register, { isLoading }] = useRegisterMutation()

    async function submitHandler(e) {
        e.preventDefault()
        if (password != confirmPassword) { toast.error('Passwords do not match') }
        else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    return (

        <div className='bg-slate-700 p-4 m-2 rounded'>
            <h1 className='text-white text-2xl font-semibold text-center mb-2'>Register</h1>
            {
                isLoading && <Loader />
            }
            <form onSubmit={submitHandler}>
                <fieldset id='name' className='flex flex-col'>
                    <label className='text-white'>Name</label>
                    <input
                        type="text"
                        className='p-2 my-1 rounded outline-none'
                        placeholder='Enter your name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </fieldset>
                <fieldset id='email' className='flex flex-col'>
                    <label className='text-white'>Email Address</label>
                    <input
                        type="email"
                        className='p-2 my-1 rounded outline-none'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </fieldset>
                <fieldset id='password' className='flex flex-col '>
                    <label className='text-white'>Password</label>
                    <input
                        type="password"
                        className='p-2 my-1 rounded outline-none'
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <fieldset id='confirmPassword' className='flex flex-col '>
                    <label className='text-white'>Confirm Password</label>
                    <input
                        type="password"
                        className='p-2 my-1 rounded outline-none'
                        placeholder="Confirm you password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)} />
                </fieldset>
                <button type='submit' className=' w-full bg-slate-800 hover:bg-slate-600 p-2 mt-2 outline-none text-white rounded'>Sign up</button>
            </form>
            <h4 className='text-slate-400 text-center'>Already have account? <br />
                <Link to='/login' className='hover:text-white ' >
                    Login to continue
                </Link>
            </h4>
        </div>
    )
}

export default RegisterPage