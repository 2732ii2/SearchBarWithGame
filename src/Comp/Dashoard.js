import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
var MainDiv=styled.div`
    width:400px;
    height:400px;
    border:1px solid black;
    margin:auto;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:100px;
`;
export default function Dashoard() {
    var [state,setState]=useState({});
    console.log(state);
    useEffect(()=>{
       var c =JSON.parse(localStorage.getItem("profile_data"));
        // console.log(c.ImageUrl, c.Comments, c.Country, c.PhoneNo);
        setState(c);
    },[])
  return (
    <div>
      <MainDiv>
        <img
          src={state.ImageUrl ? `${state.ImageUrl}` : "null"}
          style={{ width: "100px", height: "100px" }}
        />
        <div>Country: {state.Country ? state.Country : "India"}</div>
        <div> PhoneNo: {state.PhoneNo ? state.PhoneNo : "73xxx"}</div>
        <div>Comments:{state.Comments ? state.Comments : "73xxx"}</div>
      </MainDiv>
    </div>
  );
}
