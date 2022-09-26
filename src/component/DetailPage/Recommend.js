import { Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AnimeContext } from '../../Context';
import axios from 'axios'

function Recommend({info, setOpenAlert, setOpenAlert2}) {
    
    const [hover, setHover] = React.useState(false)
    const [playHover, setPlayHover] = React.useState(false)
    const [saveHover, setSaveHover] = React.useState(false)
    const {userInfo, setSign, url, setUserInfo, } = React.useContext(AnimeContext)
    const [acc, setAcc] = React.useState(JSON.parse(localStorage.getItem("AmAc")) || [])
    const navigate = useNavigate()

    const handleGoRecommend = (e) => {
      e.stopPropagation()
      navigate(`/v1/album/${info._id}`)
      window.location.reload()
    }

    const handleBlack = (e) => {
      e.stopPropagation()
      console.log("black")
    }

    const handelOnMouseEnter = () => {
      if(window.innerWidth > 764) {
        setHover(true)
      }
    
    }

    const handleOnMouseLeave = () => {
      if(window.innerWidth > 764) {
        setHover(false)
      }
    }

    const handleAddWatchLaterButton = async (e) => {
      e.stopPropagation()
      if(!userInfo) {
        setSign(true)
      } else {
        try {
          const dada = await axios.patch(`${url}v1/addWatchLater/${userInfo.id}`, {animeTitle: info.title})
          setUserInfo(dada.data)
          setOpenAlert(true)  
        } catch (error) {
          console.log(error)
        }  
      }
    }

  const handleRemoveWatchLaterButton = async (e) => {
    e.stopPropagation()
    if(!userInfo) {
      setSign(true)
    } else {
      try {
        const dada = await axios.patch(`${url}v1/addWatchLater/${userInfo.id}`, {animeTitle: info.title})
        setUserInfo(dada.data)
        setOpenAlert2(true)  
      } catch (error) {
        console.log(error)
      }  
    }
  }

 
    return (
      <motion.div className='recommendMain'
       onMouseEnter={handelOnMouseEnter}
       onMouseLeave={handleOnMouseLeave}
       animate={{scale: hover ? 1.06 : 1}}
      >
        <div className='remCon' onClick={handleGoRecommend}>
          <div className='recommendImg'>
            <img src={info.frontPicture} style={{width: "100%", height: "100%"}} />
            <div className={hover ? "absoRem" : ""} onClick={handleBlack}>
            <div style={{display: hover? "block" : "none"}}>
                <PlayCircleIcon 
                    onMouseEnter={() => setPlayHover(true)}
                    onMouseLeave={() => setPlayHover(false)}
                id="playbutRem" style={{color: playHover ? "#2f9ddd" : "#0486D2"}}/>
            </div>
            <div style={{display: hover? "block" : "none"}}>
                <div className='sharebutRem' 
                style={{background: saveHover ? "white" : "#d7d7d7"}}
                onMouseEnter={() => setSaveHover(true)}
                onMouseLeave={() => setSaveHover(false)}
                >
                {userInfo ?
                <>
                {userInfo.watchLater.includes(info.title) ? 
                <BookmarkAddedIcon onClick={handleRemoveWatchLaterButton} style={{width: "100%"}}/>
                : <BookmarkAddIcon onClick={handleAddWatchLaterButton} style={{width: "100%"}}/>}
                </> : 
                <>
                 <BookmarkAddIcon onClick={handleAddWatchLaterButton} style={{width: "100%"}}/>
                </>
                }
                </div>
            </div>
            </div>
            {userInfo ?
            <>
            <Typography id="watRem" style={{display: saveHover? "block" : "none"}}>{userInfo.watchLater.includes(info.title) ? "Remove from Watch Later" : "Add to Watch Later"}</Typography>
            </> : 
            <Typography id="watRem" style={{display: saveHover? "block" : "none"}}>Add to Watch Later</Typography>
            }
          </div>
          <Typography className='notranslate' id="remTit" style={{color: hover ? "#009eff" : "white"}}>{info.title}</Typography>
          <Typography className='notranslate' variant='body2' id="mobile_title2" style={{marginTop: "10px", marginLeft: "5px", color: hover ? "#009eff" : "white"}} gutterBottom>{`${info.title.split("").slice(0, 12).join("")}${info.title.split("").length > 12 ? "..." : ""}`}</Typography>
        </div>
      </motion.div>
    )
}

export default Recommend
