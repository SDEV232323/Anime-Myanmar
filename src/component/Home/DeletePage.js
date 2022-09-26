import { Paper, Typography, TextField, InputAdornment, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { AnimeContext } from '../../Context';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeletePage() {

    const {setDeleteAcc, userInfo, url, setUserInfo} = React.useContext(AnimeContext)
    const [checkError2, setCheckError2] = React.useState(false)
    const [passwordError2, setPasswordError2] = React.useState("Incorrect password!")
    const [pass, setPass] = React.useState("")
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            if(pass.length < 1) {
                setPasswordError2("Enter password to delete account")
               return setCheckError2(true)
            }
            console.log(userInfo.id)
            const {data} = await axios.post(`${url}v1/myAccount/delete`, {deleteAcc: userInfo.id, password: pass})
            
            
            setCheckError2(false)
            setDeleteAcc(false)
            localStorage.removeItem("AmAc")
            setUserInfo()
            navigate("/")
            window.location.reload()
     
        } catch (error) {
            console.log(error)
            if(error.response.status === 401) {
                setPasswordError2(error.response.data.msg)
                setPass("")
                setCheckError2(true)
            }

            if(error.response.status === 429) {
                setPasswordError2(error.response.data)
                setPass("")
                setCheckError2(true)
            }
        }
    }

    return (
        <div className='signMain' >
            <div className='signConc'>
              <Paper elevation={3} id="sharePaper">
                <div className='insideShare'>
                    <div className='shareHeader'>
                        <Typography style={{fontWeight: "bold", fontSize: "19px"}}>Delete Account</Typography>
                        <div><CloseIcon onClick={() => setDeleteAcc(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
                    </div>
                </div>
                <div className='deleteText'>
                    <Typography id="askQforDelete">Are you sure you want to delete this account?</Typography>
                    <Typography id="warningForDelete">This action can't be undone. When you delete all your data, it will be erased from our system. Type your account password to perform this action.</Typography>
                    <TextField id="outlined-textarea" type='password' error={checkError2}  rows={2} 
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                        <LockIcon />
                        </InputAdornment>
                    )
                    }}
                helperText={checkError2  && passwordError2} 
                name='password' value={pass} size='small' onChange={(e) => setPass(e.target.value)}
                label="Password" placeholder='Your password' multiline fullWidth className='emailRecover'/>
                <div style={{marginTop: "40px"}}>
                    <Button id="deleteAccBut" onClick={handleDelete}>Delete</Button>
                    <Button id="deleteCancel" onClick={() => setDeleteAcc(false)}>Cancel</Button>
                </div>
                </div>
              </Paper>
            </div>
        </div>    
    )
}

export default DeletePage
