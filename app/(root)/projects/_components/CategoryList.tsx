"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Next JS",
    label: "Next.js 14",
  },
  {
    value: "React",
    label: "React.js",
  },
  {
    value: "TypeScript",
    label: "TypeScript",
  },
  {
    value: "Vanilla JS",
    label: "Vanilla JavaScript",
  },
  {
    value: "MongoDB",
    label: "MongoDB",
  },
  {
    value: "Tailwind",
    label: "Tailwind",
  },
];
const CategoryList = ({
  setCategory,
  category:cat,
}: {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
}) => {
  const selectCategory = (category: string) => {
    setCategory(category);
  };
  return (
    <div
      className="flex items-center gap-4 my-5 overflow-x-auto w-full pb-2"
      style={{
        overflowX: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "blue",
      }}
    >
      {categories.map((category) => {
        return (
          <Button
            key={category.value}
            variant={"secondary"}
            size={"sm"}
            onClick={() => selectCategory(category.value)}
            className={cn(
              cat===category.value && "border border-sky-700 bg-sky-50 text-sky-700"
            )}
          >
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryList;
