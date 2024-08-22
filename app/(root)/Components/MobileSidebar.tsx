import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-7 h-7 block md:hidden" />
      </SheetTrigger>
      <SheetContent className="block md:hidden" side={"left"}>
        <SheetHeader>
          <SheetTitle>
           <Logo/>
          </SheetTitle>
          <Separator/>
          <Sidebar />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
