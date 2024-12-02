import React from 'react'
import notfound from '../../assets/notfound.svg'
import Typography from '@/components/ui/Typography'
import { NavLink } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useAuth } from '@/context/AuthProvider'
import useDocumentTitle from '@/hooks/useDocumentTitle'
export default function NotFound() {
    useDocumentTitle("404 | Not Found")
    const {token} = useAuth()
  return (
    <React.Fragment>
        <div className='w-full h-screen place-items-center place-content-center'>
            <img src={notfound} alt="" className='w-[250px]'/>
            <Typography className={`mt-10 text-[3rem] font-bold text-red-400`}>404 | Page Not Found</Typography>
            <Typography variant='body2' className={`w-[450px] text-center mt-10`}>Sorry, the page you’re looking for doesn’t seem to exist. It might have been moved, deleted, or never existed in the first place.</Typography>
            <NavLink to="/"> <Button variant='border' className={`mt-6 w-full !px-10`}> Go back to {token ? 'Homepage' : 'Login'}</Button> </NavLink>
        </div>
    </React.Fragment>
  )
}
