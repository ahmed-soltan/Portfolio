import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb'

export const POST=async(req:Request)=>{
    try {
        const body =await req.json();
        const message = await prisma.message.create({
            data:{
                ...body
            }
        })
        return NextResponse.json({
            message,
            status: 200,
        })
    } catch (error:any) {
        console.log(error)
        return NextResponse.json({
            message:error?.message,
            status: 500,
        })   
    }
}