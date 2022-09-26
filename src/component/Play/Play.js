import { CircularProgress, Container, Grid, Paper, ToggleButtonGroup, Typography, Avatar, TextField, Button } from '@mui/material'
import axios from 'axios'
import React, { useLayoutEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReactPlayer from 'react-player'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import './style.css'
import Description from './Description';
import Video from './Video';
import { AnimeContext } from '../../Context';
import { jsx } from '@emotion/react';
import SecondGrid from './SecondGrid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CommentPage from './CommentPage';
import CloseIcon from '@mui/icons-material/Close';
import {animate, AnimatePresence, motion} from "framer-motion"

const commentVariants = {
  initial: {
    y: "500",
    transition: {duration: 0.5, ease: "easeIn"}
  },
  animate: {
    y: 0,
    transition: {duration: 0.5, ease: "easeIn"}
  }, 
  exit: {
    y: "-500",
    transition: {ease: "easeInOut", duration: 0.5}
  }
}

function Play() {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    const params = useParams()
    const location = useLocation()
    const {setHistory, history, url, userInfo, setSign, setUserInfo, setUrl2Name, url2, setShareBox, setCommentOpenBox, commentOpenBox} = React.useContext(AnimeContext)

    const [ep, setEp] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [like, setLike] = React.useState(false)
    const [pTitle, setPtitle] = React.useState(params.title)
    const [pEpname, setPepName] = React.useState(params.epname)
    const [secondG, setSecondG] = React.useState([])
    const [isReady, setIsReady] = React.useState(false);
    const scrollRef = React.useRef(null)
    const [likeCount, setLikeCount] = React.useState(0)
    const [acc, setAcc] = React.useState(JSON.parse(localStorage.getItem("AmAc")) || [])
    const [openAlert, setOpenAlert] = React.useState(false)
    const [openAlert2, setOpenAlert2] = React.useState(false)
    const commentRef = React.useRef(null)
    const [isSticky, setIsSticky] = React.useState(false)
    const stikcyRef = React.useRef(null)
    const [commentCounts, setCommentCounts] = React.useState(0)
    const [playLike, setPlayLike] = React.useState([])
    const [fuck , setFuck] = React.useState(false)

    const handleClick = () => {
      setOpenAlert(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert(false);
    };

    React.useEffect(()=>{
       if(stikcyRef.current && window.innerWidth < 764) {
        const cachedRef = stikcyRef.current,
        observer = new IntersectionObserver(
              ([e]) => setIsSticky(e.intersectionRatio < 1),
              {
                threshold: 1,
                rootMargin: '-57px 0px 90px 0px',  // alternativly, use this and set `top:0` in the CSS
              }
            )
  
      observer.observe(cachedRef)
      
      // unmount
      return function(){
        observer.unobserve(cachedRef)
      }
       }
    })

    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenAlert2(false);
    };


    React.useEffect(() => {    
       const fetchEpisode = async () => {  
        window.scrollTo(0,0)   
        try {
            setLoad(false)
            const { data } = await axios.get(`${url}v1/play/${pTitle}/${pEpname}`)
            setEp(data)
            setLoad(true)
            setLikeCount(data.getDataInsideOneEpisode[0].episodes[0].like.length)
            setCommentCounts(data.commentCount)
            if(userInfo) {
              console.log("run again")
              setPlayLike(data.getDataInsideOneEpisode[0].episodes[0].like.filter(item => item === userInfo.id))
              setLike(data.getDataInsideOneEpisode[0].episodes[0].like.includes(userInfo.id))
            } else {
              setLike(false)
            }
            const history_child = {name: pTitle, ep: pEpname}
            setHistory(pres => [history_child, ...pres].filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.place === value.place && t.name === value.name
            ))
          ).slice(0, 7))
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
       }
       fetchEpisode()
    }, [pEpname])
    
    React.useEffect(() => {
      if(userInfo && !fuck && load) {
        console.log(userInfo)
        setPlayLike(ep.getDataInsideOneEpisode[0].episodes[0].like.filter(item => item === userInfo.id))
        setFuck(true)
        console.log("running")
        if(userInfo) {
          setLike(ep.getDataInsideOneEpisode[0].episodes[0].like.includes(userInfo.id))
        } else {
          setLike(false)
        }
      }
    })
    
    
   const handleLike = async () => {
    try {
      if(!userInfo) {
        setSign(true)
      } else {
        if(playLike.includes(userInfo.id)) {
          const RemoveLike = playLike.filter(dafo => dafo !== userInfo.id)
          setPlayLike(RemoveLike)          
          const {data} = await axios.patch(`${url}v1/${pTitle}/${pEpname}/like`, {userId: userInfo.id})
          setLikeCount(pres => pres - 1)
          setLike(false)
        
        } else {
          setPlayLike(pres => [...pres, userInfo.id])

          const {data} = await axios.patch(`${url}v1/${pTitle}/${pEpname}/like`, {userId: userInfo.id})
          setLikeCount(pres => pres + 1)
          setLike(true)
   
        }
      }
    } catch (error) {
      console.log(error)  
    }
   }

   const handleAddWatchLaterButton = async () => {
    if(acc.length < 1) {
      setSign(true)
    } else {
      try {
        const dada = await axios.patch(`${url}v1/addWatchLater/${userInfo.id}`, {animeTitle: ep.getDataInsideOneEpisode[0].title})
        setUserInfo(dada.data)
        setOpenAlert(true)  
      } catch (error) {
        console.log(error)
      }  
    }
  }

