import { TextField, Avatar, Button, Typography, IconButton, CircularProgress } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import React from 'react'
import { AnimeContext } from '../../Context';
import ReplyComment from './ReplyComment';
import {v4 as uuid} from "uuid"
import { formatDistance } from "date-fns"
import axios from 'axios';

function IndividualComment({coms, setComm, comm, pTitle, pEpname, socket}) {
  const {userInfo, setSign, url, commentOpenBox, setCommentOpenBox} = React.useContext(AnimeContext)
    
    const [likeCom, setLikeCom] = React.useState(userInfo ? coms.like.includes(userInfo.id) : false)
    const [likeCount, setLikeCount] = React.useState(coms.like.length)
    const [dislikeCom, setDislikeCom] = React.useState(userInfo ? coms.dislike.includes(userInfo.id) : false)
    const [likeArray, setLikeArray] = React.useState(userInfo ? coms.like.filter(item => item === userInfo.id) : []) 
    const [dislikeArray, setDislikeArray] = React.useState(userInfo ? coms.dislike.filter(item => item === userInfo.id) : [])
    const [replyBox, setReplyBox] = React.useState(false)
    const [click, setClick] = React.useState(false)
    const [replyCom, setReplyCom] = React.useState("")
    const replyRef = React.useRef(null)
    const [ownCom, setOwnCom] = React.useState([])
    const [fetchReply, setFetchReply] = React.useState(false)
    const [noReply, setNoReply] = React.useState(false)
    const [showReply, setShowReply] = React.useState(false)
    const [skipReply, setSkipReply] = React.useState(0)
    const [replyCount, setReplyCount] = React.useState(0)

    React.useEffect(() => {
      setLikeCom(userInfo ? coms.like.includes(userInfo.id) : false)
      setLikeCount(coms.like.length)
      setLikeArray(userInfo ? coms.like.filter(item => item === userInfo.id) : [])
      setDislikeArray(userInfo ? coms.dislike.filter(item => item === userInfo.id) : [])
      setOwnCom([])
    }, [coms])
    

    const handleLikeCom = async () => {
        if(userInfo) {
          setLikeCom(pres => !pres)
          if(likeArray.includes(userInfo.id)) {
             const filterLike = likeArray.filter(info => info !== userInfo.id)
             setLikeArray(filterLike)
             
             const likes = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/comments/like`, {commentId: coms._id, userId: userInfo.id})
             
             setLikeCount(pres => pres - 1)
             
          } else {
            const filterDisLike = dislikeArray.filter(info => info !== userInfo.id)
             setDislikeArray(filterDisLike)
                         
              setLikeArray(pres => [...pres, userInfo.id])
              const pushDada = [...likeArray, userInfo.id]

            const dislike = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/comments/like`, {commentId: coms._id, userId: userInfo.id})
   
            setLikeCount(pres => pres + 1)
            
          }
          setDislikeCom(false)
        } else {
          setSign(true)
        }
      }
  
      const handleDislikeCom = async () => {
         if(userInfo) {
          setDislikeCom(pres => !pres)
  
          if(dislikeArray.includes(userInfo.id)) {
            const filterdisLike = dislikeArray.filter(ad => ad !== userInfo.id)
            setDislikeArray(filterdisLike)

            const dislike = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/comments/dislike`, {commentId: coms._id, userId: userInfo.id})
            
          } else {
            const filterLike = likeArray.filter(info => info !== userInfo.id)
            setLikeArray(filterLike)
          
            setDislikeArray(pres => [...pres, userInfo.id])
            const pushData = [...dislikeArray, userInfo.id]

          const likes = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/comments/dislike`, {commentId: coms._id, userId: userInfo.id})
          
          }
         
          if(likeCount > 0 && likeArray.includes(userInfo.id)) {
            setLikeCount(pres => pres - 1)
          }
          setLikeCom(false)

         } else {
          setSign(true)
         }
      }

      React.useEffect(() => {
        const fetchReply = async () => {
          try {
            setFetchReply(false)
            const {data} = await axios.post(`${url}v1/play/${pTitle}/${pEpname}/replys`, {skip: skipReply, reply: true, parentId: coms._id})
            setOwnCom(data.comFromDataBase)
            console.log("GET REQUEST")
            setTimeout(() => {
              setFetchReply(true)
            }, 400)
            setReplyCount(data.comFromDataBase.length)
          } catch (error) {
            console.log()
            if(error.response.status === 404) {
              setFetchReply(true)
            return  setNoReply(true)
            }
            setFetchReply(false)
          }
        }
        if(commentOpenBox) {
          fetchReply()
        } else if (window.innerWidth > 764) {
          fetchReply()
        }
      }, [showReply, coms])
     
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

      const handleReply = () => {
        if(userInfo) {
          setReplyBox(true)
        } else {
          setSign(true)
        }
      }


      const handleAddReply = async (e) => {
         if(userInfo)  {
            const jojo = await axios.post(`${url}v1/play/${pTitle}/${pEpname}/createComment`, {userId: userInfo.id, name: userInfo.name, parentId: coms._id,
              comment: replyCom, like: [], dislike: [], time: Date.now(), reply: true, epname: pEpname})
           setOwnCom(pres => ([jojo.data, ...pres]))
           setReplyCount(pres => pres + 1)
          setReplyCom("")
          setReplyBox(false)
         } else {
          setSign(true)
         }
      }

      React.useEffect(() => {
        if(replyRef.current) {
            replyRef.current.focus()
        }
      }, [replyBox])

      // React.useEffect(() => {
      //   socket.current.emit("joinRoom2", {room: pEpname})
      //   socket.current.on("updateLikeData", (data) => {
      //    console.log(data)

      //   })
      // }, [])
   
    return (
      <div className='allCommContainer'>
        <div className='flex'>
         <div className='avatar3 notranslate'><Avatar style={{width: "45px", height: "45px", fontSize: "19px"}}   {...stringAvatar(`${coms.name}`)} /></div>
          <div style={{display: "block", width: "100%"}}>
              <div style={{display: "flex", alignItems: "center"}}>
                  <Typography id="comUserName">{coms.name}</Typography>
                  <Typography id="comDate">{`${formatDistance(new Date(), Date.parse(coms.time))} ago`}</Typography>
              </div>
              <Typography id="userCom">{coms.comment}</Typography>
              <div className='flex flexAlignCom'>
                  <div style={{display: "flex", alignItems: "center"}}>
                   {!likeCom ? <IconButton onClick={handleLikeCom} style={{padding: "0px"}}><ThumbUpOffAltIcon id="comThumbup"/></IconButton>
                    : <IconButton onClick={handleLikeCom} style={{padding: "0px"}}><ThumbUpIcon id="comThumbup"/></IconButton>}
                   <Typography style={{fontSize: "13px", marginLeft: "7px", marginTop: "6px", color: "#aaa"}}>{likeCount}</Typography>
                  </div>
                   <div style={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
                    {!dislikeCom ? <IconButton onClick={handleDislikeCom} style={{padding: "0px"}}><ThumbDownOffAltIcon id="comThumbup"/></IconButton> 
                     : <IconButton onClick={handleDislikeCom} style={{padding: "0px"}}><ThumbDownAltIcon id="comThumbup"/></IconButton> }
                    {/* <Typography style={{fontSize: "14px", marginLeft: "7px", marginTop: "6px"}}>327</Typography> */}
                   </div>
                   <div style={{marginLeft: "15px"}}>
                      <Typography id="replayCom" onClick={handleReply}>REPLAY</Typography>
                   </div>
              </div>
              {replyBox && 
              <div className='addReplyKid' >
                <div className='avatar9 notranslate '><Avatar style={{width: "30px", height: "30px", fontSize: "16px"}}   {...stringAvatar(`${userInfo.name}`)} /></div>
                <div className='replyBox'>
                        <TextField autoComplete='off' inputRef={replyRef} value={replyCom} onChange={(e) => setReplyCom(e.target.value)} onClick={() => setClick(true)} sx={{ input: {color: 'white'}}} fullWidth id="standard-basic" placeholder='Add a reply' variant="standard" />
                        <div className='comCon'>
                            <Button onClick={() => (setReplyBox(false), setReplyCom(""))} id="cancelComment">Cancel</Button>
                            <Button disabled={replyCom.length > 0 ? false : true} onClick={handleAddReply} id="comment">Reply</Button>
                        </div>
                </div>                
              </div>}
            {fetchReply && 
              <div>
              {ownCom.length > 0
             &&
              <div className='viewMoreReply' style={{marginBottom: showReply ? "0px" : "-15px"}} onClick={() => setShowReply(pres => !pres)}>
                {!showReply ? 
                <>
                 <ArrowDropDownIcon style={{fontSize: "30px"}}/>
                 <Typography style={{fontSize: "15px", fontWeight: "600"}}>{`View ${replyCount} replies`}</Typography>
                </> :
                <>
                 <ArrowDropUpIcon style={{fontSize: "30px"}}/>
                 <Typography style={{fontSize: "15px", fontWeight: "600"}}>{`Hide ${replyCount} replies`}</Typography>
                </>  
                }
             </div>}
            </div>}
            {fetchReply ?
            <div>
              {ownCom.length > 0 &&
              <div style={{userSelect: "none", marginBottom: showReply ? "-23px" : "5px"}}>
                {showReply && ownCom.map((replys, index) => <ReplyComment key={replys._id}  setOwnCom={setOwnCom} pTitle={pTitle} pEpname={pEpname} setReplyCount={setReplyCount} comm={comm} setComm={setComm} replys={replys} coms={coms}/>)}
              </div>
              }
            </div> :
            <>
            {showReply && 
            <div className='load2' style={{marginTop: "5px"}}>
              <div>
                  <CircularProgress style={{width: "30px", height: "30px"}}/>
              </div>
            </div>}  
            </>
              }
          </div>
        </div>
      </div>
    )
}

export default React.memo(IndividualComment)
