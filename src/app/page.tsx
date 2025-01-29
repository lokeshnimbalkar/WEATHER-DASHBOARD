"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';
import DehazeIcon from '@mui/icons-material/Dehaze';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

let WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY

export default function Home() {
  const [place ,setPlace] = useState("Pune")
  const [placeData , setPlaceData] = useState<any>(null)

  const getWeatherData = async ()=>{
    //https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=WEATHER_API_KEY

    if(place && place.length>0){
      try {
        let url = 'https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=1ed2111ba316a509f8e05dfb32ee09f0'
        let res = await fetch(url);
        let data = await res.json();
        console.log("GET WEATHER DATA RESPONSE",data)
        setPlaceData(data)
      }
      catch(err){
        console.log(err)
      }
    }
  }

  useEffect(()=>{
    getWeatherData();
  },[])
  return (
    <div className={styles.outerdiv}>
      <div className={styles.searchbar}>
        <input type="search" placeholder="City Name" onChange={(e)=> setPlace(e.target.value)} />
        <button onClick={getWeatherData}><SearchIcon/></button>
      </div>
     
      {
        placeData && <div className={styles.row}>
          <div className={styles.section1}>
            <div className={styles.section11}>
              {
                placeData.weather[0].main === 'Clouds' &&
                <CloudIcon className={styles.weathericon} />
              }
              {
                placeData.weather[0].main === 'Haze' &&
                <DehazeIcon className={styles.weathericon} />
              }
              {
                placeData.weather[0].main === 'Clear' &&
                <WbSunnyIcon className={styles.weathericon} />
              }

              <p className={styles.temp}>{(placeData?.main.temp -273.15).toFixed(1)}<span> ℃</span></p>

            </div>
            <div className={styles.section11}></div>
          </div>

        </div>

      }
    </div>
  );
}