const handleRemoveWatchLaterButton = async () => {
  if(acc.length < 1) {
    setSign(true)
  } else {
    try {
      const dada = await axios.patch(`${url}v1/addWatchLater/${userInfo.id}`, {animeTitle: ep.getDataInsideOneEpisode[0].title})
      setUserInfo(dada.data)
      setOpenAlert2(true)  
    } catch (error) {
      console.log(error)
    }  
  }
}

const handleShare = () => {
  setUrl2Name(`${url2}/v1/play/${pTitle}/${pEpname}`)
  setShareBox(true)
}

    const handleCommentBox = () => {
      if(window.innerWidth < 764) {
        setCommentOpenBox(true)
        commentRef.current.style.display = "inline-block"
      } else {
        commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const handleCloseCommentBox = () => {
      setCommentOpenBox(false)
      commentRef.current.style.display = "none"
    }
    
    return (
      <>
        {load ?
          <Container maxWidth="xl" id="playMain" >
            <Grid container>
              <div className='firstFF' ref={scrollRef} style={{width: "4px", height: "4px"}}></div>
            <Grid ref={stikcyRef} id="setH" item sm={12} md={12} lg={9} xl={9}>
                  <div className='playContainer'>
                    <Video ep={ep.getDataInsideOneEpisode[0].episodes} pEpname={pEpname} isReady={isReady} setIsReady={setIsReady}/>
                  </div>
                  <motion.div 
                   initial={{y: isSticky ? "60" : "0", opacity: isSticky ? "0" : "1"}}
                   animate={{y: isSticky ? "0" : "60",  opacity: isSticky ? "0" : "1"}}
                   className='iconsContainer'>
                    <div className='flex'>
                      <div className='Marg flex' onClick={handleLike}>
                        {!like ? <ThumbUpOffAltIcon id="thumbOff" /> : <ThumbUpIcon id="thumbUp" />}
                        <Typography id="likePc"> {likeCount} <span >{likeCount > 0 ? "Likes" : "Like"}</span></Typography>
                      </div>
                      <div className='Marg flex' style={{position: "relative"}} onClick={handleCommentBox}>
                        <div><ChatBubbleOutlineIcon id="thumbOff" /></div>
                        <Typography  id="fontForV" style={{margin: "0px 0px 0px 10px"}}>{commentCounts} Comment</Typography>
                        {/* <div className='notiComment'>{commentCounts}</div> */}
                      </div>
                    </div>
                    <div className='flex'>
                     {userInfo ? 
                     <>
                      {userInfo.watchLater.includes(ep.getDataInsideOneEpisode[0].title) ?
                        <div className='Marg flex' onClick={handleRemoveWatchLaterButton}><BookmarkAddedIcon id="thumbOff" /><Typography id="fontForV" style={{margin: "0px 0px 0px 5px"}}>Watch Later</Typography></div> :
                        <div className='Marg flex' onClick={handleAddWatchLaterButton}><BookmarkAddIcon id="thumbOff" /><Typography id="fontForV" style={{margin: "0px 0px 0px 5px"}}>Watch Later</Typography></div>  
                      }
                     </> : 
                     <div className='Marg flex' onClick={handleAddWatchLaterButton}><BookmarkAddIcon id="thumbOff" /><Typography id="fontForV" style={{margin: "0px 0px 0px 5px"}}>Watch Later</Typography></div>
                     }
                    <div onClick={handleShare} className='Marg flex'><IosShareIcon id="thumbOff" /><Typography id="fontForV" style={{margin: "2px 0px 0px 5px"}}>Share</Typography></div>
                    </div>
                  </motion.div>
              </Grid>
              <SecondGrid isReady={isReady} setIsReady={setIsReady} ep={ep.getDataInsideOneEpisode[0].episodes} epC={ep.epCount} load={load} setPepName={setPepName} pTitle={pTitle} pEpname={pEpname}/>
              <Description ep={ep.getDataInsideOneEpisode[0].episodes[0]} dada={ep.getDataInsideOneEpisode[0]} epCount={ep.epCount} load={load}/>
            </Grid>
            <AnimatePresence>
            {<motion.div className='godMarginBottom'ref={commentRef}
            variants={window.innerWidth < 764 && commentVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            >
              <div className='commentHeaderMb'>
               <Typography>Comment <span style={{color: "gray", marginLeft: "10px"}}>{commentCounts}</span></Typography>
               <CloseIcon onClick={handleCloseCommentBox} id="mbCloseReply"/>
              </div>
            <div>
            <div className='commentConc'>
              <div className='commentHeaderPc'>
               <Typography>Comment <span style={{color: "gray", marginLeft: "10px"}}>{commentCounts}</span></Typography>
               <CloseIcon onClick={handleCloseCommentBox} id="mbCloseReply"/>
              </div>
              <div className='addComment'>
                {<CommentPage commentRef={commentRef} pTitle={pTitle} pEpname={pEpname} setCommentCounts={setCommentCounts} commentCounts={commentCounts}/>}
              </div>
            </div>
            </div>
            </motion.div>}
            </AnimatePresence>
        </Container> : 
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

export default React.memo(Play)
