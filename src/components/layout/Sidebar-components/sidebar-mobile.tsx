import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarMobileProps {
  links: { name: string; path: string; icon: React.ElementType }[];
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export function SidebarMobile({ links, isMobileOpen, setIsMobileOpen }: SidebarMobileProps) {
  return (
    <AnimatePresence>
      {isMobileOpen && (
        // 🔹 Background Overlay (fade in/out)
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          {/* 🔹 Sidebar itself (slide in/out) */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="absolute left-0 top-0 w-64 h-full bg-white p-4 shadow-lg z-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold">MyShop</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="space-y-2">
              {links.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
