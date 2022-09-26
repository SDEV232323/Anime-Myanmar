import { Grid, Paper, Typography, IconButton } from '@mui/material'
import React from 'react'
import { AnimeContext } from '../../Context'
import CloseIcon from '@mui/icons-material/Close';
import {TwitterShareButton, FacebookShareButton, RedditShareButton, WhatsappShareButton
, FacebookMessengerShareButton, TelegramShareButton, ViberShareButton, LineShareButton} from "react-share"
import {TwitterIcon, FacebookIcon, RedditIcon, WhatsappIcon, FacebookMessengerIcon, TelegramIcon, ViberIcon, LineIcon} from "react-share"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useLocation } from 'react-router-dom'
import {motion} from "framer-motion"

function SharePage({pageLink}) {

    const {setShareBox, url} = React.useContext(AnimeContext)
    const location = useLocation()


    const link = pageLink

    return (
        <div className='signMain' >
            <div className='signConc'>
              <Paper elevation={3} id="sharePaper">
                <div className='insideShare'>
                  <div className='shareHeader'>
                    <Typography style={{fontWeight: "bold", fontSize: "19px"}}>Share</Typography>
                    <div><CloseIcon onClick={() => setShareBox(false)} style={{cursor: "pointer", userSelect: "none"}}/></div>
                  </div>
                  <div className='shareIconConc'>
                    <Grid container spacing={5}>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <FacebookShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <FacebookIcon size={45} round={true} />
                         </FacebookShareButton>
                         <Typography style={{fontSize: "13px"}}>Facebook</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <TwitterShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <TwitterIcon size={45} round={true} />
                         </TwitterShareButton>
                         <Typography style={{fontSize: "13px"}}>Twitter</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <RedditShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <RedditIcon size={45} round={true} />
                         </RedditShareButton>
                         <Typography style={{fontSize: "13px"}}>Reddit</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <TelegramShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <TelegramIcon size={45} round={true} />
                         </TelegramShareButton>
                         <Typography style={{fontSize: "13px"}}>Telegram</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <ViberShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <ViberIcon size={45} round={true} />
                         </ViberShareButton>
                         <Typography style={{fontSize: "13px"}}>Viber</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <FacebookMessengerShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <FacebookMessengerIcon size={45} round={true} />
                         </FacebookMessengerShareButton>
                         <Typography style={{fontSize: "13px"}}>Messenger</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <LineShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <LineIcon size={45} round={true} />
                         </LineShareButton>
                         <Typography style={{fontSize: "13px"}}>Line</Typography>
                         </div>
                       </Grid>
                       <Grid item>
                         <div style={{textAlign: "center"}}>
                         <WhatsappShareButton
                          url={link}
                          quote={"Let watch Naruto at Anime Myanmar Website."}
                          hashtag={"#AnimeMyanmar"}
                         >
                            <WhatsappIcon size={45} round={true} />
                         </WhatsappShareButton>
                         <Typography style={{fontSize: "13px"}}>Whatapp</Typography>
                         </div>
                       </Grid>
                     </Grid>
                  </div>
                  <div className='pageLink'>
                    <Typography style={{fontWeight: "600", fontSize: "15px"}}>Page Link</Typography>
                    <div className='linkCopy'>
                       <div className='linkKid'>
                         <Typography id="linkText">{link}</Typography>
                         <Tooltip 
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 300 }}
                            title="Copy"
                         >
                            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.8}}  onClick={() => {navigator.clipboard.writeText(link)}}>
                                <IconButton style={{marginLeft: "8px", color: "black"}}>
                                    <ContentCopyIcon />
                                </IconButton>
                            </motion.div>
                         </Tooltip>
                       </div>
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
        </div>
    )
}

export default SharePage
