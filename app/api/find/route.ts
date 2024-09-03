import { fetchApi } from "@/utils/fetchApi";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
  const file = await fs.readFile(process.cwd() + '/public/data.json', 'utf8').then((data:string) => 
    JSON.parse(data)
  );

  let longitude: string = request.nextUrl.searchParams.get("lon") || "0";
  let latitude: string = request.nextUrl.searchParams.get("lat") || "0";
  
  // let data = await fetchApi(parseFloat(latitude), parseFloat(longitude));

  return NextResponse.json(file)
}