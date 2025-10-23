import { Menu } from "lucide-react";
import { SidebarDesktop } from "../Sidebar-components/sidebar-desktop";
import { useState } from "react";
import { SidebarMobile } from "../Sidebar-components/sidebar-mobile";
import { Button } from "@/components/ui/button";
import { ROUTERLINKS } from "@/constatnts/app.constant";

const links = ROUTERLINKS;

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
        {/* 🌐 Mobile Top Bar */}
        <div className="md:hidden flex justify-between p-4 bg-white border-b shadow-sm">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <SidebarMobile  links={links} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
        <SidebarDesktop links={links} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
