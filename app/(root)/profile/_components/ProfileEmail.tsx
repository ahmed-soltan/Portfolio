import { Mail } from "lucide-react";
import React from "react";

const ProfileEmail = ({ email }: { email: string }) => {
  return (
    <h1 className="text-slate-800 dark:text-slate-300 flex items-center gap-1 p-2">
      <Mail className="w-4 h-4 mr-2" />
      {email}
    </h1>
  );
};

export default ProfileEmail;
