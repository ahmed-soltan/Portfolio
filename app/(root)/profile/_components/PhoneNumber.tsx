import { PhoneCall } from "lucide-react";
import React from "react";

const ProfilePhoneNumber = ({ phoneNumber }: { phoneNumber: string }) => {
  return (
    <h1 className="text-slate-800 dark:text-slate-300 flex items-center gap-1 p-2">
      <PhoneCall className="w-4 h-4"/>
      {phoneNumber}
    </h1>
  );
};

export default ProfilePhoneNumber;
