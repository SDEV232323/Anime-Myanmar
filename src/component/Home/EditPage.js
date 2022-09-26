import React from 'react'
import {Paper, Typography, Avatar, TextField, Box, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { AnimeContext } from '../../Context';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

function EditPage() {

    
    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.slice(0, 1)}`,
        };
      }

    const {setOpenEdit, userInfo, setUserInfo, url} = React.useContext(AnimeContext) 

    const [info, setInfo] = React.useState({
        userId: userInfo._id,
        name: userInfo.name,
        gender: userInfo.gender,
        date: userInfo.date
    })
    const [disableCondition, setDisableCondition] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    const handleEditSumbit = async () => {
      try {
        setDisableCondition(true)
        setLoading(true)
        const {data} = await axios.patch(`${url}v1/myAccount/edit`, info)
        setUserInfo(data)
        setOpenEdit(false)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    React.useEffect(() => {
       if (info.name !== userInfo.name || info.gender !== userInfo.gender || info.date !== userInfo.date) {
          setDisableCondition(false)
       } else {
          setDisableCondition(true)
       }
    }, [info])
    
    return (
        <div className='signMain' >
            <div className='signConc'>
              <Paper elevation={3} id="sharePaper">
                <div className='insideShare'>
                    <div className='shareHeader' style={{justifyContent: "flex-end"}}>
                        <div><CloseIcon onClick={() => setOpenEdit(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
                    </div>
                </div>
                <Typography id="editProfileTitle" gutterBottom>Profile</Typography>
                <div className='userImageContainer'>
                  <div className='notranslate'><Avatar className='avatar99' {...stringAvatar(`${info.name}`)} /></div>
                </div>
                <div className='editForm'>
                    <TextField style={{marginTop: "25px"}} focused={true} onChange={(e) => setInfo(prev => ({...prev, name: e.target.value}))}
                    id="outlined-textarea"  name="name" label="Name" value={info.name} multiline fullWidth/>
                    <div style={{marginTop: "25px"}}>
                        <Box>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(e) => setInfo(prev => ({...prev, gender: e.target.value}))}
                                label="Gender"
                                value={info.gender}>
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"No wish to answer"}>No wish to answer</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div style={{marginTop: "25px"}}>
                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                            <DatePicker
                            inputFormat='dd/MM/yyyy'
                            label="Date of birth"
                            value={info.date.slice(0, 10)}
                            onChange={(newValue) => {
                                setInfo(pres => ({...pres, date: newValue.toISOString()}));
                              }}
                            renderInput={(params) => <TextField fullWidth  {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <Button disabled={disableCondition} id="submitEditForm" onClick={handleEditSumbit} fullWidth>
                  {loading ? <CircularProgress style={{width: "30px", height: "30px", color: "white"}}/> : "Submit"}
                </Button>
                <Button id='cancelSubmitForm' fullWidth onClick={() => setOpenEdit(false)}>Cancel</Button>
              </Paper>
            </div>
        </div>  
    )
}

export default EditPage
