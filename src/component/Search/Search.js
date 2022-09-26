import axios from 'axios'
import React from 'react'
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import { AnimeContext } from '../../Context'
import {CircularProgress, Grid, Typography, Paper, Stack} from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import { Container } from '@mui/system'
import { styled } from '@mui/material/styles';
import './style.css'

function Search() {

    const [searchParam] = useSearchParams()
    const {checkS, url} = React.useContext(AnimeContext)

    const [foundAm, setFoundAm] = React.useState([])
    const [load, setLoad] = React.useState(false)

    const queryData = searchParam.get('query')
    const navigate = useNavigate()
    
    React.useEffect(() => {
      window.scrollTo(0,0)
      const fetchSearch = async () => {
        try {
            setLoad(false)
            const {data} = await axios.get(`${url}v1/search?query=${queryData}`)
            setFoundAm(data)
            setLoad(true)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
      }
      fetchSearch()
    }, [checkS])

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: "#292828",
      ...theme.typography.body2,
      padding: "5px",
      textAlign: 'center',
      color: "white",
      fontSize: "13px"
    }));

    return (
          <>
           {load ?
           <>
            <div className='searchCon'>
              <Typography id='search'>{`The following results are found based on your search "${queryData}".`}</Typography>
              {foundAm.length === 0 && <Typography>{`No "${queryData}" Found.`}</Typography>}
              <Grid container spacing={3}>
                {foundAm.map(dada => (
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} id="wid" key={dada._id}>
                  <Paper elevation={6} id="paperC" onClick={() => navigate(`/v1/album/${dada._id}`)}>
                    <div className='imgCoc4'>
                      <img src={dada.frontPicture} style={{width: "100%", height: "100%"}}/>
                    </div>
                    <div className='abso'>
                    <div className='flex abso_child'>
                        <StarIcon id='star' style={{fontSize: "17px"}}/>
                        <Typography style={{fontSize: "14px", marginLeft: "3px"}}>{dada.rating}</Typography>
                    </div>
                  </div> 
                  <div className='abso_child2'>
                      <Typography gutterBottom style={{fontSize: "21px", fontWeight: "bold"}} className="stit">{dada.title}</Typography>
                      <div className='flex'>
                      <Typography gutterBottom style={{fontSize: "14px"}}>{`Year: ${dada.date}`}</Typography>
                      <div className=' margin1'>
                      <Typography gutterBottom style={{fontSize: "14px"}}>{` ${dada.episodes[0]} Episodes`}</Typography>
                      </div>
                      </div>
                      <Stack direction="row" spacing={1}>
                        {dada.type.split(",").slice(0,2).map((data, index) => (
                          <Item key={index}>{data}</Item>
                        ))}
                      </Stack>
                    </div> 
                  </Paper>              
                </Grid>))}
              </Grid>
            </div>
            </>: 
            <div className='loads'>
                <div>
                    <CircularProgress id="loadingHome"/>
                </div>
            </div>
           }
          </>
    )
}

export default Search
