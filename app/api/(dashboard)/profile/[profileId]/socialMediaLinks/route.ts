import { NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prismadb'

export const PATCH = async (req: Request, { params }: { params: { profileId: string } }) => {
    try {
        const body = await req.json();
        const { socialMediaLinks , profileId } = body;

        console.log(body)

        // Delete existing social media links for the profile
        await prisma.socialMediaLinks.deleteMany({
            where: {
                profileId: params.profileId,
            },
        });

        // Create new social media links
        const newSocialMediaLinks = await prisma.socialMediaLinks.createMany({
            data: socialMediaLinks.map((link: any) => ({
                ...link,
                profileId:profileId
            })),
        });

        return NextResponse.json({
            socialMediaLinks: newSocialMediaLinks,
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
