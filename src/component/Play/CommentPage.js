import { TextField, Avatar, Button, Typography, IconButton, CircularProgress } from '@mui/material'
import React from 'react'
import { AnimeContext } from '../../Context'
import IndividualComment from './IndividualComment';
import {v4 as uuid} from "uuid"
import axios from 'axios';
import { io } from "socket.io-client"

function CommentPage({pTitle, pEpname, setCommentCounts, commentCounts, commentRef}) {

    const {userInfo, url, setSign, commentOpenBox} = React.useContext(AnimeContext)
    const [click, setClick] = React.useState(false)
    const [comment, setComment] = React.useState("")
    const [errorNoComment, setErrorNoComment] = React.useState(false)
    const socket = React.useRef()

    const handleComment = (e) => {
       setComment(e.target.value)
    }
      const [fetchMore, setFetchMore] = React.useState(false)
      const [comm, setComm] = React.useState([])
      const [fetchCom, setFetchCom] = React.useState(false)
      const [skips, setSkips] = React.useState(0)
      const [socketComm, setSocketComm] = React.useState([])
      const [handleScrollEvent, setHandleScrollEvent] = React.useState(false)
      const [divHeight, setDivHeight] = React.useState(0)
      const [condition, setCondition] = React.useState(false)
      const [scrolled, setScrolled] = React.useState(true)

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

      React.useEffect(() => {
        const fetchComments = async () => {
          try {
            setFetchCom(false)
            const {data} = await axios.post(`${url}v1/play/${pTitle}/${pEpname}/comments`, {skip: skips, reply: false})
            setComm(data.comFromDataBase)
            setCommentCounts(data.totalComment)
            setSocketComm(data.comFromDataBase)
            console.log("fetch Again")
            setSkips(0)
            const scollDiv = document.getElementsByClassName("scrollEventControllerDiv")[0]
            scollDiv.scrollTop = 0
            setFetchCom(true)
            setErrorNoComment(false)
          } catch (error) {
            console.log(error)
            if(error.response.status === 404) {
              setFetchCom(true)
            return  setErrorNoComment(true)
            }
            setFetchCom(false)
          }
        }
        if(commentOpenBox) {
          fetchComments()
        } 
        if(!commentOpenBox) {
          setFetchCom(false)
          setSkips(0)
        } 
        if(window.innerWidth > 764) {
          fetchComments()
        }
      }, [commentOpenBox])

        const fetchCommentByScroll = async (skip) => {
          try {
              setFetchMore(false)
              const {data} = await axios.post(`${url}v1/play/${pTitle}/${pEpname}/comments`, {skip: skip, reply: false})
              setComm([...comm, ...data.comFromDataBase])
              setCommentCounts(data.totalComment)
              setSocketComm(pres => ([...pres, ...data.comFromDataBase]))
              console.log("fetch Again skips")
              setTimeout(() => {
                setFetchMore(true)
              }, 2000)
          } catch (error) {
            console.log(error)
            if(error.response.status === 404) {
              setFetchMore(true)
            return  setErrorNoComment(true)
            }
            setFetchMore(false)
          }
        }

      // React.useEffect(() => {
      //   const addCommentToDataBase = async () => {
      //     try {
      //       const {data} = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/comments/addComment`, comm)
      //      console.log("PATCH REQUEST")
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
      //   if(fetchCom) {
      //     addCommentToDataBase()
      //   }
      // }, [comm])

      const handleAddComment = async () => { 
        try {
          if(userInfo) {
            const dojo = await axios.post(`${url}v1/play/${pTitle}/${pEpname}/createComment`, {userId: userInfo.id ,name: userInfo.name, comment: comment, like: [], dislike: [], time: Date.now(), epname: pEpname})
            setComm(pres => ([dojo.data, ...pres]))
            setComment("")
            setErrorNoComment(false)
            socket.current.emit("addComment", {message: dojo.data, room: pEpname})
            setCommentCounts(pres => pres + 1)
          } else {
             setSign(true)
          }
        } catch (error) {
          console.log(error)
        }
      }
      var timeout;

      const handleScroll = (e) => {
        setHandleScrollEvent(true)
        const {offsetHeight, scrollTop, scrollHeight} = e.target
        clearTimeout(timeout)
        if(fetchCom) {
            if(offsetHeight + (scrollTop + 1) >= scrollHeight) {
             if(commentCounts > (skips + 5)) { 
              console.log(scrolled) 
              if(scrolled) {
                setScrolled(false)
                timeout = setTimeout(() => {
                  console.log("scrll event")
                  setSkips(pres => pres + 5)
                      fetchCommentByScroll(skips + 5)
                 }, 50) 
                 setTimeout(() => setScrolled(true), 500)    
               }     
             }
            }
        }
      }
  
      // React.useEffect(() => {
      //   if(window.innerWidth > 764) {
      //     if(!condition) {
      //       setCondition(true)
      //     }
      //   } else {
      //     if(!condition) {
      //       const getScrollDiv = document.getElementsByClassName("scrollEventControllerDiv")[0]
      //       if(getScrollDiv.clientHeight > 0) {
      //         setDivHeight(getScrollDiv.clientHeight - 2)
      //         setCondition(true)
      //       }
      //      }
      //   }
      // })



React.useEffect(() => {
  socket.current = io("https://anime-myanmar-socket.herokuapp.com/")
  socket.current.emit("joinRoom", {room: pEpname})
  socket.current.on("comment", (comms) => {
    console.log('comment', socketComm)
    setSocketComm(pres => ([comms, ...pres]))
  })
  console.log("running")
  setSkips(0)
}, [])

    
    return (
    <div className='scrollEventControllerDiv' style={{height: window.innerWidth > 764 ? "400px" : "calc( 100vh - ( 60vw + 138px ) )"}} onScroll={handleScroll}>
      {userInfo 
      && 
      <div className='addCommentKid' >
        <div className='avatar3 notranslate'><Avatar id="comAvatar" {...stringAvatar(`${userInfo.name}`)} /></div>
        <div className='commentBox'>
          <TextField autoComplete='off' value={comment} onChange={handleComment} onClick={() => setClick(true)} sx={{ input: {color: 'white'}}} fullWidth id="standard-basic" label="Add a comment" variant="standard" />
          {click ?
          <div className='comCon'>
            <Button onClick={() => (setClick(false), setComment(""))} id="cancelComment">Cancel</Button>
            <Button disabled={comment.length > 0 ? false : true} onClick={handleAddComment} id="comment">Comment</Button>
          </div> : 
          <div style={{height: "41px"}}></div>
          }
        </div>
      </div>}
      {fetchCom ?
      <div  className='individualCommentContainer'>
       {!errorNoComment ? 
       <div >
        {socketComm.filter(item => socketComm.indexOf(item._id) !== item._id).map((coms, index) => <IndividualComment commentRef={commentRef}  socket={socket} setSkips={setSkips} key={index} pTitle={pTitle} pEpname={pEpname}
        coms={coms} setComm={setComm} comm={comm}/>)}
        <div>
          {!fetchMore  && socketComm.length < commentCounts && handleScrollEvent
          ?
          <div style={{textAlign: "center", margin: "20px 0px 0px 0px"}}>
           <CircularProgress style={{width: "30px", height: "30px"}}/>  
          </div> : null}
        </div>
       </div> : 
       <div style={{textAlign: "center", marginTop: "20px"}}>
        <Typography>No Comment</Typography>
       </div>
       }
      </div> :
            <div className='load2'>
                <div>
                    <CircularProgress style={{width: "40px", height: "40px"}}/>
                </div>
            </div>
      }
    </div>
    )
}

export default React.memo(CommentPage)
