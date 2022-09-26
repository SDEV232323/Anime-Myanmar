import React from 'react'
import Header from './component/Header/Header'
import Home from './component/Home/Home'
import List from './component/List/List'
import { AnimeContext } from './Context'
import {Link, Routes, Route, useNavigate, useLocation, Navigate} from "react-router-dom"
import SamplePage from './component/Header/SamplePage'
import DetailPage from './component/DetailPage/DetailPage'
import Search from "./component/Search/Search"
import Play from './component/Play/Play'
import { CircularProgress } from '@mui/material'
import History from './component/MobilePage/History'
import WatchLater from './component/MobilePage/WatchLater'
import Cookies from 'universal-cookie';
import SignUp from './component/Account/SignUp'
import MainPage from './component/Account/MainPage'
import MyAccount from './component/Home/MyAccount'
import PageNotFound from './component/Home/PageNotFound'
import SharePage from './component/DetailPage/SharePage'
import DeletePage from './component/Home/DeletePage'
import EditPage from './component/Home/EditPage'

function App() {
  const cookies = new Cookies()

  const {setOpenSearchBox, openSearchBox, Mload, 
    openNav, setOpenNav, sign, setSign, userInfo, shareBox
    , url2Name, deleteAcc, commentOpenBox, openEdit} = React.useContext(AnimeContext)
  
  const handleSearchBox = () => {
    if(window.innerWidth > 764) {
      setOpenSearchBox(false)
    }
  }

React.useEffect(() => {
  if(openSearchBox) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}, [openSearchBox])

React.useEffect(() => {
  if(sign) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}, [sign])

React.useEffect(() => {
  if(shareBox) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}, [shareBox])

React.useEffect(() => {
  if(commentOpenBox) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
}, [commentOpenBox])

  return (
      <div style={{position: "relative"}}>
        <div className='mom' >
          {
          <>
          <Header />
          <SamplePage />
          </>}
          <Routes>
              <Route exact path='/' element={
                <>
                {Mload ? <div style={{position: "relative"}}>
                  {<>
                  <Home />
                  <List />
                  </>}
                </div> : 
                <div className='loads'>
                    <div>
                        <CircularProgress id="loadingHome"/>
                    </div>
                </div>}
                </>
              }/>
            <Route  path='/v1/album/:name' element={<div><DetailPage /></div>} />
            <Route  path='/v1/play/:title/:epname' element={<Play />} />
            <Route path='/v1/search' element={<Search />} />
            <Route path='v1/history' element={<History />} />
            <Route path='/v1/watchlater' element={<WatchLater />} />
            <Route path='/v1/myAccount' element={<>{userInfo ? <MyAccount /> : <PageNotFound />}</>} />
          </Routes>
          {openSearchBox && <div className='fullS' onClick={handleSearchBox}></div>}
          {openNav && <div className='MnavBar' onClick={() => setOpenNav(false)}></div>}
          {sign && <MainPage />}
          {shareBox && <SharePage pageLink={url2Name}/>}
          {deleteAcc && <DeletePage />}
          {openEdit && <EditPage />} 
        </div>
      </div>
  )
}

export default App

