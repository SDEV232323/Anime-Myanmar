import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimeContext } from '../../Context'
import Mwatchlater from './Mwatchlater'

function WatchLater() {
     const navigate = useNavigate()

     const {Pload, userInfo} = React.useContext(AnimeContext)
    
     React.useEffect(() => {
        window.scrollTo(0,0)
     }, [])
     
    return (
        <div style={{padding: "10px", background: "black", minHeight: "93vh", overflow: "scroll"}}>
            <div className='flexHistory'>
                <Typography style={{fontSize: "21px", fontWeight: "600"}}>Watch Later List</Typography>
            </div>  
            <div className='hisConc'>
                {Pload && userInfo.watchLater.length > 0 
                ? 
                <Grid container spacing={2} style={{paddingBottom: "13px"}}>
                    {userInfo.watchLater.map((data, index) => 
                    <Mwatchlater key={index} data={data} />    
                    )}
                </Grid> :
                <div className='emptyConc'>
                <div className='empty'>
                <div className='boxCon'>
                    <img src='../box.png' style={{width: "100%", height: "100%"}}/>
                </div>
                </div>
                <Typography gutterBottom style={{fontSize: "19px", textAlign: "center"}}>No Watch Later List</Typography>
                <Typography gutterBottom style={{fontSize: "16px", textAlign: "center"}}>Add more anime to your watch later list</Typography>
                <div className='empty'>
                    <Button id="emptyAdd" onClick={() => navigate(`/`)}>Add more</Button>
                </div>
                </div>} 
            </div>          
        </div>
    )
}

export default WatchLater
