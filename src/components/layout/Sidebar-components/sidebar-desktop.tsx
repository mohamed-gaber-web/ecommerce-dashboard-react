import { Button } from "@/components/ui/button";
import { Menu, ChevronLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarDesktopProps {
  links: { name: string; path: string; icon: React.ElementType }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SidebarDesktop({ links, isOpen, setIsOpen }: SidebarDesktopProps) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.aside
        key="desktop-sidebar"
        initial={{ width: 80 }}
        animate={{ width: isOpen ? 256 : 80 }} // 256px = w-64, 80px = w-20
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="hidden md:flex flex-col bg-gray-50 border-r h-screen p-4 overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.h1
            key={isOpen ? "title-visible" : "title-hidden"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -10 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className={`text-lg font-semibold whitespace-nowrap ${!isOpen && "hidden"}`}
          >
            MyShop
          </motion.h1>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Menu className="h-5 w-5 transition-transform duration-300" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="h-5 w-5 shrink-0" />
              </motion.div>

              {isOpen && (
                <motion.span
                  key={name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {name}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
}
