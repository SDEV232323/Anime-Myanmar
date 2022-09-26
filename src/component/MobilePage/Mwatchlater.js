import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimeContext } from '../../Context'
import { Grid, Typography } from '@mui/material'

function Mwatchlater({data}) {

    const {anime} = React.useContext(AnimeContext)
    const navigate = useNavigate()


    const filterAm = anime.filter(info => info.title === data)

    return (
        <>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} onClick={() => navigate(`/v1/album/${filterAm[0]._id}`)}>
          <div className='mbImgCon'>
              <img src={filterAm[0].coverpicture} style={{width: "100%", height: "100%"}}/>
          </div>
          <Typography style={{margin: "5px 0px 0px 5px"}} id="fontForMbs">{data}</Typography>
        </Grid>
        </>
    )
}

export default Mwatchlater
