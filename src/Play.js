import React,{ useState } from 'react'
import "./Play.css"

function Play({playState}) {
    const [ close , setClose ] = useState(false);
    return (
        <div className='player' style={playState && close?{display:"none"}: {display:"block"}}>
            <button onClick={()=>{setClose(true)}}>X</button>
            
        </div>
    )
}
 
export default Play
