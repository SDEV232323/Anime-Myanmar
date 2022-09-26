import { Grid, Typography } from '@mui/material'
import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import "./style.css"
import { AnimeContext } from '../../Context';

function Description({ep, epCount, load, dada}) {

    const [more, setMore] = React.useState(false)
    
    const getEpString = ep.epname.split(" ")
    const count = getEpString[getEpString.length - 1]
    
    return (
      <Grid item sm={12} md={12} lg={12} xl={12} order={{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3}}>
        {load &&
        <div className='desCon'>
          <div className='flex'>
          <Typography variant='h5' id="desTit" style={{fontWeight: "bold", margin: "20px 0px 0px 5px"}}>
                {ep.Mtitle}
            </Typography>
            {epCount > 1 &&
            <div className='flex' style={{minWidth: "160px"}}>
            <ChevronRightIcon id='rightA'/>
            <Typography id='tellEp'>Episode {count}</Typography>
            </div>}
          </div>
          <div>
          <div className='child'>
              <Typography id="tit" gutterBottom>{ep.title}</Typography>
              <div className='flex'                               >
              <div className='flex marginT marginL'>
                  <StarIcon id="star2"/>
                  <Typography id="fontForD" style={{color: "gold"}}>{dada.rating}</Typography>
              </div>
              <div className='flex marginT margin1 marginL'>
                <Typography id="fontForD">{dada.date}</Typography>
              </div>
              <div className='flex marginT margin1 marginL'>
                <Typography id="fontForD">{epCount} Episodes</Typography>
              </div>
              </div>
              <div className='marginT marginL'                                >
                  <Typography id="fontForD" style={{textAlign: "start"}}>{dada.type}</Typography>
              </div>
              <div className='flex marginT marginL'>
                <div className='flex  '>
                 <Typography id="fontForD" style={{color: "#82859c"}}>Region: &nbsp;</Typography>
                 <Typography id="fontForD">Japan</Typography>
                </div>
                <div className='flex  margin1'>
                 <Typography id="fontForD" style={{color: "#82859c"}}>Dub: &nbsp;</Typography>
                 <Typography id="fontForD">Japanese</Typography>
                </div>
                <div className='flex  margin1'>
                 <Typography id="fontForD" style={{color: "#82859c"}}>Sub: &nbsp;</Typography>
                 <Typography id="fontForD">Myanmar</Typography>
                </div>
              </div>
              <div className='marginT borT marginL'>
                <div className='flex'>
                {!more ? <Typography id="fontForD" style={{textAlign: "start"}}><span style={{color: "#82859c"}}>Description: </span>&nbsp; {dada?.description?.split(" ").slice(0, 40).join(" ")}...</Typography>
               :  <Typography id="fontForD" style={{textAlign: "start"}}><span style={{color: "#82859c"}}>Description: </span>&nbsp; {dada?.description}</Typography>}
                </div>
              {!more ? 
              <div className='flex' id="more1" onClick={() => setMore(true)}>
                <Typography id="more2">More</Typography>
                <ExpandMoreIcon id="more2" style={{fontSize: "25px"}}/>
              </div> :
              <div className='flex' id="more1" onClick={() => setMore(false)}>
                <Typography id="more2">Less</Typography>
                <ExpandLessIcon id="more2" style={{fontSize: "25px"}}/>
              </div>}
              </div>
              <div style={{border: "1px solid black"}}></div>
          </div>
        </div>
        </div>}
      </Grid>
    )
}

export default Description
