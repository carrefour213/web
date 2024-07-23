import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  title: string;
  subTitle: string;
};

export const Header = ({
  title,
  subTitle
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 ">
      <h1 className={cn(
        "text-3xl font-semibold",
        font.className,
      )}>
        {title}
      </h1>
      <p className="text-muted-foreground text-sm">
        {subTitle}
      </p>
    </div>
  );
};