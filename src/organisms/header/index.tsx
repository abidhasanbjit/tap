import { Bell } from "lucide-react";
// import { useAppSelector } from '@/store/hooks';
import DemoProfile from "@/assets/icons/demo_profile.svg?react";

export default function Header() {
  //   const user = useAppSelector((state) => state.auth.user);
  const user = {
    id: "123",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "super_admin",
  };

  return (
    <header className="fixed top-0 left-64 right-0 z-20 h-21.25 bg-white border-b border-border flex items-center justify-end px-6 gap-4">
      {/* User info */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full  flex items-center justify-center text-primary-foreground text-sm font-semibold uppercase select-none">
            <DemoProfile className="size-full rounded-full" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {user.role.replace("_", " ")}
            </span>
          </div>
        </div>
      )}
      {/* Bell */}
      <button className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
        <Bell size={18} />
      </button>
    </header>
  );
}
