import React,{useState,useEffect} from 'react'
import axios from 'axios'
import MapPic from "mapmyindia-react";
import "./Map.css"
function Map(){
    const[stores,addStores]=useState([]);
    const [address,setAddress]=useState("");
    const [coord,setCoords]=useState([]);
    const [markers,setMarkers]=useState([]);
    const [show,setShow]=useState(false)
    let m=[];
    async function map(){ 
      const headers = {
        'Authorization': 'bearer d5290efc-9b4f-41c9-a9b5-0e5bfde00aa9',
        'Access-Control-Allow-Origin':'*'
      };
      const url1=`https://peaceful-oasis-36229.herokuapp.com/https://atlas.mapmyindia.com/api/places/geocode?address=${address}&itemCount=1`;
      

      const res1= await axios.get(url1,{headers})
      let lat=res1.data.copResults.latitude;
      let long=res1.data.copResults.longitude;

      const url2=`https://peaceful-oasis-36229.herokuapp.com/https://atlas.mapmyindia.com/api/places/nearby/json?keywords=pharmacy&refLocation=${lat}%2C${long}&page=1&region=IND&radius=10000`;

      const res2= await axios.get(url2,{headers})
      let shops= res2.data.suggestedLocations;

      shops.forEach(shop => {
        const marker={
          position:[shop.latitude,shop.longitude],
          draggable:false,
          title:shop.placeName+" -> "+shop.placeAddress
        }
        m.push(marker)
      });
      setMarkers([...m])
      setShow(true)

      
    }
   
        
  
    return(
        <div className="map">
          <div id="addSearch"> 
        <input id="searchBox" placeholder="Enter address" onChange={(event)=>{setAddress(event.target.value)}}></input>
        <div class="seachIcon" onClick={map}><i class="fas fa-search"></i></div>
        </div>
        <div className="mapBox">
        {show?<MapPic markers={markers}/>:null}
                
      </div>
        </div>
        
    );
}

export default Map;