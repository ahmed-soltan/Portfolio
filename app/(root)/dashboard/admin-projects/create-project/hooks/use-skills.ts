import { useEffect, useState } from "react";
import axios from "axios";
import { Skills } from "@prisma/client";

export const useSkills = () => {
  const [skills, setSkills] = useState<Skills[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  return { skills };
};
