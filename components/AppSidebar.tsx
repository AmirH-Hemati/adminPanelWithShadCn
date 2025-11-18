"use client";
import AddUserForm from "@/features/users/components/AddUserForm";
import {
  ChevronUp,
  LayoutDashboardIcon,
  LogOut,
  Plus,
  Settings,
  Shirt,
  ShoppingBag,
  User,
  User2,
  Users,
  ClockArrowDown,
  SaudiRiyal,
  MessageCircle,
  ChartBarStacked,
} from "lucide-react";
import Link from "next/link";
import AddProductForm from "../features/products/components/AddProductForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetTrigger } from "./ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { useLogout } from "@/features/authentication/hooks/useLogout";

const sidebarData = [
  { label: "داشبورد", icon: LayoutDashboardIcon, href: "/" },
  { label: "محصولات", icon: Shirt, href: "/products" },
  { label: "دسته بندی ها ", icon: ChartBarStacked, href: "/categories" },
  { label: "کاربران", icon: Users, href: "/users" },
  { label: "سفارشات", icon: ClockArrowDown, href: "/orders" },
  { label: "پرداخت ها", icon: SaudiRiyal, href: "/payments" },
  { label: "کامنت ها", icon: MessageCircle, href: "/comments" },
];

export default function AppSidebar() {
  const { logout, isPending } = useLogout();

  function handelLogout() {
    logout();
  }
  return (
    <Sidebar collapsible="icon" side="right">
      {/* sidebar header  */}

      <SidebarHeader className="py-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <ShoppingBag />
                <span className="text-xl font-bold ">تکنـــــــو شاپ </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* sidebar seprator  */}
      <SidebarSeparator />

      {/* sidebar content */}
      <SidebarContent>
        {sidebarData.map((data, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={data.href}>
                      <data.icon />
                      {data.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* sidebat footer  */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <SidebarMenuButton>
                  <User2 /> Amir Hemati
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Setting
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isPending}
                  onClick={handelLogout}
                >
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
