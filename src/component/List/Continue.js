import React from 'react'
import { AnimeContext } from '../../Context'
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import "./styleList.css"
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Continue({data}) {
   
    const {anime, Mload, userInfo, setSign, setOpenNav} = React.useContext(AnimeContext)
    const [findSpAm, setFindSpAm] = React.useState([])
    const navigate = useNavigate()
    const [loadG, setLoadG] = React.useState(false)


    React.useEffect(() => {
      if(data) {
        setLoadG(false) 
        setFindSpAm(anime.filter(info => info.title === data.name))
        setLoadG(true)
      }
    }, [])

    const handleLogin = () => {
       setSign(true)
       setOpenNav(false)
    }

   
    return (
        <>
         {<div>
         {!data?.login ?
         <div>
         {Mload && loadG
          && 
          <motion.div
           whileHover={{scale: 1.05, color: "#0486D2"}}
           id="conMain"
           onClick={() => navigate(`/v1/play/${data.name}/${data.ep}`)}
          >
            <Paper elevation={3} id="conImg">
              <div className='conImgCon'>
                <div id='con_h'>
                  <img src={findSpAm[0]?.coverpicture} style={{width: "100%", height: "100%"}} />
                </div>
                <div className='watchTo'>
                    <div className='flexCon'> 
                      <div style={{display: "flex", alignItems: "center"}}>
                        <Typography className='notranslate' id="font2">{`Watch to ${data?.ep}`}</Typography>
                      </div>
                      <div style={{position: "relative"}}>
                        <PlayCircleIcon id="playbut3"/>
                        <div className='white'></div>
                      </div>
                    </div>
                    <div className='currentDuration' style={{width: `${Math.floor((data?.playSecond * 100) / data?.totalSecond)}%`}}></div>
                </div>
              </div>
            </Paper>
            <Typography className='notranslate' style={{marginTop: "5px", marginLeft: "10px", fontWeight: "bold"}} id="font">{data?.name}</Typography>
          </motion.div>
         }
         </div> : 
         <motion.div
         whileHover={{scale: 1.05, color: "#0486D2"}}
         style={{cursor:"pointer"}}
         >
          <Paper elevation={3} id="conImg">
           <div className='conImgCon'>
             <div id='con_h'>
                  <img src='./anime_collage.jpg' style={{width: "100%", height: "100%"}} />
              </div>
              <div className='whiteC'>
                <div className='white_child'>
                  <div>
                  <Typography id="login_ads">{data?.login}</Typography>
                  <div style={{textAlign: "center"}} onClick={handleLogin}><Button id="loginCardBut">Login</Button></div>
                  </div>
                </div>
              </div>
           </div>
          </Paper>
         </motion.div>
         }
         </div>
         }
        </>
    )
}

export default Continue
