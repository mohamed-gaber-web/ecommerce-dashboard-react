import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const user = {
    name: "Mohamed Jaber",
    image: "https://i.pravatar.cc/150?img=3", // random profile image
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b">
      {/* Left Side (Optional: empty or breadcrumb later) */}
      <div></div>

      {/* Right Side: User Info */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Settings or Notifications (optional) */}
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
          Settings
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md transition">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-800">{user.name}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
