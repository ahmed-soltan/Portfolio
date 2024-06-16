import { NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prismadb";

export const PATCH = async (
  req: Request,
  { params }: { params: { profileId: string; projectId: string } }
) => {
  try {
    const body = await req.json();

    const project = await prisma.projects.update({
      where: {
        id: params.projectId,
        profileId: params.profileId,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json({
      project,
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


export const DELETE = async (
  req: Request,
  { params }: { params: { profileId: string; projectId: string } }
) => {
  try {

    const project = await prisma.projects.delete({
      where: {
        id: params.projectId,
        profileId: params.profileId,
      },
    });
    return NextResponse.json({
      project,
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


