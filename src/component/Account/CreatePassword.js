import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import { AnimeContext } from '../../Context';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import "./style.css"
import axios from 'axios';

function CreatePassword({setForgotPassword, setRecreatePassword, emailFromS, setEmailFromS}) {

    const {setSign, url} = React.useContext(AnimeContext)

    const [checkError, setCheckError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState("Fuck you")
    const [passwordNew, setPasswordNew] = React.useState("")

    const [checkError2, setCheckError2] = React.useState(false)
    const [passwordError2, setPasswordError2] = React.useState("Fuck you")
    const [passwordNew2, setPasswordNew2] = React.useState("")

    const handlePassword = async () => {
         try {
            if(passwordNew.length < 1) {
                setCheckError(true)
                return setPasswordError("Enter password")
            } else if(passwordNew.length < 8) {
                setCheckError(true)
                return setPasswordError("Enter password at least 8 characters")
            }
            setCheckError(false)
            if(passwordNew2.length < 1) {
                setCheckError2(true)
                return setPasswordError2("Please re-enter password")
            } else if(passwordNew !== passwordNew2) {
                
                setCheckError2(true)
                return setPasswordError2("Passwords are not match")
            }

            setCheckError2(false)
            
            const {data} = await axios.patch(`${url}v1/user/changePassword`, {newPassword: passwordNew, email: emailFromS})
            if(data.msg === "Password change successfully") {
                setEmailFromS("")
                setSign(false)
            }

         } catch (error) {
            console.log(error)
         }
    }

    return (
        <div>
            <div className='signTitle'>
              <div><ArrowBackIosIcon onClick={() => (setForgotPassword(true), setRecreatePassword(false))} style={{cursor: "pointer", userSelect: "none"}}/></div>
              <div><CloseIcon onClick={() => setSign(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
            </div>
            <div style={{textAlign: "center", padding: "0px 30px"}}>
                <Typography id="emV">Recover Password</Typography>
                <TextField id="outlined-textarea" type='password' error={checkError}  rows={2} 
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                        <LockIcon />
                        </InputAdornment>
                    )
                    }}
                helperText={checkError  && passwordError} 
                name='password' value={passwordNew} size='small' onChange={(e) => setPasswordNew(e.target.value)}
                label="Password" placeholder='at least 8 characters' multiline fullWidth className='emailRecover'/>
                <Typography id='subN'>Password should have at least 8 characters.</Typography>
                <TextField id="outlined-textarea" type='password' error={checkError2}  rows={2} 
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                        <LockIcon />
                        </InputAdornment>
                    )
                    }}
                helperText={checkError2  && passwordError2} 
                name='password' value={passwordNew2} size='small' onChange={(e) => setPasswordNew2(e.target.value)}
                label="Re-enter password" placeholder='at least 8 characters' multiline fullWidth className='emailRecover'/>
                <Button id="next" fullWidth onClick={handlePassword}>Confirm</Button>                
            </div>
        </div>
    )
}

export default CreatePassword
