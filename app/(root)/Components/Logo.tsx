"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import lightLogo from "../../../public/avatar2.png";
import darkLogo from "../../../public/darkAvatar.png";

const Logo = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or nothing until the theme is resolved on the client side
    return null;
  }

  return (
    <div>
      {resolvedTheme === "dark" ? (
        <Image
          src={darkLogo}
          alt="my Avatar"
          width={150}
          height={150}
          className="object-cover"
        />
      ) : (
        <Image
          src={lightLogo}
          alt="my Avatar"
          width={150}
          height={150}
          className="object-cover"
        />
      )}
    </div>
  );
};

export default Logo;
