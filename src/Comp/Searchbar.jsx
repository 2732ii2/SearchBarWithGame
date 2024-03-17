import React, { useEffect, useRef, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from "react-router-dom";
export default function SearchBar() {
  const [catData,setCatData]=useState([]);
  console.log(catData);
  const [clicked,setclicked]=useState(true);
  const [searchedData,setsearchedData]=useState([]);
  console.log(searchedData);
  const [generatedData,setgeneratedData]=useState([]);
  const [value,setvalue]=useState("");
  const navi= useNavigate();
  const ref=useRef(null);
  async function callCatData(){
    const generatedImagesData=[];
    const data= await fetch("https://api.thecatapi.com/v1/breeds?limit=85&page=0");
    const data2=await data.json();
    console.log(value);
    const data3 =data2?.map((e)=>e?.reference_image_id);
    data3.forEach(async(e)=>{
     try{
      const d1=await fetch(`https://api.thecatapi.com/v1/images/${e}`);
     const d2=await d1.json();
     var bool=false;
     generatedImagesData.push(d2);
     console.log(generatedData.length);
     if(generatedImagesData.length==65){
      bool=true;
      setgeneratedData(generatedImagesData);
     }
     }
     catch(e){console.log(e)}
    }
    )
  }
  useEffect(()=>{
    ref.current.focus();
  },[searchedData.length])
  useEffect( ()=>{
    callCatData();
    document.addEventListener("keydown",(e)=>{
      if(e.key=="Backspace"){
      if(!clicked)setclicked(true);
      else setclicked(false);
      console.log(searchedData);
      setsearchedData(prev=>[...prev.splice(0,prev.length-1)]);}
    })
  },[])
  return (
   <div style={{width:"100%",height:"98.1vh",background:"black",display:"flex",flexDirection:"column",alignItems:'center',paddingTop:"20px"}}>
    
     <div style={{display:"flex",flexDirection:'column',alignItems:"center",width:"100%",maxWidth:"100%"}}>
     <div style={{width:"100%",display:'flex',justifyContent:'start'}}>
     <div style={{border:"40px",height:"100%",color:'white',display:'flex',justifyContent:'center',alignItems:'start',marginLeft:"5%",marginRight:"2%"}}> <KeyboardBackspaceIcon onClick={()=>{
      navi("/")
     }} /> </div>
     
     <div style={{gap:"5px",minWidth:"80%",maxWidth:"80%",height:"auto",display:"flex",alignItems:'center',border:"1px solid white",borderRadius:"50px"}}>
      {
       searchedData.length? <div style={{width:"auto",height:"40px",gap:"5px",display:"flex",color:"white",justifyContent:"center",alignItems:"center"}}>
        {
          searchedData.map((e,i)=>{
            return <div key={i} style={{width:"auto",position:"relative",marginLeft:"10px",paddingRight:"10px",border:"1px solid white",borderRadius:"20px",height:"100%",display:"flex",justifyContent:"space-around",alignItems:'center'}}>
               <p style={{marginLeft:"20px",marginRight:"20px"}}> {e?.name}</p>
              <img src={e.url} style={{width:"30%",height:"70%",objectFit:"cover",borderRadius:"20px"}} />
              <div style={{position:"absolute",cursor:"pointer",top:-2,left:0,background:"black",width:"15px",height:"15px",borderRadius:"15px",border:"1px solid white",display:"flex",justifyContent:'center',alignItems:'center'}}
              onClick={()=>{
                var arr=searchedData;
                var index=0;
                arr.forEach((val,i)=>{
                  if(val?.name==e?.name){
                    index=i
                  }
                })
                console.log(index);

              arr.splice(index,1);

              setsearchedData((prev)=>[...arr]);
              }}
              
              >x</div>
              </div>
          })
        }
       </div>:null
      }
     <input ref={ref} onChange={(e)=>{
        setvalue(e.target.value);
     }} value={value}  style={{width:"400px",height:"40px",color:"white",background:"transparent",outline:"none",border:"none",paddingLeft:"5px",borderRadius:"10px",fontSize:"22px",margin:'10px'}} placeholder='typing ...'/>
     </div>
    
     </div>
     <div style={{width:"90%",display:"flex",justifyContent:'center',gap:'25px',flexWrap:"wrap",paddingTop:"30px",height:"80vh",overflowY:"scroll",background:"transparent",marginTop:"40px"}}>
      {
        generatedData.length?generatedData.map((e,i)=>{
          var mainE=e;
          if(e?.breeds[0]?.name.includes(value))
          return <div style={{width:'30%',height:"250px",display:"flex",padding:"10px"}}>
            <div className='Specdi'  onClick={()=>{
            const obj_={name: mainE?.breeds[0]?.name,url:mainE.url};
            if(searchedData.length<6){
            setsearchedData(prev=>[...prev,obj_]);
            setvalue("");
            }
            else{
              alert("It is more than limit");
            }
          }} style={{width:'100%',height:"250px",border:"1px solid white",marginBottom:'20px',color:"white",paddingLeft:"10px",paddingRight:"10px",display:'flex',justifyContent:'space-between',alignItems:'center'}} key={i}>
          <div style={{display:'flex',flexDirection:"column",justifyContent:"start",height:"90%",width:"67%",alignItems:'start',gap:"5px"}}>
          
            <div style={{display:"flex",fontSize:"22px",justifyContent:"space-between",gap:"5px",alignItems:'center'}}>
            Name : <p  style={{fontWeight:600}}> {e?.breeds[0]?.name}</p>
            </div>
            <div style={{textAlign:"start",overflow:"hidden"}}>
             <span style={{fontWeight:700,wordSpacing:"1px"}}> Description:</span> {e?.breeds[0]?.description}
            </div>
          </div>
           <img src={e.url} style={{width:"30%",height:"70%",objectFit:"cover"}} />
            </div>
          </div>
        }):<div id='roller' style={{width:"150px",height:"150px",display:"flex",justifyContent:'center',alignItems:'center',borderTop:"1px solid white",borderBottom:"1px solid white",borderRadius:"50%",transform:"rotate(360deg)"}}>
          <div style={{width:"120px",height:"120px",borderLeft:"1px solid red",borderRight:"1px solid red",display:"flex",justifyContent:'center',alignItems:'center',borderRadius:"50%",transform:"rotate(360deg)"}}>
          <div style={{width:"100px",height:"100px",borderTop:"1px solid blue",borderBottom:"1px solid blue",display:"flex",justifyContent:'center',alignItems:'center',borderRadius:"50%",transform:"rotate(360deg)"}}>
          </div>
          </div>
          </div>
      }
    </div>
     </div>
   </div>
  )
}
