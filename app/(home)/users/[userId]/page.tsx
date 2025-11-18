"use client";
import AppAreaChart from "@/features/dashboard/components/AppAreaChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CardList from "@/components/CardList";
import { Badge } from "@/components/ui/badge";
import AddUserForm from "@/features/users/components/AddUserForm";
import { useGetUser } from "@/features/users/hooks/useGetUser";
import { useRecentOrder } from "@/features/orders/hooks/useRecentOrder";
import Spinner from "@/components/Spinner";

export default function Page() {
  const { user, isLoading } = useGetUser();
  // const { orders, isLoading: isLoading2 } = useRecentOrder();
  if (isLoading) return <Spinner />;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">داشبورد</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">کاربران</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col xl:flex-row gap-8 mt-4">
        {/* left  */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* INFORMATION CONTAINER */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold"> اطلاعات کاربر</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button>ویرایش کاربر </Button>
                </SheetTrigger>
                <AddUserForm user={user} />
              </Sheet>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-8">
                <Avatar className="size-12">
                  <AvatarImage
                    alt="avatar user image"
                    src={`http://localhost:3000/img/users/${user.photo}`}
                  />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2">
                  <span>{user.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">ایمیل :</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">شماره موبایل :</span>
                <span>{user.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">نقش کاربر:</span>
                <Badge>{user.role}</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
               تاریخ عضویت : {new Date(user.createdAt).toLocaleString("en-US")}
            </p>
          </div>

          {/* CARD LIST CONTAINER */}

          <div className="bg-primary-foreground p-4 rounded-lg">
            {/* <CardList title="Recent Orders" orders={orders} /> */}
          </div>
        </div>

        {/* right */}

        <div className="w-full xl:w-2/3 space-y-6">
          {/* activiti users  */}
          <div className="bg-primary-foreground p-4 rounded-lg">
            <h1 className="text-xl font-semibold">فعالیت اخیر کاربر</h1>
            <AppAreaChart />
          </div>
        </div>
      </div>
    </div>
  );
}
