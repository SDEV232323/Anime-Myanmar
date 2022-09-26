import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import GoogleIcon from '@mui/icons-material/Google';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import {GoogleLogin} from "react-google-login"
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react'
import "./style.css"
import { Box } from '@mui/system';
import { AnimeContext } from '../../Context';
import axios from 'axios';
import { gapi } from "gapi-script";


function SignUp({setSwip, setUserId, setEmailFromS, login, setLogin, setForgotPassword, setConditionOfValidPage}) {

  const {sign, setSign, url} = React.useContext(AnimeContext)
  const [emailError, setEmailError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")
  const [loginError, setLoginError] = React.useState(false)
  const [lockCount, setLockCount] = React.useState(6)
  const [lockErrorMsg, setLockErrorMsg] = React.useState("Incorrect account or password")
  // const [lockEmail, setLockEmail] = React.useState(JSON.parse(localStorage.getItem("bobo")) || [])
  // const [emailC, setEmailC] = React.useState([])

  const [signValue, setSignValue] = React.useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    date: null,
    vip: "",
    history: [],
    watchLater: [],
    verify: false,
    type: "anime myanmar"
  })

  const [checkError, setCheckError] = React.useState({
    name: false,
    email: false,
    password: false,
    gender: false,
    date: false
  })

    const handleInput = (e) => {
      setSignValue(pres => ({...pres, [e.target.name]: e.target.value}))
    }

    const handleSignUp = async (e) => {
      e.preventDefault()
      try { 
         if(signValue.name.trim().length < 1) {
         return setCheckError(pres => ({...pres, name: true}))
         } else {
          setCheckError(pres => ({...pres, name: false}))
         }
         if(signValue.email.length < 1) {
          setEmailError("Enter valid email")
         return setCheckError(pres => ({...pres, email: true}))
         } else {
          setCheckError(pres => ({...pres, email: false}))
         }
         if(signValue.password.length < 8) {
          setPasswordError("Enter password at least 8 characters")
         return setCheckError(pres => ({...pres, password: true}))
         } else {
          setCheckError(pres => ({...pres, password: false}))
         }
         if(signValue.gender.length < 1) {
         return setCheckError(pres => ({...pres, gender: true}))
         } else {
          setCheckError(pres => ({...pres, gender: false}))
         }
         if(signValue.date === null) {
          setSignValue(pres => ({...pres, date: ""}))
         return setCheckError(pres => ({...pres, date: true}))
         } else {
          setCheckError(pres => ({...pres, date: false}))
         }
          
         const {data} = await axios.post(`${url}v1/signUp`, signValue)
         setEmailFromS(data.email)
         setUserId(data._id)
         setSignValue(pres => ({...pres, name: "", email: "", password: "", gender: "", date: null}))
         setSwip(true)
      } catch (error) {
        if(error.response.data.name === "ValidationError") {
           setEmailError("Please provide valid email")
           setCheckError(pres => ({...pres, email: true}))

        }
        if(error.response.data.code === 11000) {
          setEmailError("This email address is already being used")
          setCheckError(pres => ({...pres, email: true}))
        }
        console.log(error)
      }
    }
   
    const handleLogin = async () => {
      try {
        if(signValue.email.length < 1) {
          setEmailError("Enter email")
         return setCheckError(pres => ({...pres, email: true}))        
        } else {
          setCheckError(pres => ({...pres, email: false}))
        }      
        if(signValue.password.length < 1) {
          setPasswordError("Enter password")
          return setCheckError(pres => ({...pres, password: true}))
          } else {
            setCheckError(pres => ({...pres, password: false}))
          }
          
          // setEmailC(pres => ([...pres, signValue.email]))
          const {data} = await axios.post(`${url}v1/login`, {email: signValue.email, password: signValue.password})
          if(data.verify === true) {
            localStorage.setItem("AmAc", JSON.stringify(data))
            setSign(false)
            window.location.reload()
          } 

      } catch (error) {
        setLoginError(true)
        if(error.response.status === 429) {
          setLockErrorMsg(error.response.data)
        } else if (error.response.status === 400) {
          setLockErrorMsg(error.response.data.msg)
        }
      }
    }
    setConditionOfValidPage(false)

    // const googleSuccess = async (res) => {
    //   console.log(res)
    // }

    // // const googleFailure = (error) => {
    // //   console.log(error)
    // //   console.log("Google login fail")
    // // }

   React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


    return (
        <>
          <div className='signTitle'>
            <Typography style={{fontWeight: "bold", fontSize: "20px"}}>{login ? "Log in" : "Sign up"}</Typography>
            <CloseIcon id='closeIcon' onClick={() => setSign(false)}/>
          </div>
          {/* <div className='signGoogle'>
            {login ?
              <Button id='signGoogle' fullWidth><GoogleIcon style={{fontSize: "17px", color: "gray"}}/> &nbsp; Log in with Google</Button> :
              <GoogleLogin
              clientId='504114416018-3qkhk9c6afmtbkinnv3b6i62ordf6009.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button id='signGoogle' onClick={renderProps.onClick} disabled={renderProps.disabled} fullWidth><GoogleIcon style={{fontSize: "17px", color: "gray"}}/> &nbsp; Sign up with Google</Button> 
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={'single_host_origin'}
              /> 
            }
          </div> */}
          <div className='signForm'>
            {login && loginError 
            && 
            <div className='errorLogin'>
              <ErrorOutlineIcon style={{fontSize: "20px"}}/>
              <Typography style={{fontSize: "13px", marginLeft: "7px"}}>{lockErrorMsg}</Typography>
            </div>}
            {!login && <div style={{marginTop: "20px"}}>
              <TextField error={checkError.name}
              helperText={checkError.name && "Enter Name"} id="outlined-textarea" name='name' value={signValue.name} onChange={handleInput} size='small'  label="Name" placeholder='Enter Name' multiline fullWidth className='name'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <PermIdentityIcon />
                  </InputAdornment>
                )
              }}
              variant="outlined"
              />
            </div>}
            <div style={{marginTop: "20px"}}>
              <TextField id="outlined-textarea" 
              error={checkError.email} helperText={checkError.email && emailError} 
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <MailIcon />
                  </InputAdornment>
                )
              }}
              name='email' value={signValue.email} onChange={handleInput} size='small' label="Email" placeholder='example@gmail.com' multiline fullWidth className='name2'/>
            </div>
            <div style={{marginTop: "20px"}}>
              <TextField id="outlined-textarea" type='password' error={checkError.password}  
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <LockIcon />
                    </InputAdornment>
                  )
                }}
              helperText={checkError.password  && passwordError} 
              name='password' value={signValue.password} size='small' onChange={handleInput}  label="Password" placeholder='at least 8 characters' multiline fullWidth className='name2'/>
            </div>
            {!login && 
            <div style={{marginTop: "20px", display: "flex", justifyContent: "space-between"}}>
              <div>
              <Box style={{width: "100px"}}>
                <FormControl fullWidth size='small'>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={signValue.gender}
                    error={checkError.gender}
                    onChange={(e) => setSignValue(pres => ({...pres, gender: e.target.value}))}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"No wish to answer"}>No wish to answer</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              </div>
              <div style={{position: "relative"}}>
              <div>
              <LocalizationProvider  dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of birth"
                  value={signValue.date}
                  onChange={(newValue) => {
                    setSignValue(pres => ({...pres, date: newValue}));
                  }}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
              </div>
              </div>
            </div>}
            {!login &&
            <div className='privacyA'>
              <Typography>I agree with <span className='blueS'>Terms</span> and <span className='blueS'>Privacy</span></Typography>
            </div>}
            {login && 
              <div className='privacyB'>
                <FormGroup>
                  <FormControlLabel control={<Checkbox style={{color: "#009eff"}} defaultChecked />} label="Remember me" />
                </FormGroup>
              </div>
            }
            <div className='signManual'>
              {login ? 
              <Button id='signManual' fullWidth onClick={handleLogin}>Log in</Button> :
              <Button id='signManual' fullWidth onClick={handleSignUp}>Sign up</Button>
              }
            {login && 
            <div className='privacyA'>
              <Typography onClick={() => setForgotPassword(true)}><span className='blueS'>Forgot Password?</span></Typography>
            </div>}
            </div>
            <div style={{textAlign: "center", marginTop: "20px"}}>
              {login ? <Typography>Don't have an account?</Typography> :<Typography>Already have an account?</Typography>}
              {login ? <Typography onClick={() =>(setLogin(false), setSignValue(pres => ({...pres, name: "", email: "", password: "", gender: "", date: null})), setCheckError(pres => ({...pres, email: false, password: false})))}>
                <span className='blueS'>Sign up</span></Typography> : 
              <Typography onClick={() => (setLogin(true), setSignValue(pres => ({...pres, name: "", email: "", password: "", gender: "", date: null})), setCheckError(pres => ({...pres, email: false, password: false})))}>
                <span className='blueS'>Log in</span></Typography>}
            </div>
          </div>
        </>
    )
}

export default SignUp
