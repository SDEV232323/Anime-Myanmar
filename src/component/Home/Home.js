import { Button, Stack, Typography, Grid } from '@mui/material'
import React from 'react'
import { AnimeContext } from '../../Context'
import StarIcon from '@mui/icons-material/Star';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ShareIcon from '@mui/icons-material/Share';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import {Paper} from "@mui/material"
import {useLocation, useNavigate} from "react-router-dom"
import { styled } from '@mui/material/styles';
import {motion} from "framer-motion"
import "./style.css"

function Home() {

    const {anime, shareBox, setShareBox, setUrl2Name, url2} = React.useContext(AnimeContext)
    SwiperCore.use([Autoplay])
    
    const navigate = useNavigate()
    const location = useLocation()

    React.useEffect(() => {
        localStorage.setItem("AmRoute", JSON.stringify(location.pathname))
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "rgba(256, 256, 256, 0.1)",
        ...theme.typography.body2,
        padding: "5px",
        textAlign: 'center',
        color: "white",
        fontSize: "13px",
        minWidth: "70px",
        maxHeight: "15px",
        overflow: "auto"
      }));

   
    return (
        <div className='containForSwiper'>
         {/* <Carousel thumbWidth={0} showThumbs={false} showStatus={false} showIndicators={false} interval={10000} autoPlay infiniteLoop stopOnHover={false}> */}
         <Swiper pagination={{clickable: true}} navigation={true} autoplay={{delay: 5000}}  modules={[Pagination, Navigation]} loop={true}  >
         {anime && anime.slice(anime.length - 6).map(data => (
            <SwiperSlide key={data._id}>
                        <div className='imgCon' onClick={() => {if(window.innerWidth < 764) { navigate(`/v1/album/${data._id}`) }}}>
                        <img src={data.coverpicture} style={{width: "100%", height: "100%"}} />
                        <div className='info'>
                            <div className='info-child'>
                                <div className='child'>
                                <div className='letPic'>
                                 <motion.img 
                                 initial={{opacity: 0, y: 30}}
                                 whileInView={{opacity: 1, y: 0, transition: {duration: 0.5}}}
                                 src={data.letterPic} className="hundred"/>
                                </div>
                                <motion.div className='flex'
                                 initial={{opacity: 0, y: 30}}
                                 whileInView={{opacity: 1, y: 0, transition: {duration: 0.5}}}                                
                                >
                                <div className='flex marginT'>
                                    <StarIcon id="star"/>
                                    <Typography style={{color: "gold"}} id="mobile_font">{data.rating}</Typography>
                                </div>
                                <div className='flex marginT margin1'>
                                  <Typography id='mobile_font'>{data.date}</Typography>
                                </div>
                                <div className='flex marginT margin1'>
                                  <Typography id='mobile_font'>{data.episodes[0]} Episodes</Typography>
                                </div>
                                </motion.div>
                                <motion.div className='marginT'
                                 initial={{opacity: 0, y: 30}}
                                 whileInView={{opacity: 1, y: 0, transition: {duration: 0.5}}}                                
                                >
                                <Grid container direction="row" spacing={1} id="pc_open">
                                 {data.type.split(",").map((gen, index) => (
                                        <Grid key={index} Item style={{margin: "10px 10px 10px 0px"}}>
                                            <Item>{gen}</Item>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid container direction="row" spacing={1} id="mobile_open">
                                 {data.type.split(",").slice(0,3).map((gen, index) => (
                                        <Grid key={index} Item style={{margin: "10px 10px 10px 0px"}}>
                                            <Item>{gen}</Item>
                                        </Grid>
                                    ))}
                                </Grid>
                                </motion.div>
                                <motion.div className='marginT mobile_remove'
                                 initial={{opacity: 0, y: 30}}
                                 whileInView={{opacity: 1, y: 0, transition: {duration: 0.5}}}                                
                                >
                                    <Typography style={{textAlign: "start"}}>{data.description.split(" ").slice(0, 30).join(" ")}...</Typography>
                                </motion.div>
                                <motion.div className='flex mobile_remove'
                                 initial={{opacity: 0, y: 30}}
                                 whileInView={{opacity: 1, y: 0, transition: {duration: 0.5}}}                                
                                >
                                <div>
                                    <PlayCircleIcon id="playbut" onClick={() => navigate(`/v1/album/${data._id}`)}/>
                                </div>
                                <div>
                                    <div onClick={() => (setUrl2Name(`${url2}/v1/album/${data._id}`), setShareBox(true))} 
                                    className='sharebut'><div className='share'><ShareIcon style={{fontSize: "30px", "color": "black"}}/></div></div>
                                </div>
                                </motion.div>
                            </div>
                            </div>
                            <div className='blur'></div>
                        </div>
                    </div>
                </SwiperSlide>
          ))}
         {/* </Carousel> */}
         </Swiper>
        </div>
    )
}

export default Home
