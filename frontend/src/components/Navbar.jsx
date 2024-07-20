import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaCaretDown } from 'react-icons/fa'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useState } from 'react'


function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)

    const [logoutApiCall] = useLogoutMutation();
    async function logoutHandler() {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            setIsOpen(!isOpen)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    const [isOpen, setIsOpen] = useState(false)

    const isOpenHandle = (e) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }
    return (
        <div className='flex flex-row items-center justify-center bg-slate-600 text-white px-4 py-2'>
            <button onClick={() => navigate('/')}>Navbar</button>
            <div className="ml-auto flex ">
                {
                    userInfo ?
                        <>
                            <button className=' bg-slate-500 rounded p-2 mb-1 mx-2 flex justify-center items-center gap-1' onClick={isOpenHandle}>{userInfo.name} <FaCaretDown /></button>
                            {
                                isOpen &&
                                <>
                                    <div className='drop-shadow-sm absolute flex flex-col p-2 bg-slate-700 mt-11 rounded mx-2 justify-center items-start'>
                                        <button className='p-1 rounded' onClick={() => {
                                            navigate('/profile')
                                            setIsOpen(!isOpen)
                                        }
                                        }>Profile</button>
                                        <button className='p-1 rounded' onClick={logoutHandler}>Logout</button>
                                    </div>
                                </>
                            }
                        </>
                        :
                        <>
                            <button className='p-2 bg-slate-500 rounded mx-2' onClick={() => navigate('/login')}>Login</button>
                            <button className='p-2 bg-slate-500 rounded' onClick={() => navigate('/register')}>Sign up</button>
                        </>
                }
            </div>
        </div >
    )
}

export default Navbar