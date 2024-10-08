import Image from "next/image";
import prisma from "../../../lib/prismadb";

const page = async () => {
  const skills = await prisma.skills.findMany();

  if (!skills) {
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full flex-col gap-10 p-5">
      <h1 className="text-center text-4xl text-slate-800 dark:text-slate-100 font-medium">My Skills</h1>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {skills.length > 0 ? (
          skills.map((skill) => {
            return (
              <div className="border-[1px] rounded-md w-[290px] h-[200px] hover:bg-slate-100 hover:text-slate-800 flex flex-col items-center justify-center gap-3" key={skill.id}>
                <Image
                  src={skill.icon!}
                  alt={skill.skill}
                  width={80}
                  height={80}
                  className="max-w-[120px] max-h-[80px]"
                />
                <h1 className="text-center text-slate-800 dark:text-slate-400 font-medium">
                  {skill.skill}
                </h1>
              </div>
            );
          })
        ) : (
          <div className="text-slate-600 italic">No Skills</div>
        )}
      </div>
    </div>
  );
};

export default page;
