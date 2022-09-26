import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import OtpInput from 'react-otp-input';
import "./style.css"
import { Button, Typography } from '@mui/material';
import { AnimeContext } from '../../Context';
import axios from 'axios';

function Validation({setSwip, otp, setOtp, emailFromS, userId, conditionOfValidPage, setRecreatePassword, setForgotPassword}) {
    const {setSign, url, setChangeProfile} = React.useContext(AnimeContext)

    const [num, setNum] = React.useState(60)
    const [errorMsg, setErrorMsg] = React.useState("")
    const [changes, setChanges] = React.useState(false)

    React.useEffect(() => {
       if(num !== 0) {
        let insideNum = 60
        const id =  setInterval(() => { 
            insideNum -= 1         
            setNum(pres => pres - 1)
            if(insideNum === 0) {
                clearInterval(id)
                console.log("clear")
            }
         }, 1000)
     
        return () => {
            clearInterval(id)
        }
       }
    }, [changes])

    let name = emailFromS.substring(0, emailFromS.lastIndexOf("@"))
    let domain = emailFromS.substring(emailFromS.lastIndexOf("@") + 1)

    const handleVerify = async () => {
        try {
            if(!conditionOfValidPage) {
                const {data} = await axios.post(`${url}v1/signUp/verify`, {userId, otp})
                console.log(data)
                if(data.verify === true) {
                    setSign(false) //close the tab
                    localStorage.setItem("AmAc", JSON.stringify(data))
                    setChangeProfile(pres => !pres)
                    window.location.reload()
                }
            } else {
                const {data} = await axios.post(`${url}v1/recoverPassword/verify`, {userId, otp})
                  console.log(data)
                if(data.msg === "success otp code") {
                    setRecreatePassword(true)
                    setForgotPassword(true)
                }
            }
        } catch (error) {
            setErrorMsg(error.response.data.msg)
            console.log(error)
        }
    }

    const handleResendVerification = async () => {
        try {
            const {data} = await axios.post(`${url}v1/signUp/resendVerify`, {userId, emailFromS})
            console.log(data)
            setNum(60)
            setChanges(pres => !pres)
            setOtp("")
            setErrorMsg("")
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        setOtp("")
    }, [])


    return (
        <div>
            <div className='signTitle'>
              <div><ArrowBackIosIcon onClick={() => setSwip(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
              <div><CloseIcon onClick={() => setSign(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
            </div>
            <div style={{textAlign: "center", padding: "0px 30px"}}>
                <Typography id="emV">Email verification</Typography>
                <Typography id="subV">Verification code sent to</Typography>
                <Typography id="subV2">{`${name.slice(0,2)}***@${domain}`}</Typography>
                {errorMsg && <Typography style={{marginTop: "10px", color: "red"}}>{errorMsg}</Typography>}
                <div className='otpConc'>
                <OtpInput
                    value={otp}
                    onChange={(otps) => setOtp(otps)}
                    numInputs={6}
                    separator={<span>&nbsp;</span>}
                />
                </div>
                <div><Button disabled={otp === "" ? true : false} id="verifyB" onClick={handleVerify}>Verify</Button></div>
                {num > 0 ? <Typography style={{marginTop: "30px"}}>Wait <span className='blueS'>{`${num}s`}</span> before requesting another verification code.</Typography> :
                <Typography style={{marginTop: "30px"}} onClick={handleResendVerification}><span className='blueS'>Re-send verification code</span></Typography>}
                <Typography id="junk">If you have not received the verification code, try checking your junk folder.</Typography>
            </div>
        </div>
    )
}

export default Validation
