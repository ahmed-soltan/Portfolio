"use client"
import { Button } from "@/components/ui/button";
import { SocialMediaLinks } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaSquareFacebook } from "react-icons/fa6";

const SocialMediaLink = ({ link }: { link: SocialMediaLinks }) => {

  return (
    <Link href={link.link} target="_blank" rel="noreferrer" key={link.id}>
      <Button className="flex items-center gap-1 p-2" variant={"link"} >
        {link.app === "FaceBook" && (
          <FaSquareFacebook size={25} style={{ color: "#3b5998" }} />
        )}
        {link.app === "LinkedIn" && (
          <FaLinkedin size={25} style={{ color: "#0a66c2" }} />
        )}
        {link.app === "GitHub" && (
          <FaGithub size={25} className="dark:text-slate-200 text-slate-900"/>
        )}
        <span className="text-base text-slate-700 dark:text-slate-400">
          {link.app}
        </span>
      </Button>
    </Link>
  );
};

export default SocialMediaLink;
