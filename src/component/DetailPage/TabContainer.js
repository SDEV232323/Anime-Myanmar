import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Typography, MenuItem, FormControl, InputLabel, Grid, CircularProgress } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import "./style.css"
import VideoComponent from './VideoComponent';
import Recommend from './Recommend';
import { AnimeContext } from '../../Context';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function TabContainer({firstEpNum, animecount, params, currentData}) {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [openAlert, setOpenAlert] = React.useState(false)
  const [openAlert2, setOpenAlert2] = React.useState(false)


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

    const [value, setValue] = React.useState('1');
    const [dropbox, setDropBox] = React.useState(false)
    const [storeList, setStoreList] = React.useState([])
    const [nums, setNums] = React.useState(1)
    const [epData, setEpData] = React.useState({})
    const [check2, setCheck2] = React.useState(false)
    const [recommends, setRecommends] = React.useState([])
    const [checkR, setCheckR] = React.useState(false)
    const {url} = React.useContext(AnimeContext)

    if(check2) {
        const getFirstEpNum = epData[0]?.epname.split(" ")
        try {
          firstEpNum = 0 || getFirstEpNum[getFirstEpNum?.length - 1]
        } catch (error) {
          console.log()
        }
       }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

      const handleClick = (e) => {
        setNums(e.target.value)
        setDropBox(false)
      }

      React.useEffect(() => {

        const dynamicList = () => {
          let divs = []
          for(let i = 0; i < animecount; i = i + 2) {
            let num = 1 + i
            let num1 = num + 1
            if(num1 > animecount) {
               divs.push(<button key={i} value={num} onClick={handleClick} className='butforV  notranslate'>{`${num}`} {num !== animecount && - animecount}</button>)
            } else {
              divs.push(<button key={i} value={num} onClick={handleClick} className='butforV  notranslate'>{`${num} - ${num1}`}</button>)
            }    
          }
          setStoreList(divs)
          return divs
        }

          if(check2) {
            dynamicList()
          }
         
      }, [nums, firstEpNum])

      React.useEffect(() => {
        const fetchEpisodes = async () => {
           try {
               setCheck2(false)
               const datas = await axios.post(`${url}v1/album/${params.name}`, {nums})
               setEpData(datas.data)
               setCheck2(true)
             } catch (error) {
               console.log(error)
               setCheck2(false)
             }
        }
        fetchEpisodes()
         }, [nums])

         React.useEffect(() => {
            const fetchRecommendation = async () => {
              try {
                setCheckR(false)
                 const {data} = await axios.post(`${url}v1/recommend`, currentData.type.split(","))
                 setRecommends(data)
                 setCheckR(true)
              } catch (error) {
                console.log(error)
                setCheckR(false)
              }
            }
            fetchRecommendation()
         }, [])
        
    return (
        <div className='tapContainer'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "rgba(255 243 243 / 0.3);" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab style={{color: "white", fontSize: "14px"}} id='fontForE' label="Episodes" value="1" />
                <Tab style={{color: "white", fontSize: "14px"}} id='fontForE' label="Recommended" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" style={{padding: "0px"}}>
              {animecount > 1 &&
              <div className='eptab' onClick={() => setDropBox(pres => !pres)}>
               <div className='tab-child'>
                <span style={{display: "flex", height: "20px"}}>Episodes &nbsp; <div className='notranslate' style={{width: "80px"}}>{storeList[Math.floor(nums / 2)]}</div></span>
                <span><ExpandMoreIcon /></span>
               </div>
              </div>}
              {dropbox && 
              <div className='list'>
               {storeList.map(data => (
                <div className='child_list'>{data}</div>
               ))}
              </div>}
              <div className='main-vid'>
                {check2 && 
                <Grid container  direction="row">
                  {epData?.map((vid, index) => 
                  <Grid key={index} item xs={5.5} sm={4} md={4} lg={3} xl={3} style={{margin: "0px 3px 0px 10px", cursor: "pointer"}}>
                   <VideoComponent num={index} key={index} vid={vid}/>
                  </Grid>
                   )}
                </Grid>}
              </div>
            </TabPanel>
            <TabPanel value="2">
             <>
              {checkR ?
               <Grid container direction="row">
                 {recommends?.map((info, index) => 
                  <Grid key={info._id} item xs={4} sm={4} md={4} lg={2.4} xl={2.4}>
                   <Recommend info={info} openAlert={openAlert} setOpenAlert={setOpenAlert} openAlert2={openAlert2} setOpenAlert2={setOpenAlert2}/>
                  </Grid>
                 )}
               </Grid> :
                <div className='loads loads2'>
                    <div>
                        <CircularProgress style={{width: "70px", height: "70px"}}/>
                    </div>
                </div>
              }
             </>
            </TabPanel>
          </TabContext>
        </Box>
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
      </div>
    )
}

export default TabContainer
