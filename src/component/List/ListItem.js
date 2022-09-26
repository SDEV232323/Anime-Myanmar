import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from "react-router-dom"
import {motion} from "framer-motion"
import "./styleList.css"
import { AnimeContext } from '../../Context';

const variant = {
    initial: {
        scale: 1,
        x: -1
    },
    animate: {
        scale: 1.1,
        x: 0,
        transition: {
            duration: 0.5,
        }
    }
}

function ListItem({datas}) {
    const {anime, Mload} = React.useContext(AnimeContext)
    const [check, setCheck] = React.useState(false)
    const [data, setData] = React.useState([])
    const [Fload, setFload] = React.useState(false)
    const navigate = useNavigate()

    React.useEffect(() => {
        if(Mload) {
            const filterAnime = anime.filter(info => info.title === datas)
            setData(filterAnime[0])
            setFload(true)
        }
    }, [])

    
    return (
     <>
        {Fload &&
        <div >
           {!check ? 
           <div style={{margin: "0px 5px"}}>
           <Paper elevation={2} id="paper"  
            onMouseEnter={() => setTimeout(() => setCheck(true), 100)}
            onMouseLeave={() => setTimeout(() => setCheck(false), 100)}
            onClick={() => navigate(`/v1/album/${data._id}`)}
            >
                <div className='imgContainer'>
                <img src={data.frontPicture} className="img"/>
                </div>
            </Paper> 
            <Typography className='notranslate' variant='body2' id="pc_title" style={{marginTop: "10px", marginLeft: "5px"}} gutterBottom>{data.title}</Typography>
            <Typography className='notranslate' variant='body2' id="mobile_title" style={{marginTop: "10px", marginLeft: "5px"}} gutterBottom>{`${data.title.split("").slice(0, 14).join("")}${data.title.split("").length > 25 ? "..." : ""}`}</Typography>
            </div> 
            :
            <motion.div     
            variants={variant}    
            initial={check && "initial"}
            animate={check ? "animate" : "initial"}
            >
            <Paper elevation={3} id="paper2" 
            onMouseEnter={() => setCheck(true)}
            onMouseLeave={() => setCheck(false)}
            onClick={() => navigate(`/v1/album/${data._id}`)}
            >
                <div className='imgContainer2'>
                 <img src={data.coverpicture} className="img2"/>
                 <div className='flex position'>
                 <div>
                    <PlayCircleIcon id="playbut2"  />
                </div>
                <div>
                    <div className='sharebut2'><div className='share'><ShareIcon style={{fontSize: "22px", "color": "black"}}/></div></div>
                </div>
                 </div>
                </div>
                <div className='textMain'>
                <Typography className='notranslate' variant='body2' style={{fontSize: "16px"}} gutterBottom>{data.title}</Typography>
                <div className='flex' style={{marginBottom: "7px"}}>           
                <div className='flex'>
                    <StarIcon id="star" style={{fontSize: "15px"}}/>
                    <Typography style={{fontSize: "12px", color: "gold"}}>{data.rating}</Typography>
                </div>
                <div className='flex margin1'>
                    <Typography style={{fontSize: "12px"}}>{data.date}</Typography>
                </div>
                <div className='flex margin1'>
                    <Typography style={{fontSize: "12px"}}>{data.episodes[0]} Episodes</Typography>
                </div>
                </div>
                <Typography variant='body2' style={{fontSize: "12px", marginBottom: "10px"}}>{data.type}</Typography>
                <Typography variant='body2' style={{fontSize: "12px"}} gutterBottom>{data.description.split(" ").slice(0, 23).join(" ")} ...</Typography>
                <div className='moreInfoL'><Typography style={{color: "#0486D2"}} variant='body2' gutterBottom>{"more info >"}</Typography></div>
                </div>
            </Paper>
            </motion.div>
         } 
        </div>}
      </>
    )
}

export default ListItem
