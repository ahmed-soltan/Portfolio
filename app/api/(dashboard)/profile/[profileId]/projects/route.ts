import { NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prismadb'

export const POST=async(req:Request,{params}:{params:{profileId:string}})=>{
    try {
        const body =await req.json();
        const project = await prisma.projects.create({
            data:{
                ...body
            }
        })
        return NextResponse.json({
            project,
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