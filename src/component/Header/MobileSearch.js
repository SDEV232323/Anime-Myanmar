import React from 'react'
import {Button, TextField, Typography} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'

function MobileSearch({searchHistory, openSearchBox, search, setCheckS, setSearchHistory, anime, setOpenSearchBox, handleEnter, handleSearch, handleClickSearch, setSearch}) {

    const navigate = useNavigate()

    
    return (
    <>
        {openSearchBox && 
        <div className='lan2'>
                <div className='flex'>
                    <div className='searchForM'>
                        <SearchIcon className='searchIcon'  onClick={handleClickSearch}/>
                        <input type="text" value={search} placeholder='Search' className='searchbox' onClick={() => setOpenSearchBox(true)} onKeyDown={handleEnter} onChange={handleSearch}/>
                    </div>
                    <div id="cancel">
                        <Typography onClick={() => (setOpenSearchBox(false), setSearch(""))} >Cancel</Typography>
                    </div>
                </div>
        {searchHistory.length > 0 && openSearchBox === true && search === ""
            &&
            <div style={{height: "calc(100vh - 80px)", overflow: "scroll", background: "black"}}>
            <div>
                <Typography style={{fontSize: "16px", color: "#969696", marginBottom: "10px", marginLeft: "20px"}}>Search History</Typography>
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
            <div style={{height: "calc(100vh - 80px)", overflow: "scroll"}}>
                {anime.filter((dada) => {
                if(dada.title.toLowerCase().includes(search.toLowerCase())) {
                return dada
                }
                }).map((info, index) => (
                <Typography key={info._id} className='historyList' 
                onClick={(e) => (navigate(`/v1/search?query=${info.title}`), setSearch(""), setOpenSearchBox(false), setCheckS(pres => !pres), setSearchHistory(pres => (searchHistory[0] === info.title ? searchHistory : [info.title, ...pres.filter(infos => infos != info.title)])))}>{info.title}</Typography>
                ))}
            </div>}
        </div>}
    </>
    )
}

export default MobileSearch
