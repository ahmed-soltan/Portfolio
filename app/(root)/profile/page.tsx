import Image from "next/image";
import prisma from "../../../lib/prismadb";
import ProfileDescription from "./_components/ProfileDescription";
import ProfileTitle from "./_components/ProfileTitle";
import avatar from "../../../public/avatar.png";
import CVButton from "./_components/CVButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import SocialMediaLink from "./_components/SocialMediaLink";
import ProfilePhoneNumber from "./_components/PhoneNumber";
import ProfileEmail from "./_components/ProfileEmail";

const Profile = async () => {
  const profile = await prisma.profile.findFirst({
    include: {
      socialMediaLinks: true,
    },
  });

  if (!profile) {
    return null;
  }

  return (
    <div className="p-2 mb-10 flex items-center flex-wrap justify-center gap-5 h-full">
      <div className="relative w-[600px] h-[400px] 2xl:hidden block">
        <Image src={avatar} alt="avatar" fill className="object-contain" />
      </div>
      <div className="flex flex-col items-start gap-5 max-w-[700px] pb-10 lg:pb-0">
        <ProfileTitle title={profile.title!} />
        <ProfileDescription description={profile.description!} />
        <div className="flex items-center justify-start gap-3">
          <CVButton cv={profile.cv!} />
          <Link href={"/projects"}>
            <Button variant={"outline"}>
              <Eye className="w-4 h-4 mr-2" />
              View Projects
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-start flex-wrap mt-3 gap-2">
          {profile.socialMediaLinks.map((link) => {
            return <SocialMediaLink link={link} key={link.id}/>;
          })}
          <ProfilePhoneNumber phoneNumber={profile.phoneNumber!} />
          <ProfileEmail email={profile.email!} />
        </div>
      </div>
      <div className="relative w-[600px] h-[600px] hidden 2xl:block">
        <Image src={avatar} alt="avatar" fill className="object-fit" />
      </div>
    </div>
  );
};

export default Profile;
