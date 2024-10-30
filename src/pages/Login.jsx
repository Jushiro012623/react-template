import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import MiddleInput from '@/components/ui/MiddleInput'
import {CombinationLogo} from '@/components/ui/Logo'
import React from 'react'
import { LuUser2, LuLock  } from "react-icons/lu";
import { submitData } from '@/utils/submitData'
export default function Login() {

  const [creds, setCreds] = React.useState({
    email: '',
    password: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(creds);
    const authUser = await submitData('login', creds)
  }
  return (
    <section className="relative w-full h-screen py-[120px] px-[5%]">
      <form onSubmit={handleSubmit} className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex border rounded-3xl p-10 bg-bg min-w-[500px] max-w-[500px]  mx-auto flex-col">
        <CombinationLogo className={`mx-auto h-8`} />
        <MiddleInput name="email" placeholder="Email Address" className={`w-full`} parentClass={` mt-10`} icon={<LuUser2 className="text-gray-500"/>} onChange={(e)=>setCreds(prevState => ({ ...prevState, email: e.target.value }))}/>
        <MiddleInput type="password" name="password" placeholder="Password" className={`w-full`} parentClass="mt-5"  icon={<LuLock className="text-gray-500" />} onChange={(e)=>setCreds(prevState => ({ ...prevState, password: e.target.value }))}/>
        <Typography variant='small' className={`text-right mt-2`}>Forgot Password?</Typography>
        <Button size='small2' type="submit" className="mt-2">Button</Button>
        <Typography variant='small' className={`text-center mt-6 relative after:absolute  after:w-[38%] after:h-[.5px] after:bg-gray-300 after:left-0 after:top-1/2 after:-translate-y-1/2  before:absolute  before:w-[38%] before:h-[.5px] before:bg-gray-300 before:right-0 before:top-1/2 before:-translate-y-1/2`}>No Account</Typography>
        <Button size='small2' type="submit" variant="border" className="mt-6">Create Account</Button>
      </form>
    </section>
  )
}
