import { NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prismadb'

export const PATCH = async (req: Request, { params }: { params: { profileId: string } }) => {
    try {
        const body = await req.json();

        console.log(body)

        const skill = await prisma.skills.create({
            data: {
                ...body
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
