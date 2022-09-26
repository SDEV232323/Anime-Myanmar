import { Avatar, Button, Typography } from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AnimeContext } from '../../Context';
{/* <div className='flexNav'>
<LanguageIcon />
<Typography id="navText">Language</Typography>
</div> */}
function NavBar({setChangeLan}) {

   const navigate = useNavigate()
   const {setOpenNav, userInfo, Pload, setSign, setChangeProfile} = React.useContext(AnimeContext)
   const [userAmac, setUserAmac] = React.useState(JSON.parse(localStorage.getItem("AmAc")) || [])

    const handleHistory = () => {
      setOpenNav(false)
      navigate('/v1/history')
    }

    const handleWatchLater = () => {
       if(userInfo) {
        setOpenNav(false)
        navigate('/v1/watchlater')
       } else {
        setSign(true)
        setOpenNav(false)
       }
    }

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

    const handleNavBar = () => {
      setSign(true)
      setOpenNav(false)
    }

    const handleLogout = () => {
      localStorage.removeItem("AmAc")
      setChangeProfile(pres => !pres)
      window.location.reload()
    }

    const handleMyAccount = () => {
         if(userInfo) {
          navigate("/v1/myAccount")
          setOpenNav(false)
         } else {
          setSign(true)
          setOpenNav(false)
         }
    }
  
    return (
     <div className='navBar'>
        {userAmac.length === 0 || Pload === false 
        ? <div className='profile'>
          <div className='progile_image'>
            <img src='https://i.pinimg.com/280x280_RS/55/96/4e/55964ebb02710d6b9ce1c26f1d857906.jpg' style={{width: "100%", height: "100%", borderRadius: "50%"}} />
          </div>
          <div>
            <Typography id="profile_name" onClick={handleNavBar}>Login / Signup</Typography>
          </div>
        </div> : 
        <div className='profile notranslate'>
          <div className='notranslate' ><Avatar style={{width: "60px", height: "60px", marginBottom: "10px"}} {...stringAvatar(`${userInfo.name}`)} /></div>
          <Typography>{userInfo.name}</Typography>
        </div>
        }
        <div className='vip'>
          <Button id="gold" fullWidth>Join Vip</Button>
        </div>
        <div className='navFeature'>
        <div className='flexNav' onClick={handleMyAccount}>
          <PermIdentityIcon />
          <Typography id="navText" className='notranslate'>My Account</Typography>
        </div>
        <div className='flexNav'>
        <div><LanguageIcon /></div>
        <div style={{width: "80%"}}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<KeyboardArrowUpIcon />}
            defaultExpandIcon={<ExpandMoreIcon />}
            sx={{ minHeight: 0, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem nodeId='1' label="Language">
              <TreeItem nodeId='2' label="English" style={{padding: '10px 0px 5px 0px'}} onClick={() => setChangeLan("en-Us")}/>
              <TreeItem nodeId='3' label="Myanmar" style={{padding: '5px 0px 5px 0px;'}} onClick={() => setChangeLan("my")}/>
            </TreeItem>
          </TreeView>
        </div>
        </div>
        <div className='flexNav' onClick={handleHistory}>
          <AccessTimeIcon />
          <Typography id="navText">History</Typography>
        </div>
        <div className='flexNav' onClick={handleWatchLater}>
          <BookmarkAddIcon />
          <Typography id="navText">Watch Later</Typography>
        </div>      
        </div>
        <div style={{marginLeft: "8px", width: "80%", marginTop: "25px"}}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<KeyboardArrowUpIcon />}
            defaultExpandIcon={<ExpandMoreIcon />}
            sx={{ minHeight: 0, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem nodeId='1' label="Help and Support">
              <TreeItem nodeId='2' label="Feedback" style={{padding: '10px 0px 5px 0px'}}/>
              <TreeItem nodeId='3' label="FAQ" style={{padding: '5px 0px 5px 0px;'}}/>
            </TreeItem>
          </TreeView>
        </div>  
        <div style={{marginLeft: "8px", width: "80%", marginTop: "25px"}}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<KeyboardArrowUpIcon />}
            defaultExpandIcon={<ExpandMoreIcon />}
            sx={{ minHeight: 0, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem nodeId='1' label="Term of Service">
              <TreeItem nodeId='2' label="Terms of Service" style={{padding: '10px 0px 5px 0px'}}/>
            </TreeItem>
          </TreeView>
        </div> 
        <div className='flexNav'>
          {userInfo && <Typography onClick={handleLogout} style={{marginLeft: "8px", marginTop: "6px"}}>Logout</Typography>}
        </div>    
     </div>
    )
}

export default NavBar
