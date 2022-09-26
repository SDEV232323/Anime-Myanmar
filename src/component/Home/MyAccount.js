import React from 'react'
import { Button, InputAdornment, TextField, Typography, Avatar } from '@mui/material';
import "./style.css"
import { AnimeContext } from '../../Context';
import {motion} from "framer-motion"

function MyAccount() {
    
    const {userInfo, Pload, setDeleteAcc, setOpenEdit, openEdit} = React.useContext(AnimeContext)

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.slice(0, 1)}`,
        };
      }

      function handleEdit() {
        setOpenEdit(true)
      }

      const dates = (fullDate) => {
        const removeT = fullDate.slice(0, 10)
        return removeT.split("-").reverse().join("-")
      }

      React.useState(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
       <div style={{background: "black", padding: "0px 10px", height: "100%", minHeight: "100vh"}}>
        {Pload && 
        <div className='myAccConc'>
            <div className='myAccTit notranslate'>
                <Typography id="titmyacc">My Account</Typography>
            </div>
            <Typography>Profile</Typography>
            <div className='accProfileConc'>
             <div style={{display: "flex", alignItems: "center"}}>
                <div className='avatar3 notranslate'><Avatar   {...stringAvatar(`${userInfo.name}`)} /></div>
                <div id="mam2">
                    <Typography className='notranslate' id="fontForMbsT" style={{fontWeight: "600", marginBottom: "10px"}}>{userInfo.name}</Typography>
                    <div className='flex flexAbout'>
                        <div className='flex luffy'>
                            <Typography id="fontForMbs" style={{color: "rgb(133 133 133)"}}>Gender:</Typography>
                            <Typography id="fontForMbs">&nbsp;{userInfo.gender}</Typography>
                        </div>
                        <div className='divideWhite'></div>
                        <div className='flex luffy1'>
                            <Typography id="fontForMbs" style={{color: "rgb(133 133 133)"}}>Date of Birth:</Typography>
                            <Typography id="fontForMbs">&nbsp;{dates(userInfo.date)}</Typography>
                        </div>
                    </div>
                </div>
             </div>
             <div className='editUser' onClick={handleEdit}><Typography>Edit</Typography></div>
            </div>
            <Typography>VIP</Typography>
            <div className='vipCn'>
                <div>
                    <Typography id="becVIP" style={{fontWeight: "600"}}>Become VIP</Typography>
                    <Typography id="persuadeUser">You're not a member Yet. Join VIP for more features and skip ads.</Typography>
                </div>
                <div><Button id="jnV">Join VIP</Button></div>
            </div>
            <Typography>Account and Security</Typography>
            <div className='accAndsec'>
             <div className='flex firstRow'>
              <Typography id="fontForMbs" style={{color: "rgb(133 133 133)"}}>Email</Typography>
              <Typography id="fontForMbs">&nbsp;&nbsp;&nbsp;&nbsp;{userInfo.email}</Typography>
             </div>
             <div className='flex firstRow'>
              <Typography id="fontForMbs" style={{color: "rgb(133 133 133)"}}>Mobile number</Typography>
              <Typography id="fontForMbs">&nbsp;&nbsp;&nbsp;&nbsp;{"Not set"}</Typography>
             </div>
             <div className='flex firstRow'>
              <Typography id="fontForMbs" style={{color: "rgb(133 133 133)"}}>Password</Typography>
              <Typography id="fontForMbs">&nbsp;&nbsp;&nbsp;&nbsp;{"*********"}</Typography>
             </div>
             <div className='flex firstRow firstRowDelete'>
               <div className='flexDelete'>
                <Typography id="fontForMbs" style={{color: "rgb(133 133 133)"}}>Delete account</Typography>
                <Typography id="mam">{"Delete current account"}</Typography>
               </div>
               <motion.div style={{cursor: "pointer"}} whileHover={{color: "#009eff"}} onClick={() => setDeleteAcc(true)}><Typography id="fontForMbs">Delete</Typography></motion.div>
             </div>
            </div>
            <div style={{width: "10px", height: "10px"}}></div>
        </div>}
       </div>
    )
}

export default MyAccount
