import React, { useState } from 'react'
import axios from "axios"
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const AnimeContext = React.createContext()

function Context(props) {
    const url ="https://anime-myanmar-database-23.herokuapp.com/"
    const url2 = "https://anime-myanmar.vercel.app"
    const [anime, setAnime] = React.useState([])
    const [Mload, setMload] = React.useState(false)
    const [selected, setSelected] = React.useState([])
    const [openSearchBox, setOpenSearchBox] = React.useState(false)
    const [checkS, setCheckS] = React.useState(false)
    const [history, setHistory] = React.useState([])
    const [openNav, setOpenNav] = React.useState(false)
    const [sign, setSign] = React.useState(false)
    const [userAcc, setUserAcc] = React.useState(JSON.parse(localStorage.getItem("AmAc")) || [])
    const [changeProfile, setChangeProfile] = React.useState(false)
    const [Pload, setPLoad] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState()
    const [shareBox, setShareBox] = React.useState(false)
    const [url2Name, setUrl2Name] = React.useState(url2)
    const location = useLocation()
    const navigate = useNavigate()
    const [deleteAcc, setDeleteAcc] = React.useState(false)
    const [commentOpenBox, setCommentOpenBox] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)

    axios.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer 123456789`
        return req
    })

React.useEffect(() => {
  
 const fetchAnime = async () => {
try {
    setMload(false)
    const {data} = await axios.get(`${url}`)
    setAnime(data)
    setMload(true)
} catch (error) {
    console.log(error)
    setMload(false)
}
 }
 fetchAnime()
}, [])

React.useEffect(() => {
   const fetchUserData = async () => {
    try {
        setPLoad(false)
        const {data} = await axios.post(`${url}v1/userData`, {userAcc})
        setUserInfo(data)
        setPLoad(true)
     } catch (error) {
        console.log(error)
        setPLoad(false)
     }
   }

   if(userAcc.length !== 0) {
    fetchUserData()
   }
}, [changeProfile])

   
    //   React.useEffect(() => {
    //        localStorage.setItem("AmHistory", JSON.stringify(history))
    //        localStorage.setItem("AmTime", JSON.stringify(spS))
    //   }, [history])
    
    return (
        <div>
           <AnimeContext.Provider value={{anime, setSelected, selected, setOpenSearchBox, openSearchBox, Mload, checkS, 
            setCheckS, setHistory, history, openNav, setOpenNav, sign, setSign, url, 
            setChangeProfile, userInfo, Pload, setUserInfo, shareBox, setShareBox, url2Name, setUrl2Name, 
            url2, deleteAcc, setDeleteAcc, commentOpenBox, setCommentOpenBox, openEdit, setOpenEdit}}>
             {props.children}
           </AnimeContext.Provider>
        </div>
    )
}

export  {Context, AnimeContext}
