import React from 'react'

import ReactPlayer from 'react-player'
import { AnimeContext } from '../../Context'
import "./style.css"

function Video({ep, pEpname, isReady, setIsReady}) {

   const {history} = React.useContext(AnimeContext)
   const [spS, setSps] = React.useState(JSON.parse(localStorage.getItem("AmTime")) || [])
   const [duration, setDuration] = React.useState(0)
   const [played, setPlayed] = React.useState(0)
   const [gg, setGG] = React.useState(1)

   const sss = {...history[0], playSecond: played, totalSecond: duration}

React.useEffect(() => {
    if(history.length > 0) {
        setSps(pres => [sss, ...pres].filter((value, index, self) => 
        index === self.findIndex((t) => (
         t.name === value.name
        ))
         ).slice(0, 8))
         localStorage.setItem("AmTime", JSON.stringify(spS))
    }
 }, [played])
    

    React.useEffect(() => {
      setPlayed(0)
      setDuration(0)

    }, [pEpname])

    const playerRef = React.useRef();

    const onReady = React.useCallback(() => {
      if (!isReady) {
        const Amtime = JSON.parse(localStorage.getItem("AmTime"))
        const filterEp = Amtime.filter(info => info.ep === pEpname)
        const timeToStart = filterEp[0]?.playSecond

        playerRef.current.seekTo(timeToStart, "seconds");
        setIsReady(true);
      }
     
    }, [isReady]);
    console.log("video")
    return (
    <>
      <ReactPlayer 
      ref={playerRef}
      url={ep[0]?.videourl}
      controls
      playing={true}
      width="100%"
      height="100%"
      onProgress={(progress) => setPlayed(Math.floor(progress.playedSeconds))}
      onDuration={(dur) => setDuration(dur)}
      onReady={onReady}
      pip={true}
      />
    </>
    )
}

export default Video
