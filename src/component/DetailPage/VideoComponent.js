import React from 'react'
import { Button, Typography, MenuItem, FormControl, InputLabel, Grid } from '@mui/material'
import VideoThumbnail from 'react-video-thumbnail';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./style.css"


function VideoComponent({vid, num}) {

    const [change, setChange] = React.useState(false)

    const navigate = useNavigate()

    const handleChange = () => {
      navigate(`/v1/play/${vid.Mtitle}/${vid.epname}`)
    }

    React.useEffect(() => {
      document.getElementsByClassName("snapshot-generator")[num + 1].style.display = "none"
      
    }, [])
    return (
         <motion.div
         whileHover={{scale: 1.10, color: "#009eff"}}
         onMouseEnter={() => setChange(true)}
         onMouseLeave={() => setChange(false)}
         >
         <motion.div className='videoContainer' onClick={handleChange}>
           <VideoThumbnail
           videoUrl={(`${vid.videourl}`)}    
           cors={true}
           style={{width: "100%", height: "100%"}}
           snapshotAtTime={230}
           />
         </motion.div>
          <Typography variant='body2' id='epname' style={{color: change ? "#009eff" : "white"}}>{vid.epname}</Typography>
         </motion.div>
    )
}

export default VideoComponent
