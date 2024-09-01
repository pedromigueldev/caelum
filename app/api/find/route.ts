import { fetchApi } from "@/utils/fetchApi";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  let longitude: string = request.nextUrl.searchParams.get("lon") || "0";
  let latitude: string = request.nextUrl.searchParams.get("lat") || "0";
  
  let data = await fetchApi(parseFloat(latitude), parseFloat(longitude));

  return NextResponse.json(data)
}