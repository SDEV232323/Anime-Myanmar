import { Button, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimeContext } from '../../Context'
import Mhistory from './Mhistory'
import "./style.css"

function History() {
    
    const [his, setHis] = React.useState(JSON.parse(localStorage.getItem("AmTime")) || [])
    const {Mload} = React.useContext(AnimeContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        window.scrollTo(0,0)
     }, [])

    return (
     <div  style={{padding: "10px", background: "black", minHeight: "93vh", overflow: "scroll"}}>
       <div className='flexHistory'>
        <Typography style={{fontSize: "21px", fontWeight: "600"}}>History List</Typography>
       </div>
       <div className='hisConc'>
         {his.length > 0 && Mload ? 
            <Grid container spacing={2} style={{paddingBottom: "13px"}}>
                {his.map((data, index) => 
                 <Mhistory key={index} data={data} />    
                )}
            </Grid> :
            <div className='emptyConc'>
            <div className='empty'>
            <div className='boxCon'>
                <img src='../box.png' style={{width: "100%", height: "100%"}}/>
            </div>
            </div>
            <Typography gutterBottom style={{fontSize: "19px", textAlign: "center"}}>No History List</Typography>
            <Typography gutterBottom style={{fontSize: "16px", textAlign: "center"}}>Add more anime to your history list</Typography>
            <div className='empty'>
                <Button id="emptyAdd" onClick={() => navigate(`/`)}>Add more</Button>
            </div>
            </div> 
        }
       </div>
     </div>
    )
}

export default History
