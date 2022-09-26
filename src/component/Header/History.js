import React from 'react'
import {Button, TextField, Typography} from "@mui/material"
import {motion} from "framer-motion"
import "./style.css"
import { AnimeContext } from '../../Context'
import { useNavigate } from 'react-router-dom'

function History({data}) {

    const {anime} = React.useContext(AnimeContext)
    const navigate = useNavigate()

    const filterAm = anime.filter(info => info.title === data.name)

    return (
    <>
     {filterAm.length > 0 &&
      <motion.div className='flex' style={{margin: "10px 0px", padding: "10px 20px", cursor: "pointer", background: "none"}}
      whileHover={{background: "rgba(80, 80, 80, 0.1)", color: "#009eff"}}
      onClick={() => navigate(`/v1/play/${data.name}/${data.ep}`)}
      >
        <div className='hisImgCon'><img src={filterAm[0].coverpicture} style={{width: "100%", height: "100%"}} /></div>
        <div className='hisFlex'>
          <Typography id="hisTitle">{data.ep}</Typography>
          <div className='hisProgressBar'>
            <div className='realProgressBar' style={{width: `${(data.playSecond * 100) / data.totalSecond}%`}}></div>
          </div>
        </div>
      </motion.div>}
    </>
    )
}

export default History
