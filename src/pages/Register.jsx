import api from '@/api/api'
import Button from '@/components/ui/Button'
import InputWithLabel from '@/components/ui/InputWithLabel'
import { CombinationLogo } from '@/components/ui/Logo'
import Typography from '@/components/ui/Typography'
import { useAuth } from '@/context/AuthProvider'
import { submitData } from '@/utils/submitData'
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import loginBG from '../assets/login-bg.svg'
import useDocumentTitle from '@/hooks/useDocumentTitle'
export default function Register() {
    
    useDocumentTitle("GT | Register");
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null);
    const navigate = useNavigate()
    const [input, setInput] = React.useState({})
    const handleOnChange = (field, value) => {
        setInput((prevState) => ({ ...prevState, [field]: value }));
    }
    const {token} = useAuth()
    const handleSubmit =  async (e) =>{
        e.preventDefault()
        try {
            setLoading(true)
            await api.post('/register',input)
            navigate('/login')
        } catch (err) {
            setError(err.response ? err.response.data : { message: "Network Error" });
        } 
        finally {
            setLoading(false);
        }
    }
    
    if(token) {return <Navigate to="/booking" />}
    return (
        <React.Fragment>
            {/* <img src={loginBG} className="fixed  w-screen top-0 left-0 opacity-30"/> */}
            <form
            
                onSubmit={handleSubmit}
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex borderbg-bg  bg-white shadow-xl rounded-3xl p-10 min-w-[500px] max-w-[500px]  mx-auto flex-col">
                <CombinationLogo className={`mx-auto h-8 mb-5`} />
                
                <div className='space-y-5'>
                    <InputWithLabel variant={error?.errors?.name ? 'danger':'default'} message={error?.errors?.name} label="Name" name={'name'} className={`w-full`} onChange={(e)=>handleOnChange("name", e.target.value)}/>
                    <InputWithLabel variant={error?.errors?.email ? 'danger':'default'} message={error?.errors?.email} label="Email Address" name={'email'} className={`w-full`} onChange={(e)=>handleOnChange("email", e.target.value)}/>
                    <InputWithLabel variant={error?.errors?.password ? 'danger':'default'} message={error?.errors?.password} type="password" label="Password" name={'password'} className={`w-full`} onChange={(e)=>handleOnChange("password", e.target.value)}/>
                    <InputWithLabel variant={error?.errors?.password_confirmation ? 'danger':'default'} message={error?.errors?.password_confirmation} type="password" label="Confirm Password" name={'password_confirmation'} className={`w-full`} onChange={(e)=>handleOnChange("password_confirmation", e.target.value)}/>
                    <Typography variant='label1' className={`mt-2 cursor-pointer flex items-center gap-1`}><input required type="checkbox" name="agree" checked={input.agree || false}  onChange={(e)=>handleOnChange("agree", e.target.checked)} /> By signing up I agree with Terms & Conditions</Typography>
                </div>
                <Button size="small2" type="submit" className="mt-2 flex items-center justify-center">
                    {loading ? <AiOutlineLoading color="#ffffff" className="text-base animate-loadingCircle"/> : "Create Account"}
                </Button>
                <Typography
                    variant="small"
                    className={`text-center mt-6 relative after:absolute  after:w-[26%] after:h-[.5px] after:bg-gray-300 after:left-0 after:top-1/2 after:-translate-y-1/2  before:absolute  before:w-[26%] before:h-[.5px] before:bg-gray-300 before:right-0 before:top-1/2 before:-translate-y-1/2`}>
                    Already have an account? <Link to={'/login'} className='text-sky-500'>Login</Link>
                </Typography>
            </form>
        </React.Fragment>
    )
}
