import React from 'react'
import {Avatar, Button, Drawer, SwipeableDrawer, TextField, Typography} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Cookies from 'universal-cookie';
import HistoryIcon from '@mui/icons-material/History';
import {useLocation, useNavigate} from "react-router-dom"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "./style.css"
import { AnimeContext } from '../../Context';
import {motion} from "framer-motion"
import History from './History';
import MobileSearch from './MobileSearch';
import NavBar from './NavBar';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
    const cookies = new Cookies()
    
    const [language, setLanguage] = React.useState(false)
    const [changeLan, setChangeLan] = React.useState(cookies.get("googtrans") || "en-Us") 
    const [search, setSearch] = React.useState("")
    const [searchHistory, setSearchHistory] = React.useState(JSON.parse(localStorage.getItem("AmSh")) || [])
    const [watchHistory, setWatchHistory] = React.useState(false)
    const [history, setHistory] = React.useState(JSON.parse(localStorage.getItem("AmTime")))
    const [amac, setAmac] = React.useState(JSON.parse(localStorage.getItem("AmAc")) || [])
    const [profile, setProfile] = React.useState(false)
    const location = useLocation()

    const {openSearchBox, setOpenSearchBox, anime, Mload, checkS, setCheckS, openNav, setOpenNav, setSign, userInfo, Pload} = React.useContext(AnimeContext)

    const navigate = useNavigate()

    const handleSearch = (e) => {
      setSearch(e.target.value)
    }

    const handleEnter = (e) => {
      if(e.keyCode == 13) {
       if(search.length > 0) {
        setSearchHistory(pres => ([search, ...pres].slice(0, 4)))
        setSearch("")
        setOpenSearchBox(false)
        navigate(`/v1/search?query=${search}`)
        setCheckS(pres => !pres)
       }
      }
    }

    const handleClickSearch = (e) => {
       if(search.length > 0) {
        setSearchHistory(pres => ([search, ...pres].slice(0, 4)))
        setSearch("")
        setOpenSearchBox(false)
        navigate(`/v1/search?query=${search}`)
        setCheckS(pres => !pres)
       }
    }
    
    React.useEffect(() => {
        if(cookies.get("googtrans") !== changeLan) {
          if(changeLan == "my") {
            cookies.set("googtrans", "/en/my")
          } else {
            cookies.set("googtrans", changeLan)
          }
          window.location.replace(`${location.pathname === "/" ? "" : location.pathname}/#googtrans(${changeLan})`);
          console.log("first")
          window.location.reload()
        }
    }, [changeLan])

    // if(cookies.get("googtrans") !== changeLan) {
    //   console.log("second")
    //   window.location.reload()
      
    // }

    React.useEffect(() => {
      if(searchHistory.length > 0) {
        localStorage.setItem("AmSh", JSON.stringify(searchHistory))
      }
    }, [searchHistory])

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

    const handleGoWatchLater = () => {
      navigate("/v1/watchlater")
      setProfile(false)
    }

    const handleLogout = () => {
      localStorage.removeItem("AmAc")
      window.location.reload()
    }

    return (
        <div className='main'>
            <div className='name_container'>
                <div onClick={() => navigate("/")} className="titleHeader"><img src='./anime_myanmar.png' style={{width: "100%", height: "100%"}}/></div>
                <div className='flex headerIconMain' >
                    <div className='search' style={{marginRight: "55px"}}>
                      <SearchIcon className='searchIcon' onClick={handleClickSearch}/>
                      <input type="text" value={search} placeholder='Search' className='searchbox' onClick={() => setOpenSearchBox(true)} onKeyDown={handleEnter} onChange={handleSearch}/>
                      <div className='pcSearch'>
                      {searchHistory.length > 0 && openSearchBox === true && search === ""
                      &&
                      <div className='lan2'>
                        <div>
                          <Typography style={{fontSize: "14px", color: "#969696", marginBottom: "10px", marginLeft: "20px"}}>Search History</Typography>
                          <div>
                            {searchHistory.map((data, index) => (
                              <Typography gutterBottom className='historyList' key={index}
                              onClick={(e) => (navigate(`/v1/search?query=${data}`), setCheckS(pres => !pres), setOpenSearchBox(false), setSearchHistory(pres => (searchHistory[0] === data ? searchHistory : [data, ...pres.filter(info => info != data)])))}>
                                <span style={{color: "#0395F5"}}>{index + 1}.</span> {data}
                              </Typography>
                            ))}
                          </div>
                        </div>
                      </div>}                   
                       {search.length > 0 && openSearchBox === true 
                       &&
                        <div className='lan2'>
                         {anime.filter((dada) => {
                          if(dada.title.toLowerCase().includes(search.toLowerCase())) {
                            return dada
                          }
                         }).map((info, index) => (
                          <Typography key={info._id} className='historyList' 
                          onClick={(e) => (navigate(`/v1/search?query=${info.title}`), setOpenSearchBox(false), setCheckS(pres => !pres), setSearchHistory(pres => (searchHistory[0] === info.title ? searchHistory : [info.title, ...pres.filter(infos => infos != info.title)])), setSearch(""))}>{info.title}</Typography>
                         ))}
                       </div>}
                      </div>
                    </div>
                    <div className='mobileSearch'>
                     <MobileSearch searchHistory={searchHistory} setSearch={setSearch} openSearchBox={openSearchBox} search={search} setCheckS={setCheckS} setSearchHistory={setSearchHistory} anime={anime} setOpenSearchBox={setOpenSearchBox} handleEnter={handleEnter} handleSearch={handleSearch} handleClickSearch={handleClickSearch}/>
                    </div>
                    <div className='icons'>
                      <div className='icon_kids1'
                      onMouseEnter={() => setWatchHistory(true)}
                      onMouseLeave={() => setWatchHistory(false)}
                      onClick={() => setWatchHistory(pres => !pres)}
                      style={{color: watchHistory ? "#009eff" : "white"}}
                      >
                        <AccessTimeIcon />
                        <div style={{marginLeft: "10px"}}><Typography variant='body2' >History</Typography></div>
                      </div>
                      {watchHistory &&
                       <div className='lan3' style={{border: "0.01px solid white"}}
                       onMouseEnter={() => setWatchHistory(true)}
                       onMouseLeave={() => setWatchHistory(false)}
                       >
                          <div className='arrowup'
                          onMouseEnter={() => setWatchHistory(true)}
                            ><ArrowDropUpIcon style={{fontSize: "40px"}}/></div>
                        {history?.length > 0 ?
                         <>
                          {history.slice(0, 4).map((data, index) => (
                            <History key={index} data={data} />
                         ))}
                         </> :
                         <>
                          <div style={{display: "flex", justifyContent: "center"}}>
                            <div className='boxImgs'>
                              <img src='./box.png' style={{width: '100%', height: "100%"}} />
                            </div>
                          </div>
                          <Typography style={{marginTop: "-4px", display: "flex", justifyContent: "center"}}>No Watch History</Typography>
                         </>
                        }
                        {!userInfo && 
                        <motion.div className='flex' style={{justifyContent: "center", margin: "10px 10px 10px 30px", cursor: "pointer", userSelect: "none"}} 
                         whileHover={{color: "#009eff"}}
                        >
                        <Typography onClick={() => setSign(true)} style={{display: "flex", justifyContent: "center"}}>Login to view more</Typography>
                        <KeyboardArrowRightIcon />                          
                        </motion.div>}
                       </div>
                      }
                    </div>
                    <div className='icons'>
                        <div className='icon_kids2' 
                        onMouseEnter={() => setLanguage(true)}
                        onMouseLeave={() => setLanguage(false)}
                        onClick={() => setLanguage(pres => !pres)}
                        style={{color: language ? "#009eff" : "white"}}
                        >
                            <LanguageIcon />
                            <div style={{marginLeft: "10px"}}><Typography variant='body2'>Language</Typography></div>
                        </div>
                        {language && 
                        <div className='lan' style={{border: "0.01px solid white"}}
                        onMouseEnter={() => setLanguage(true)}
                        onMouseLeave={() => setLanguage(false)}
                        >
                            <div className='arrowup'
                            onMouseEnter={() => setLanguage(true)}
                            ><ArrowDropUpIcon style={{fontSize: "40px"}}/></div>
                            <Typography variant='body2' id="languages1" gutterBottom onClick={() => setChangeLan("en-Us")}>English</Typography>
                            <Typography variant='body2' id="languages2" gutterBottom onClick={() => setChangeLan("/en/my")}>Myanmar</Typography>
                        </div>
                        }
                    </div>
                    {amac.length === 0 || Pload === false
                    ?
                    <div className='icons'>
                      <Button id='but' onClick={() => setSign(true)}>Sign In</Button>
                    </div> : 
                    <div className='avatarConc'
                    onMouseEnter={() => setProfile(true)}
                    onMouseLeave={() => setProfile(false)}
                    onClick={() => setProfile(pres => !pres)}                    
                    >
                      <div style={{textAlign: "center", cursor: "pointer"}}>
                       <div className='avatar'><Avatar  {...stringAvatar(`${userInfo.name}`)} /></div>
                      </div>
                      {profile && 
                        <div className='lan6' style={{border: "0.01px solid white"}}
                        onMouseEnter={() => setProfile(true)}
                        onMouseLeave={() => setProfile(false)}
                        >
                            <div className='arrowup'
                            onMouseEnter={() => setProfile(true)}
                            ><ArrowDropUpIcon style={{fontSize: "40px"}}/></div>
                            <div className='flexProfile'>
                              <div className='avatar2'><Avatar   {...stringAvatar(`${userInfo.name}`)} /></div>
                              <Typography style={{marginLeft: "10px"}}>{userInfo.name}</Typography>
                            </div>
                            <motion.div className='flexPp' style={{background: "#1A2027"}} whileHover={{background: "rgba(80, 80, 80, 0.1)", color: '#009eff'}}
                             onClick={handleGoWatchLater}>
                              <div className='flexNavPc'>
                                <BookmarkAddIcon />
                                <Typography id="navText">Watch Later</Typography>
                              </div>  
                              <div><ChevronRightIcon /></div>
                            </motion.div>
                            <motion.div className='flexPp' style={{background: "#1A2027"}} whileHover={{background: "rgba(80, 80, 80, 0.1)", color: '#009eff' }}>
                              <div className='flexNavPc' onClick={() => navigate("/v1/myAccount")}>
                                <PermIdentityIcon />
                                <Typography id="navText" className='notranslate'>My Account</Typography>
                              </div>  
                              <div><ChevronRightIcon /></div>
                            </motion.div>
                            <motion.div className='flexPp' style={{background: "#1A2027"}} whileHover={{background: "rgba(80, 80, 80, 0.1)", color: '#009eff'}}>
                              <div className='flexNavPc' onClick={handleLogout}>
                                <LogoutIcon />
                                <Typography id="navText">Logout</Typography>
                              </div>  
                              <div><ChevronRightIcon /></div>
                            </motion.div>
                        </div>
                        }
                    </div>
                    }
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      id="nav"
                      onClick={() => setOpenNav(true)}
                    >
                      <MenuIcon />
                    </IconButton>
                </div>
            </div>
            <div>
            <Drawer 
            anchor={'left'}
            open={openNav}
            onClose={() => setOpenNav(false)}
            id="navFc"
            >
              <NavBar setChangeLan={setChangeLan}/>
            </Drawer>
            </div>
        </div>
    )
}

export default Header
