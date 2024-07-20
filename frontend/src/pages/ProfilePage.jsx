import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useUpdateUserMutation } from '../slices/usersApiSlice'

function ProfilePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")


    const { userInfo } = useSelector((state) => state.auth)
    const [updateProfile, { isLoading }] = useUpdateUserMutation()
    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.setName, userInfo.email])

    async function submitHandler(e) {
        e.preventDefault()
        if (password != confirmPassword) { toast.error('Passwords do not match') }
        else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Profile changes Saved')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }


    return (

        <div className='bg-slate-700 p-4 m-2 rounded'>
            <h1 className='text-white text-2xl font-semibold text-center mb-2'></h1>
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
                    <label className='text-white'>New Password</label>
                    <input
                        type="password"
                        className='p-2 my-1 rounded outline-none'
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <fieldset id='confirmPassword' className='flex flex-col '>
                    <label className='text-white'>Confirm New Password</label>
                    <input
                        type="password"
                        className='p-2 my-1 rounded outline-none'
                        placeholder="Confirm you password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)} />
                </fieldset>
                <button type='submit' className=' w-full bg-slate-800 hover:bg-slate-600 p-2 mt-2 outline-none text-white rounded'>Save Changes</button>
            </form>

        </div>
    )
}

export default ProfilePage