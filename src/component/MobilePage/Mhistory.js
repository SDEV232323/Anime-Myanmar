import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimeContext } from '../../Context'

function Mhistory({data}) {

    const {anime} = React.useContext(AnimeContext)
    const navigate = useNavigate()

    const filterAm = anime.filter(info => info.title === data.name)
    console.log(filterAm)
    return (
      <>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3} onClick={() => navigate(`/v1/play/${data.name}/${data.ep}`)}>
        <div className='mbImgCon'>
            <img src={filterAm[0].coverpicture} style={{width: "100%", height: "100%"}}/>
            <div style={{width: `${(data.playSecond * 100) / data.totalSecond }%`}} className='currentMb'></div>
        </div>
        <Typography style={{margin: "5px 0px 0px 5px"}} id="fontForMbs">{data.ep}</Typography>
      </Grid>
      </>
    )
}

export default Mhistory
