import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import "./style.css"
import { AnimeContext } from '../../Context';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

function RecoverPassword({setSwip, setForgotPassword, setLogin, setEmailFromS, setUserId, setConditionOfValidPage, setOtp}) {

    const {setSign, url} = React.useContext(AnimeContext)
    const [checkError, setCheckError] = React.useState(false)
    const [emailError, setEmailError] = React.useState("User does not exit.")
    const [emailData, setEmailData] = React.useState("")

    const handleInput =  (e) => {
        setEmailData(e.target.value)
    }

    const handleEmail = async () => {
        try {
            if(emailData.length < 1) {
               setCheckError(true)
               return setEmailError("Enter email")
            }
            setCheckError(false)
            const {data} = await axios.post(`${url}v1/recoverPassword`, {email: emailData})
            setEmailFromS(data.email)
            setUserId(data.userId)
            setForgotPassword(false)
            setSwip(true)
            setOtp("")
        } catch (error) {
            console.log(error)
            if(error.response.status === 404) {
                setEmailError(error.response.data.msg)
                setCheckError(true)
            }
            if(error.response.status === 429) {
                setEmailError(error.response.data)
                setCheckError(true)
              }
        }
    }
    setConditionOfValidPage(true)

    return (
        <div>
            <div className='signTitle'>
              <div><ArrowBackIosIcon onClick={() => (setSwip(false), setForgotPassword(false), setLogin(true))} style={{cursor: "pointer", userSelect: "none"}}/></div>
              <div><CloseIcon onClick={() => setSign(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
            </div>
            <div style={{textAlign: "center", padding: "0px 30px"}}>
               <Typography id="emV">Recover Password</Typography>
               <Typography id="subV">Enter the email address linked to your account and we will send you a verification code.</Typography>
               <TextField id="outlined-textarea" error={checkError} helperText={checkError && emailError}
                name='email' value={emailData} onChange={handleInput} size='small' rows={2} label="Email" placeholder='Enter your email' multiline fullWidth className='emailRecover'
               />
               <Button id="next" fullWidth onClick={handleEmail}>Next</Button>
            </div>
        </div>
    )
}

export default RecoverPassword
