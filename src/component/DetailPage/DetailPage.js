import React from 'react'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from "react-router-dom"
import { Button, Typography, MenuItem, FormControl, InputLabel, Grid, CircularProgress, Paper, Stack } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { styled } from '@mui/material/styles';
import TabContainer from './TabContainer';
import { AnimeContext } from '../../Context';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function DetailPage() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    const params = useParams()
    const navigate = useNavigate()
    const {setSelected,url, setSign, userInfo, setUserInfo, Pload, setShareBox, url2, setUrl2Name} = React.useContext(AnimeContext)
    const location = useLocation()

    const [data, setData] = React.useState({})
    const [more, setMore] = React.useState(false)
    const [current, setCurrent] = React.useState(2)
    const [check1, setCheck1] = React.useState(false)
    const [ep, setEp] = React.useState('');
    const [acc, setAcc] = React.useState(JSON.parse(localStorage.getItem("AmAc")) || [])
    const [openAlert, setOpenAlert] = React.useState(false)
    const [openAlert2, setOpenAlert2] = React.useState(false)

    const handleClick = () => {
      setOpenAlert(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };

    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert2(false);
    };

    let firstEpNum = 0
    let animecount = check1 && data?.episodes[0]

    React.useEffect(() => {
      window.scrollTo(0,0)
     const fetchSpecificAnime = async () => {
        try {
            setCheck1(false)
            window.scrollTo(0,0)
            const datas = await axios.get(`${url}v1/album/${params.name}`)
            setData(datas.data[0])
            setSelected(datas.data[0])
            setCheck1(true)
          } catch (error) {
            console.log(error)
            setCheck1(false)
          }
     }
     fetchSpecificAnime()
     localStorage.setItem("AmRoute", JSON.stringify(location.pathname))
      }, [])

      const handleChange2 = (event: SelectChangeEvent) => {
        setEp(event.target.value );
      };

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "rgba(256, 256, 256, 0.1)",
        ...theme.typography.body2,
        padding: "5px",
        textAlign: 'center',
        color: "white",
        fontSize: "13px",
        minWidth: "100px"
      }));

      const handleAddWatchLaterButton = async () => {
        if(!userInfo) {
          setSign(true)
        } else {
          try {
            const dada = await axios.patch(`${url}v1/addWatchLater/${userInfo.id}`, {animeTitle: data.title})
            setUserInfo(dada.data)
            setOpenAlert(true)  
          } catch (error) {
            console.log(error)
          }  
        }
      }

    const handleRemoveWatchLaterButton = async () => {
      if(!userInfo) {
        setSign(true)
      } else {
        try {
          const dada = await axios.patch(`${url}v1/addWatchLater/${userInfo.id}`, {animeTitle: data.title})
          setUserInfo(dada.data)
          setOpenAlert2(true)  
        } catch (error) {
          console.log(error)
        }  
      }
    }
    console.log("detail page")
    return (
      <>
      {check1
      ?
    <>
      <div className='imgCon imgCon2'>
      <img src={data.coverpicture} style={{width: "100%", height: "100%"}} />
      <div className='info info2' >
          <div className='info-child info-child2'>
              <div className='child'>
               <div className='letPic letPic2'>
                 <div className='picForMobile'>
                  <img src={data.letterPic} style={{width: "100%", height: "100%"}}/>
                 </div>
                </div>
              <Typography className='notranslate' id="tit" gutterBottom>{data.title}</Typography>
              <div className='flex'                               >
              <div className='flex marginT'>
                  <StarIcon id="star2"/>
                  <Typography id='fontForD' style={{color: "gold"}}>{data.rating}</Typography>
              </div>
              <div className='flex marginT margin1'>
                <Typography id='fontForD'>{data.date}</Typography>
              </div>
              <div className='flex marginT margin1'>
                <Typography id='fontForD'>{data?.episodes[0]} Episodes</Typography>
              </div>
              </div>
              <div className='marginT'                                >
              <Grid container direction="row" spacing={1} id="pc_open2">
                {data.type.split(",").map((gen, index) => (
                  <Grid key={index} Item style={{margin: "5px 5px 5px 0px"}}>
                      <Item key={index}>{gen}</Item>
                  </Grid>
                  ))}
              </Grid>
              </div>
              <div className='flex marginT'>
                <div className='flex  '>
                 <Typography id='fontForD' style={{color: "#82859c"}}>Region: &nbsp;</Typography>
                 <Typography id='fontForD'>Japan</Typography>
                </div>
                <div className='flex  margin1'>
                 <Typography id='fontForD' style={{color: "#82859c"}}>Dub: &nbsp;</Typography>
                 <Typography id='fontForD'>Japanese</Typography>
                </div>
                <div className='flex  margin1'>
                 <Typography id='fontForD' style={{color: "#82859c"}}>Sub: &nbsp;</Typography>
                 <Typography id='fontForD'>Myanmar</Typography>
                </div>
              </div>
              <div className='marginT'>
                <div className='flex' style={{marginBottom: "5px"}}>
                {!more ? <Typography key={"1"} id='fontForD' style={{textAlign: "start"}}><span style={{color: "#82859c"}}>Description: </span>&nbsp; {data?.description?.split(" ").slice(0, 40).join(" ")}{data.description.split(" ").length > 40 ? "..." : ""}</Typography>
               :  <Typography id='fontForD' key={"2"} style={{textAlign: "start"}}><span style={{color: "#82859c"}}>Description: </span>&nbsp; {data?.description}</Typography>}
                </div>
              {data.description.split(" ").length > 40 && 
              <>
                {!more ? 
                <div className='flex' id="more1" onClick={() => setMore(true)}>
                  <Typography id="more2">More</Typography>
                  <ExpandMoreIcon id="more2" style={{fontSize: "25px"}}/>
                </div> :
                <div className='flex' id="more1" onClick={() => setMore(false)}>
                  <Typography id="more2">Less</Typography>
                  <ExpandLessIcon id="more2" style={{fontSize: "25px"}}/>
                </div>}  
              </>}
              <div className='allButs'>
                <Button id="play-but"><PlayArrowIcon style={{marginBottom: "4px", marginRight: "5px"}}/> <span style={{marginRight: "10px"}}>Play</span></Button>
                {userInfo ?
                <>
                {userInfo.watchLater.includes(data.title) ? 
                <Button id="play-but2" onClick={handleRemoveWatchLaterButton}><BookmarkAddedIcon style={{marginRight: "5px"}}/> <span className='rmForM' style={{marginRight: "10px", fontSize: "15px"}}>Remove from Watch Later</span></Button>
                : <Button id="play-but2" onClick={handleAddWatchLaterButton}><BookmarkAddIcon style={{marginRight: "5px"}}/> <span className='rmForM' style={{marginRight: "10px", fontSize: "15px"}}>Add to Watch Later</span></Button>}
                </> : 
                <>
                 <Button id="play-but2" onClick={handleAddWatchLaterButton}><BookmarkAddIcon style={{marginRight: "5px"}}/> <span className='rmForM' style={{marginRight: "10px", fontSize: "15px"}}>Add to Watch Later</span></Button>
                </>
                }
                <Button onClick={() => (setUrl2Name(`${url2}/v1/album/${data._id}`), setShareBox(true))} id="play-but2" style={{padding: "0px 13px"}}><IosShareIcon style={{marginBottom: "4px", marginRight: "5px"}}/> <span className='rmForM' style={{marginRight: "10px", fontSize: "15px"}}>Share</span></Button>
              </div>
              </div>
          </div>
          </div>
          <div className='blur'></div>
      </div>
      <TabContainer firstEpNum={firstEpNum} animecount={animecount} params={params} currentData={data}/>
  </div>
</> :
      <div className='loads'>
          <div>
              <CircularProgress id="loadingHome"/>
          </div>
      </div>
}
     <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} style={{height: "35px"}} severity="success" sx={{ width: '100%' }}>
          Add successful to Watch Later
        </Alert>
      </Snackbar>
      <Snackbar open={openAlert2} autoHideDuration={3000} onClose={handleClose2}>
        <Alert onClose={handleClose2} style={{height: "35px"}} severity="success" sx={{ width: '100%' }}>
          Remove successful from Watch Later
        </Alert>
      </Snackbar>
  </>
    )
}

export default DetailPage
