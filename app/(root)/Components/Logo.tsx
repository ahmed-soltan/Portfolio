"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import lightLogo from "../../../public/avatar2.png";
import darkLogo from "../../../public/darkAvatar.png";
const Logo = () => {
  const { theme } = useTheme();
  return (
    <div>
      {theme === "dark" ? (
        <Image
          src={darkLogo}
          alt="my Avatar"
          width={150}
          height={150}
          className="object-cover"
        />
      ) : theme === "light" ?(
        <Image
          src={lightLogo}
          alt="my Avatar"
          width={150}
          height={150}
          className="object-cover"
        />
      ):null}
    </div>
  );
};

export default Logo;
