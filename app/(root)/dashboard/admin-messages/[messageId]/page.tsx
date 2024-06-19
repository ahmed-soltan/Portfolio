import Link from "next/link";
import prisma from "../../../../../lib/prismadb";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const page = async ({ params }: { params: { messageId: string } }) => {
  const message = await prisma.message.findUnique({
    where: {
      id: params.messageId,
    },
  });

  if (!message) {
    return null;
  }

  return (
    <div className="w-full mt-5 p-2 flex flex-col items-start gap-4">
      <Link href={"/dashboard/admin-messages"}>
        <Button variant={"link"} className="flex items-center gap-3">
          {" "}
          <ArrowLeft className="w-4 h-4" /> View Other Messages
        </Button>
      </Link>
      <h1 className="text-slate-900 font-medium text-xl ">
        Name: <span className="text-base text-slate-800">{message.name}</span>
      </h1>
      <p className="text-slate-900 text-xl font-medium">
        Email: <span className="text-base text-slate-800">{message.email}</span>
      </p>
      <p className="text-slate-900 text-xl font-medium">
        Message:{" "}
        <span className="text-base text-slate-800">{message.message}</span>
      </p>
    </div>
  );
};

export default page;
