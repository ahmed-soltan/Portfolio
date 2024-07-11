import { Separator } from "@/components/ui/separator";
import SocialMediaLinks from "./components/SocialMediaLinks";
import Description from "./components/Description";
import Title from "./components/Title";
import { currentUser } from "@clerk/nextjs/server";
import prisma from '../../../../lib/prismadb'
import UploadCV from "./components/uploadCV";
import PhoneNumber from "./components/PhoneNumber";
import Email from "./components/Email";

const Profile = async () => {
  try {
    const user = await currentUser();

    if (!user || user.emailAddresses[0]?.emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return <div>You are not authorized to view this page</div>;
    }

    const profile = await prisma.profile.findFirst({
      include: {
        socialMediaLinks: {
          select: {
            link: true,
            app: true
          }
        }
      }
    });

    if (!profile) {
      return <div>You are not authorized to view this page</div>;
    }

    return (
      <div className="flex flex-col items-start gap-5 w-full mt-5 p-2">
        <Title title={profile.title || "No Title"} profileId={profile.id} />
        <Separator />
        <Description description={profile.description || "No Description"} profileId={profile.id} />
        <Separator />
        <Email email={profile.email} profileId={profile.id} />
        <Separator />
        <PhoneNumber phoneNumber={profile.phoneNumber || "No phone Number"} profileId={profile.id} />
        <Separator />
        <UploadCV cv={profile.cv || "No CV available"} profileId={profile.id} />
        <Separator />
        <SocialMediaLinks socialMediaLinks={profile.socialMediaLinks} profileId={profile.id} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return <div>There was an error loading the profile. Please try again later.</div>;
  }
};

export default Profile;
