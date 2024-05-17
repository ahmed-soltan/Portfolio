import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prismadb'

export const DELETE = async (req: Request, { params }: { params: { profileId: string , skillId:string} }) => {
    try {

        const skill = await prisma.skills.delete({
            where:{
                id: params.skillId,
                profileId: params.profileId,
            }
        });

        return NextResponse.json({
            skill: skill,
            status: 200,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: error?.message,
            status: 500,
        });
    }
};
