import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Data from "./obj";
export default function Game() {
   const [Arr,setArr]= useState([...Object.keys(Data),...Object.values(Data)]);
   console.log(Arr);
   const route =useNavigate();
   const [reload,setreload]=useState(false);
   const [attempt,setattempt]=useState(0);
   const [cattempt,setcattempt]=useState(0);
   const [wattempt,setwattempt]=useState(0);
    
   const [correctArr,setcorrectArr]=useState([]);
   const [uncorrectArr,setuncorrectArr]=useState([]);
   console.log(correctArr);
   var [selectedaArr,setselectedValues]=useState([]);
   console.log(selectedaArr);
   const handleclick=(e)=>{
    const {target}=e;
    console.log(target.getAttribute("value"));
    const val=target.getAttribute("value");
    setselectedValues(prev=>[...prev,val]);
    
   }
   useEffect(()=>{
    if(selectedaArr.length==2){
        setattempt(attempt+1);
        if(Data[selectedaArr[0]]==selectedaArr[1] || Data[selectedaArr[1]]==selectedaArr[0] )
        {
            // answer correct
            console.log(Arr);
            setcattempt(cattempt+1);
            setcorrectArr([...selectedaArr]);
            setselectedValues([]);
            setTimeout(() => {
                var mainArr=Arr.splice(Arr.indexOf(selectedaArr[0]),1);
                mainArr=Arr.splice(Arr.indexOf(selectedaArr[1]),1);
                console.log(Arr,mainArr);
                setArr([...Arr]);
            }, 1000);
        }
        else{
            // wrong answer
            setwattempt(wattempt+1);
            setuncorrectArr([...selectedaArr]);
            setselectedValues([]);
            setTimeout(() => {
                setuncorrectArr([])
            }, 1000);
        }
    }
   },[selectedaArr.length])
   function call(){
    setArr([...Object.keys(Data),...Object.values(Data)])
                setselectedValues([]);
                setcorrectArr([]);
                setuncorrectArr([]);
                setcattempt(0);
                setattempt(0);
                setwattempt(0);

   }
   useEffect(()=>{
    call();
   },[reload])
  return (
    <>
    <div style={{display:"flex",width:"100%",justifyContent:'space-between',alignItems:'center'}}>
    <div style={{height:"40px",marginTop:"-5%",marginLeft:"20px"}} onClick={()=>{
                route("/");
        }}><KeyboardBackspaceIcon />
        </div>
    <h1>  No of Attempts : {attempt} <br /> <span>  correct Attempts : {cattempt}</span> <br /> <span>
      Wrong Attempts : {wattempt}
        </span></h1>
        <div style={{minHeight:"90%"}}>
        

        </div>
    </div>
    <div style={{width:"70%",marginTop:"40px",justifyContent:"center",alignItems:"center",gap:"30px",display:"flex",flexWrap:"wrap",marginLeft:"auto",marginRight:"auto"}}>
        {
            Arr.length==0?<div style={{display:"flex",flexDirection:"column"}}>
            
            <h1>Completed thank You</h1>
            <button onClick={()=>{
                setreload(!reload);
            }}>Click me for Re-start</button>
            </div>:  Arr.map((e,i)=>{
                return <button className={selectedaArr.includes(e)?"selected":(correctArr.includes(e)?"correct":(uncorrectArr.includes(e)?"uncorrect":""))}
                onClick={handleclick}
                value={e}
                 key={i}>
                    {e}
                </button>
            })
        }
    </div>
    </>
  )
}
