'use client'
import { Weather } from "@/utils/watherInterface";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState<Weather|null>();

  const getWeatherData = async (lon: number, lat: number) => {

    let url = new URL('http://localhost:3000/api/find/')
    url.searchParams.append("lon", lon.toString());
    url.searchParams.append("lat", lat.toString());

    try {
      const res = await fetch(url.toString(), {method: "GET"});
      const data: Weather = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherData(longitude, latitude);
          setData(data);
          console.log(data);
        },
        (error: GeolocationPositionError) => {
          console.log('Error getting location: ' + error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-3 scale-150 font-light">
        <h2>{data?.sys.country} - {data?.name}</h2>
        <h1 className="text-5xl scale-150">{Math.floor(data? data?.main.feels_like:0)+"°"}</h1>
        <div className="flex flex-col items-center">
          <h3>{data ? data?.weather[0].description.charAt(0).toLocaleUpperCase() + data?.weather[0].description.slice(1) : ""}</h3>
          <div className="flex gap-2 font-thin text-xs">
            <p>Max:{data?.main.temp_max} </p>
            <p>Min:{data?.main.temp_min} </p>
          </div>
        </div>
      </div>
    </main>
  );
}