import React from 'react'
import { CircularProgress, Container, Grid, Paper, ToggleButtonGroup, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TabPanel from '@mui/lab/TabPanel';

function SecondGrid({ep, load, setPepName, pTitle, pEpname, epC}) {
    const [value, setValue] = React.useState('1');
    const currentRef = React.useRef(null)
    const [con, setCon] = React.useState(true)
    const [currentEp, setCurrentEp] = React.useState(0)
    const navigate = useNavigate()
    const counts = epC

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

      const handleRequest = (e) => {
        if(epC > 1) {
          setPepName(`${pTitle} Episode ${e.target.value}`)
        } else {
          setPepName(`${pTitle} ${e.target.value}`)
        }
        navigate(`/v1/play/${pTitle}/${pEpname}`)
      }

      let check = 1
      const Title = () => {
        const divs = []
        let v = 0
        if(load) {
          const splitEpName = ep[0].epname.split(" ")
          const currentEp = splitEpName[splitEpName.length - 1]
          for(let i = 0; i < counts; i = i + 50) {
            let num = i + 50
             v = v + 1
             if(currentEp <= num && currentEp > num - 50)  {
              check = v
             }
             if(num > counts) {
               divs.push(<Tab className='notranslate' key={i} label={`${i + 1} - ${counts}`} value={`${v}`} style={{color: "white", fontSize: "13px"}} />)
             } else if (i < counts) {
              divs.push(
                <Tab key={i} className='notranslate' label={`${i + 1}- ${i + 50}`} value={`${v}`} style={{color: "white", fontSize: "13px"}} />
              )
             }
          }
          if(con) {
            setValue(`${check}`)
            setCon(false)
          }
        }
        return divs
      }
  
      // 4 place need to change if you want to set total ep
      const Main = () => {
        const divs = []
        let v = 0
        for (let i = 0; i < counts; i = i + 50) {
          let num = i + 50
          v = v + 1
          if(num > counts) {
            divs.push(<TabPanel className='notranslate' key={i} value={`${v}`} style={{padding: "0"}}>{<Grid container>{List(i + 1, counts)}</Grid>}</TabPanel>)
          } else if(i < counts) {
            divs.push(<TabPanel className='notranslate' key={i} value={`${v}`} style={{padding: "0"}}>{<Grid container>{List(i + 1, num)}</Grid>}</TabPanel>)
          } 
        }
        return divs
      }

      const List = (no, num) => {
        const divs = []
        if(load) {
          const splitEpName = ep[0].epname.split(" ")
          const currentEp = splitEpName[splitEpName.length - 1]
          for(let i = no; i <= num; i++) {
            if(i === Number(currentEp)) {
              divs.push(
                <Grid item key={i}>
                  <Paper elevation={6} id="card_con"><Typography className='notranslate' id="card"><button ref={currentRef} className='savior notranslate' value={i} onClick={handleRequest}>{i}</button></Typography></Paper>
                </Grid>
                )
            } else {
              divs.push(
                <Grid item key={i}>
                  <Paper elevation={6} id="card_con"><Typography className='notranslate' id="card"><button className='savior notranslate' value={i} onClick={handleRequest}>{i}</button></Typography></Paper>
                </Grid>
                )
            }
          }
        } 
        return divs
      }

      React.useEffect(() => {
        if(currentRef.current) {
          currentRef.current.style.color = "#009eff"
          // currentRef.current.focus()
          setCurrentEp(currentRef.current.value)
        }
      }, [])

     console.log("secondGrid")
    return (
        <Grid item sm={12} md={12} lg={2.9} xl={2.9} id='playListContainer' order={{ xs: 3, sm: 3, md: 3, lg: 2, xl: 2}}>
        {load && 
        <div>
        <div>
            <Typography id='title3'>{ep[0]?.Mtitle}</Typography>
        </div>
        <div style={{position: "relative"}}>
        <div className='epConc'>
          <img src="/play.gif" className='gifCon'/>
          <Typography style={{color: "#009eff", zIndex: "1"}}>Episodes</Typography>
        </div>
        <div className='black'>
          <img src='/black3.png' style={{width: "100%"}} />
        </div>
        </div>
        <div id='listCon1'>
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {Title()}
                </TabList>
              </Box>
              <Typography id="free">Watch all episodes free</Typography>
              {Main()}                    
            </TabContext>
          </Box>
        </div>
        </div>}
      </Grid>
    )
}

export default React.memo(SecondGrid)
