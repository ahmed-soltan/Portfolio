import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prismadb";

export const GET = async (req: NextRequest) => {
    try {
      const skills = await prisma.skills.findMany({});
  
      return NextResponse.json({
        skills,
        status: 200,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        message: error,
        status: 500,
      });
    }
  };
  