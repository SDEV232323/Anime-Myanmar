import { Typography, Avatar, IconButton, TextField, Button } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import React from 'react'
import { AnimeContext } from '../../Context';
import {v4 as uuid} from "uuid"
import {formatDistance} from "date-fns"
import axios from 'axios';

function ReplyComment({replys, setComm, coms, pTitle, pEpname, setReplyCount, setOwnCom}) {

     const {userInfo, setSign, url} = React.useContext(AnimeContext)
    const [likeReply, setLikeReply] = React.useState(userInfo ? replys.like.includes(userInfo.id) : false)
    const [dislikeReply, setDislikeReply] = React.useState(userInfo ? replys.dislike.includes(userInfo.id) : false)
    const [likeReplyArray, setLikeReplyArray] = React.useState(userInfo ? replys.like.filter(item => item === userInfo.id) : [])
    const [dislikeArray, setDislikeArray] = React.useState(userInfo ? replys.dislike.filter(item => item === userInfo.id): [])
    const [replyLikeCount, setReplyLikeCount] = React.useState(replys.like.length) 

    const [replyBox, setReplyBox] = React.useState(false)
    const replyRef = React.useRef(null)
    const [replyCom, setReplyCom] = React.useState(`@${replys.name} `)
    const [click, setClick] = React.useState(false)
    
    const handleLikeReply = async () => {
      if(userInfo) {
        setLikeReply(pres => !pres)
        if(likeReplyArray.includes(userInfo.id)) {
           const filterLike = likeReplyArray.filter(info => info !== userInfo.id)
           setLikeReplyArray(filterLike)
           
           const likes = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/replys/like`, {parentId: replys.parentId, unqId: replys._id, userId: userInfo.id})
           setReplyLikeCount(pres => pres - 1) 
   
        } else {
          const filterDisLike = dislikeArray.filter(info => info !== userInfo.id)
           setDislikeArray(filterDisLike)
           
            setLikeReplyArray(pres => [...pres, userInfo.id])
            const pushDada = [...likeReplyArray, userInfo.id]
         
           
          const dislike = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/replys/like`, {parentId: replys.parentId, unqId: replys._id, userId: userInfo.id})
          setReplyLikeCount(pres => pres + 1)
        }
        setDislikeReply(false)
       
      } else {
        setSign(true)
      }
      }
  
      const handleDislikeReply = async () => {
        if(userInfo) {
          setDislikeReply(pres => !pres)
  
          if(dislikeArray.includes(userInfo.id)) {
            const filterdisLike = dislikeArray.filter(ad => ad !== userInfo.id)
            setDislikeArray(filterdisLike)
  
            const dislike = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/replys/dislike`, {parentId: replys.parentId, unqId: replys._id, userId: userInfo.id})
            
          } else {
            const filterLike = likeReplyArray.filter(info => info !== userInfo.id)
            setLikeReplyArray(filterLike)

            setDislikeArray(pres => [...pres, userInfo.id])
            const pushData = [...dislikeArray, userInfo.id]
    
          const likes = await axios.patch(`${url}v1/play/${pTitle}/${pEpname}/replys/dislike`, {parentId: replys.parentId, unqId: replys._id, userId: userInfo.id})
            if(replyLikeCount > 0) {
              setReplyLikeCount(pres => pres - 1)
            }
          }
  
          setLikeReply(false)
         } else {
          setSign(true)
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

      const handleReply = () => {
        if(userInfo) {
          setReplyBox(true)
        } else {
          setSign(true)
        }
     }

     const handleAddReply = async () => {
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
    
    const ChangeColorForMentionUser = () => {
      const array = []
      const splitComment = replys.comment.split(" ")
      const findAtag = splitComment.findIndex(obj => obj.includes("@"))
      const removeAtag = splitComment.filter(obj => !obj.includes("@"))
      if(findAtag >= 0) {
        array.push(<Typography id="userCom">
          <span style={{color: "#3ea6ff"}}>{splitComment[findAtag]}</span>&nbsp;
          <span>{removeAtag.join(" ")}</span>
         </Typography>)
      } else {
        array.push(<Typography id="userCom">{replys.comment}</Typography>)
      }
      return array
    }

    console.log("hi")
    return (
        <div className='flexFromReplyCom' >
         <div className='avatar3 notranslate'><Avatar id="replyAvatar"   {...stringAvatar(`${replys.name}`)} /></div>
          <div style={{display: "block", width: "100%"}}>
              <div style={{display: "flex", alignItems: "center"}}>
                  <Typography id="comUserName">{replys.name}</Typography>
                  <Typography id="comDate">{`${formatDistance(new Date(), Date.parse(replys.time))} ago`}</Typography>
              </div>
              {ChangeColorForMentionUser()}
              <div className='flex flexAlignCom'>
                  <div style={{display: "flex", alignItems: "center"}}>
                   {!likeReply ? <IconButton onClick={handleLikeReply} style={{padding: "0px"}}><ThumbUpOffAltIcon id="comThumbup"/></IconButton>
                    : <IconButton onClick={handleLikeReply} style={{padding: "0px"}}><ThumbUpIcon id="comThumbup"/></IconButton>}
                   <Typography style={{fontSize: "13px", marginLeft: "7px", marginTop: "6px", color: "#aaa"}}>{replyLikeCount}</Typography>
                  </div>
                   <div style={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
                    {!dislikeReply ? <IconButton onClick={handleDislikeReply} style={{padding: "0px"}}><ThumbDownOffAltIcon id="comThumbup"/></IconButton> 
                     : <IconButton onClick={handleDislikeReply} style={{padding: "0px"}}><ThumbDownAltIcon id="comThumbup"/></IconButton> }
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
                            <Button onClick={() => (setReplyBox(false), setReplyCom(`@${replys.name} `))} id="cancelComment">Cancel</Button>
                            <Button disabled={replyCom.length > 0 ? false : true} onClick={handleAddReply} id="comment">Reply</Button>
                        </div>
                </div>                
            </div>}
         </div>
        </div>
    )
}

export default React.memo(ReplyComment)
