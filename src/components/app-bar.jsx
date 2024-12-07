import {HomeIcon} from "lucide-react";
import {Link, useNavigate} from "react-router";
import {useAuth} from "../ctx/auth";
import {MountainIcon} from "../pages/home";
import {Avatar, AvatarFallback} from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function AppBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center justify-center" to="/">
        <HomeIcon />
        <span className="sr-only">StayScape</span>
      </Link>
      <div className="items-center space-x-4 ml-24 hidden md:flex">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-bold">StayScape</span>
      </div>
      <nav className="flex gap-4 sm:gap-6 items-center">
        {!user && (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/login"
          >
            Login
          </Link>
        )}
        {user && (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="/hotels"
            >
              Hotels
            </Link>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              to="/hotels/my-bookings"
            >
              My bookings
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar onClick={() => navigate("/profile")}>
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>{user?.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </nav>
    </header>
  );
}
