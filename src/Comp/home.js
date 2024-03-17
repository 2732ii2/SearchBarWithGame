import React from 'react'

export default function Home() {
  return (
    <div style={{width:"100%",background:"black",height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center'}}>
        
        <div style={{width:"40vh",height:"300px"}}>
        <div style={{fontSize:"2vw",color:"white",display:"flex",justifyContent:"space-between"}}><div style={{width:"8vw",textAlign:"start"}}>Game</div>  <div>:</div> <a href='/game' style={{textDecoration:"none",color:"blue",fontWeight:300}}>Click me</a> </div>
        <div style={{fontSize:"2vw",color:"white",display:"flex",justifyContent:"space-between"}}><div style={{width:"8vw",textAlign:"start"}}>SearchBar </div> <div>:</div>  <a style={{textDecoration:"none",color:"blue",fontWeight:300}} href='/search'>Click me</a> </div>
        </div>
    </div>
  )
}
