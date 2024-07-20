import { Outlet } from "react-router-dom"

function MainLayout() {
    return (
        <div className='h-screen flex bg-slate-500 justify-center items-center'>
            <Outlet />
        </div >

    )
}

export default MainLayout