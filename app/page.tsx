'use client'
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Home() {

  const [temp, setTemp] = useState<number|null>(100);

  const getWeatherData = async (lon: number, lat: number) => {
    let url = new URL('http://localhost:3000/api/find/')
    url.searchParams.append("lon", lon.toString());
    url.searchParams.append("lat", lat.toString());

    try {
      const res = await fetch(url.toString(), {method: "GET"});
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          const data = getWeatherData(longitude, latitude);
          console.log(await data);
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
      <div className="flex flex-col items-center gap-2 scale-150 font-light">
        <h2>city</h2>
        <h1 className="text-5xl scale-150">{temp}</h1>
        <h3>How's the weather</h3>
      </div>
    </main>
  );
}