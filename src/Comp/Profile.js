import React, { useState } from 'react'
// import FileReader from "FileReader";
import base64convertor from './base64';
import styled from 'styled-components'
var MainDiv=styled.div`
    width:100%;
    height:100vh;
    border:1px solid black;
    display:flex;
    justify-content:center;
    align-items:center;
`;
var InsideDiv = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;
var SameDivs = styled.div`
  width: 300px;
  height: 40px;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  //   flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`;

var Button = styled.button`
  width: 150px;
  height: 40px;
  background:black;
  font-size:20px;
  color:white;
  border-radius:20px;

`;

export default function Profile() {
    var list_of_cities=["India","America","South Africa"];
    var [states,setstates]=useState({
        ImageUrl:"",
        PhoneNo:"",
        Comments:"",
        Country:""
    })
    
    // console.log(states);
  return (
    <MainDiv>
      <div>
        Form
        <InsideDiv>
          <SameDivs>
            {" "}
            Image :{" "}
            <input
              onChange={(e) => {
                console.log(e.target.files[0]);

                var c = base64convertor(e.target.files[0]);
                console.log(c);
                c.then(data=>{
                  console.log(data);
                  setstates({
                    ...states,
                    ImageUrl: data,
                  });
                })
                .catch(e=>{
                    console.log(e.message);
                })
                // setstates({
                //   ...states,
                //   ImageUrl: c,
                // });
              }}    
              
              type="file"
            />
          </SameDivs>
          <SameDivs>
            Phone No : <input onChange={(e)=>{
                setstates({
                    ...states,PhoneNo:e.target.value
                })
                
            }}  type="number" />
          </SameDivs>
          <select onChange={e=>{
            console.log(e.target.value);
            setstates({
              ...states,
              Country: e.target.value,
            });
          }} >
            {list_of_cities.map((e, i) => {
              return (
                <>
                  <option key={i} name={e} value={e}>
                    {e}
                  </option>
                </>
              );
            })}
          </select>
          <SameDivs>
           Comments : <textarea onChange={e=>{
            setstates({
              ...states,
              Comments: e.target.value,
            });
           }} type="text" />
          </SameDivs>

          <Button onClick={()=>{
            console.log(states);
            var c = JSON.parse(localStorage.getItem("profile_data"));
            if (c){
                localStorage.clear("profile_data");
                localStorage.setItem("profile_data", JSON.stringify(states));
            }
            localStorage.setItem("profile_data",JSON.stringify(states));
          }}>
            Submit
          </Button>
        </InsideDiv>
      </div>
    </MainDiv>
  );
}
