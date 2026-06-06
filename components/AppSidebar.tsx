"use client";
import { useLogout } from "@/features/authentication/hooks/useLogout";
import {
  ChartBarStacked,
  ChevronUp,
  ClockArrowDown,
  LayoutDashboardIcon,
  LogOut,
  MessageCircle,
  SaudiRiyal,
  Shirt,
  ShoppingBag,
  User,
  User2,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
  useSidebar,
} from "./ui/sidebar";
import { usePathname } from "next/navigation";

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
  const { openMobile, setOpenMobile } = useSidebar();
  const { logout, isPending } = useLogout();
  const pathName = usePathname();

  function handelClick() {
    if (openMobile) setOpenMobile(false);
  }
  function handelLogout() {
    logout();
  }
  return (
    <Sidebar collapsible="icon" side="right">
      {/* sidebar header  */}

      <SidebarHeader className="h-20 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-full">
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
                <SidebarMenuItem className="h-10">
                  <SidebarMenuButton
                    onClick={handelClick}
                    asChild
                    className={`
                   
                        ${
                          pathName === data.href
                            ? "bg-muted/50"
                            : "bg-transparent h-full"
                        }
                      `}
                  >
                      <data.icon />
                    <Link href={data.href} className="h-full">
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
                  <User2 /> علی اصغر واثقی
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User />
                  پروفایل
                </DropdownMenuItem>

                <DropdownMenuItem
                  variant="destructive"
                  disabled={isPending}
                  onClick={handelLogout}
                >
                  <LogOut />
                  خروج از حساب کاربری
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
