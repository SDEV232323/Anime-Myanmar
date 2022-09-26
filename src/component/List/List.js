import { Button, Grid, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { AnimeContext } from '../../Context'
import ListItem from './ListItem'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styleList.css"

import { Pagination, Navigation } from "swiper";
import Continue from './Continue'

function List() {
    const {anime, Mload, userInfo} = React.useContext(AnimeContext)
    const spS = JSON.parse(localStorage.getItem("AmTime"))
    const refs = React.useRef(null)
    
    // console.log(spS.slice(1, spS.length))

    let loginCard = [{login: "Login to save more watch history"}]

    let concatSps = loginCard.concat(spS)

    if(userInfo) {
      concatSps = spS
    }

   let num = 0

   let num1 = 0
   let space = 0
   
   if(window.innerWidth > 1800) {
     num = 6
   } else if(window.innerWidth > 1500) {
    num = 5
   } else if (window.innerWidth > 1200) {
    num = 4
  } else {
   num = 3
  }


   if(window.innerWidth > 1600) {
    num1 = 5
  } else if (window.innerWidth > 1200) {
    num1 = 5
  } else {
   num1 = 3
  }

   let num2 = 0

   if(window.innerWidth > 1800) {
    num2 = 5
    space = 5
   } else if(window.innerWidth > 1500) {
    num2 = 4
    space = 5
   } else if (window.innerWidth > 1000) {
    num2 = 3
    space = 3
   } 
    else {
    num2 = 2
    space = 0
   }

   const popularOnAnimeMyanmar = ["Naruto Shippuden", "Boruto-Naruto-Next-Generations", "A Silent Voice" ,"Attack on Titan Final Season", "Ao Haru Ride"]
    
   const trending = ["Attack on Titan Final Season", "Demon Slayer: Kimetsu no Yaiba", "Boruto-Naruto-Next-Generations" ,"Naruto Shippuden" ,"Attack on Titan"]
   
   const drama = ["A Silent Voice", "Ao Haru Ride", "Your Name", "Your Lie In April"]

   const action = ["Naruto Shippuden", "Boruto-Naruto-Next-Generations", "Demon Slayer: Kimetsu no Yaiba", "Dragon Ball Super", "Demon Slayer Mugen Train ", "Demon Slayer: Kimetsu no Yaiba Season 2"]

   const allAnimes = anime.map(data => data.title)
  
    return (
       <div className='listCon'>
        <div className='listMain'>
         <div>
          <div>
          <Typography variant='h6' gutterBottom id="popular">All Animes</Typography>
          <div style={{width: "100vw", position: "relative"}}>
           <div  className='container1'>
             <Swiper
              slidesPerView={num}
              spaceBetween={space}
              slidesPerGroup={num}
              navigation={{
                nextEl: '.next1',
                prevEl: '.prev1'
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"           
              id='swipCon'
             >
              {Mload && allAnimes.map((data, index) => {
                return (
              <SwiperSlide key={index} className="swiper_first" width={"270px"}
              onMouseEnter={() => document.getElementsByClassName("swiper_first")[index].style.zIndex = "100"}
              onMouseLeave={() => document.getElementsByClassName("swiper_first")[index].style.zIndex = "0"}
              >
               <ListItem datas={data} />
              </SwiperSlide>
             )})}
             </Swiper>
            </div>
            <div className='next1 swiper-button-next'></div>
            <div className='prev1 swiper-button-prev'></div>
          </div>
          </div>

          {spS &&
          <div className='distinctContinue' style={{background: "rgb(16, 18, 20)"}}>
          <Typography  variant='h6' gutterBottom id="continue_w">Continue Watching</Typography>
          <div style={{width: "100vw", background: "#101214", position: "relative"}}>
           <div id='con2' className='container2'>
             <Swiper
               ref={refs}
              slidesPerView={num2}
              spaceBetween={20}
              slidesPerGroup={num2}
              navigation={{
                nextEl: '.next',
                prevEl: '.prev'
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"           
             >
              {Mload && concatSps.length > 0
               && concatSps.map((data, index) => {
                return (
              <SwiperSlide key={index} className="swiper-slide" style={{width: "450px"}}>
               <Continue data={data}/>
              </SwiperSlide>
             )})}
             </Swiper>
            </div>
            <div className='next swiper-button-next'></div>
            <div className='prev swiper-button-prev'></div>
          </div>
          </div>}

          
          <div className='distinct' style={{background: "rgb(16, 18, 20)"}}>
          <Typography variant='h6' gutterBottom id="popular">Trending</Typography>
          <div style={{width: "100vw", position: "relative"}}>
           <div  className='container1'>
             <Swiper
              slidesPerView={num}
              spaceBetween={space}
              slidesPerGroup={num}
              navigation={{
                nextEl: '.next4',
                prevEl: '.prev4'
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"           
              id='swipCon'
             >
              {Mload && trending.map((data, index) => {
                return (
              <SwiperSlide key={index} className="swiper_first4" width={"270px"}
              onMouseEnter={() => document.getElementsByClassName("swiper_first4")[index].style.zIndex = "100"}
              onMouseLeave={() => document.getElementsByClassName("swiper_first4")[index].style.zIndex = "0"}
              >
               <ListItem datas={data} />
              </SwiperSlide>
             )})}
             </Swiper>
            </div>
            <div className='next4 swiper-button-next'></div>
            <div className='prev4 swiper-button-prev'></div>
          </div>
          </div>

          <div className='distinct' style={{background: "rgb(16, 18, 20)"}}>
            {/* <Typography variant='h6' gutterBottom id="continue_q">Quotes</Typography> */}
            <Paper elevation={3} id="quotesCard">
                <div className='imgQuotesConc'>
                 <img src='./demon_slayer_quotes.jpg' style={{width: "55%", height: "100%"}} playing={false}/>
                </div>
                <div className='quotes'>
                    <div>
                     <Typography id="quotesText">Those who <span className='quoteColor'>regretted</span> their own action. I would never <span  className='quoteColor'>trample</span> over them. Because <span  className='quoteColor'> demons were once human</span>, too. Just like me, they were <span className='quoteColor'>human</span>, too.</Typography>
                     <Typography id="quotesAutor">"Tanjiro Kamado"</Typography>
                     <Typography id="quotesAutor" style={{margin: "0px"}}>From Demon Slayer</Typography>
                    </div>
                 </div>
            </Paper>
            <Paper elevation={3} id="quotesCardForMb">
                <div className='imgQuotesConcForMb'>
                 <img src='./demon_slayer_quotes.jpg' style={{width: "100%", height: "100%"}} playing={false}/>
                </div>
                <div className='quotesForMb'>
                    <div>
                     <Typography id="quotesText">Those who <span className='quoteColor'>regretted</span> their own action. I would never <span  className='quoteColor'>trample</span> over them. Because <span  className='quoteColor'> demons were once human</span>, too. Just like me, they were <span className='quoteColor'>human</span>, too.</Typography>
                     <Typography id="quotesAutor">"Tanjiro Kamado"</Typography>
                     <Typography id="quotesAutor" style={{margin: "0px"}}>From Demon Slayer</Typography>
                    </div>
                 </div>
            </Paper>
          </div>

          <div className='distinct' style={{background: "rgb(16, 18, 20)"}}>
          <Typography variant='h6' gutterBottom id="popular">Popular on Anime Myanmar</Typography>
          <div style={{width: "100vw", position: "relative"}}>
           <div  className='container1'>
             <Swiper
              slidesPerView={num}
              spaceBetween={space}
              slidesPerGroup={num}
              navigation={{
                nextEl: '.next2',
                prevEl: '.prev2'
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"           
              id='swipCon'
             >
              {Mload && popularOnAnimeMyanmar.map((data, index) => {
                return (
              <SwiperSlide key={index} className="swiper_first2" width={"270px"}
              onMouseEnter={() => document.getElementsByClassName("swiper_first2")[index].style.zIndex = "100"}
              onMouseLeave={() => document.getElementsByClassName("swiper_first2")[index].style.zIndex = "0"}
              >
               <ListItem datas={data} />
              </SwiperSlide>
             )})}
             </Swiper>
            </div>
            <div className='next2 swiper-button-next'></div>
            <div className='prev2 swiper-button-prev'></div>
          </div>
          </div>

          <div className='distinct' style={{background: "rgb(16, 18, 20)"}}>
          <Typography variant='h6' gutterBottom id="popular">Anime Drama</Typography>
          <div style={{width: "100vw", position: "relative"}}>
           <div  className='container1'>
             <Swiper
              slidesPerView={num}
              spaceBetween={space}
              slidesPerGroup={num}
              navigation={{
                nextEl: '.next3',
                prevEl: '.prev3'
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"           
              id='swipCon'
             >
              {Mload && drama.map((data, index) => {
                return (
              <SwiperSlide key={index} className="swiper_first3" width={"270px"}
              onMouseEnter={() => document.getElementsByClassName("swiper_first3")[index].style.zIndex = "100"}
              onMouseLeave={() => document.getElementsByClassName("swiper_first3")[index].style.zIndex = "0"}
              >
               <ListItem datas={data} />
              </SwiperSlide>
             )})}
             </Swiper>
            </div>
            <div className='next3 swiper-button-next'></div>
            <div className='prev3 swiper-button-prev'></div>
          </div>
          </div>

          <div className='distinct' style={{background: "rgb(16, 18, 20)"}}>
            {/* <Typography variant='h6' gutterBottom id="continue_q">Quotes</Typography> */}
            <Paper elevation={3} id="quotesCard">
                <div className='imgQuotesConc'>
                 <img src='./mikasa.jpg' style={{width: "55%", height: "100%"}} playing={false}/>
                </div>
                <div className='quotes'>
                    <div>
                     <Typography id="quotesText">There are only so many <span className='quoteColor'>lives</span> I can value. And... I decided who those people were six years ago. So you shouldn't try to ask for my <span className='quoteColor'>pity</span>. Because right now, I don't have <span className='quoteColor'>time to spare or room in my heart.</span></Typography>
                     <Typography id="quotesAutor">"Mikasa Ackerman"</Typography>
                     <Typography id="quotesAutor" style={{margin: "0px"}}>From Attack on Titan</Typography>
                    </div>
                 </div>
            </Paper>
            <Paper elevation={3} id="quotesCardForMb">
                <div className='imgQuotesConcForMb'>
                 <img src='./mikasa.jpg' style={{width: "100%", height: "100%"}} playing={false}/>
                </div>
                <div className='quotesForMb'>
                   <div>
                     <Typography id="quotesText">There are only so many <span className='quoteColor'>lives</span> I can value. And... I decided who those people were six years ago. So you shouldn't try to ask for my <span className='quoteColor'>pity</span>. Because right now, I don't have <span className='quoteColor'>time to spare or room in my heart.</span></Typography>
                     <Typography id="quotesAutor">"Mikasa Ackerman"</Typography>
                     <Typography id="quotesAutor" style={{margin: "0px"}}>From Attack on Titan</Typography>
                    </div>
                 </div>
            </Paper>
          </div>

          <div className='distinct' style={{background: "rgb(16, 18, 20)"}}>
          <Typography variant='h6' gutterBottom id="popular">Action Animes</Typography>
          <div style={{width: "100vw", position: "relative"}}>
           <div  className='container1'>
             <Swiper
              slidesPerView={num}
              spaceBetween={space}
              slidesPerGroup={num}
              navigation={{
                nextEl: '.next5',
                prevEl: '.prev5'
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"           
              id='swipCon'
             >
              {Mload && action.map((data, index) => {
                return (
              <SwiperSlide key={index} className="swiper_first5" width={"270px"}
              onMouseEnter={() => document.getElementsByClassName("swiper_first5")[index].style.zIndex = "100"}
              onMouseLeave={() => document.getElementsByClassName("swiper_first5")[index].style.zIndex = "0"}
              >
               <ListItem datas={data} />
              </SwiperSlide>
             )})}
             </Swiper>
            </div>
            <div className='next5 swiper-button-next'></div>
            <div className='prev5 swiper-button-prev'></div>
          </div>
          </div>

         </div>
        </div>
       </div>
    )
}

export default List

