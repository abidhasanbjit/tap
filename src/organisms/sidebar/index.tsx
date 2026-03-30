import { NavLink } from "react-router-dom";
import { getNavItemsForRole } from "@/config/navigation";
// import { useAppSelector } from '@/store/hooks';
import { Role } from "@/types/auth.types";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo/Logo.svg?react";

export default function Sidebar() {
  //   const user = useAppSelector((state) => state.auth.user);
  //   const role = user?.role ?? Role.USER;
  const role = "super_admin" as Role; // TODO: remove this hardcoded role
  const navItems = getNavItemsForRole(role);

  return (
    <aside className="fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="h-21.25 flex justify-center items-center border-b border-border shrink-0">
        <Logo className="h-13.25 w-auto" />
      </div>

      {/* Nav */}
    <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-4 rounded-lg text-base font-medium transition-colors",
                  isActive
                    ? "bg-secondary/10 text-secondary"
                    // : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    : "text-primary hover:bg-muted hover:text-foreground",
                )
              }
            >
              <Icon size={17} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
