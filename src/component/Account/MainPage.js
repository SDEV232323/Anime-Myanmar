import { Paper } from '@mui/material'
import React from 'react'
import CreatePassword from './CreatePassword'
import RecoverPassword from './RecoverPassword'
import SignUp from './SignUp'
import Validation from './Validation'

function MainPage() {
     const [validate, setValidate] = React.useState(false)
     const [swip, setSwip] = React.useState(false)
     const [login, setLogin] = React.useState(false)

     const [userId, setUserId] = React.useState("")
     const [emailFromS, setEmailFromS] = React.useState("")
     const [otp, setOtp] = React.useState("")
     const [forgotPassword, setForgotPassword] = React.useState(false)
     const [conditionOfValidPage, setConditionOfValidPage] = React.useState(false)
     const [recreatePassword, setRecreatePassword] = React.useState(false)


    return (
        <div className='signMain'>
          <div className='signConc'>
            <Paper elevation={3} id="signPaper">
               {!forgotPassword && 
               <div>
                {!swip ?
                    <SignUp setSwip={setSwip} setEmailFromS={setEmailFromS} setUserId={setUserId} login={login} setLogin={setLogin}
                    setForgotPassword={setForgotPassword} setConditionOfValidPage={setConditionOfValidPage}
                    /> :
                    <Validation setSwip={setSwip} otp={otp} setOtp={setOtp} emailFromS={emailFromS} userId={userId} 
                    conditionOfValidPage={conditionOfValidPage} setRecreatePassword={setRecreatePassword} setForgotPassword={setForgotPassword}/>   
                  }
               </div>}
                {forgotPassword && 
                 <div>
                    {!recreatePassword ? <RecoverPassword setSwip={setSwip} setForgotPassword={setForgotPassword} 
                    setLogin={setLogin} setEmailFromS={setEmailFromS} setUserId={setUserId} 
                    setConditionOfValidPage={setConditionOfValidPage} setOtp={setOtp} /> : 
                    <CreatePassword setForgotPassword={setForgotPassword} setRecreatePassword={setRecreatePassword} emailFromS={emailFromS} setEmailFromS={setEmailFromS}/>
                    }
                 </div> 
                }
            </Paper>
          </div>
        </div>
    ) 
}

export default MainPage
