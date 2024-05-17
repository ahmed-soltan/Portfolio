import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prismadb'

export const PATCH=async(req:Request,{params}:{params:{profileId:string}})=>{
    try {
        const body =await req.json();
        const profile = await prisma.profile.update({
            where:{
                id:params.profileId
            },
            data:{
                ...body
            }
        })
        return NextResponse.json({
            profile,
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