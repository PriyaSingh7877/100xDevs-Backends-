import { PrismaClient } from "@prisma/client";
import { NextRequest , NextResponse } from "next/server";

const client = new PrismaClient();

export function GET(req: NextRequest) {

  return NextResponse.json({
    email: "khushii@gmail.com" ,
    name: "khushi"
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json();

   client.user.create({
    data:{
      email: body.email,
      password: body.password
    }
   })
   
  //hit the database with usename, password
  return NextResponse.json({
    body
  })  
}

