"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import userSchema from "../schema/user.schema";

export default function AddUserForm({ user }) {
  const { createUser, isCreating } = useCreateUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const isEditSession = Boolean(user?._id);
  const isWorking = isCreating || isUpdating;
  const form = useForm({
    resolver: zodResolver(userSchema),

    defaultValues: isEditSession
      ? user
      : {
          name: "",
          email: "",
          nationalId: "",
          phone: "",
          role: "",
        },
  });

  function submitUserForm(data) {
    if (isEditSession) {
      updateUser({ data, id: user?._id as string });
    } else {
      createUser(data);
    }
  }
  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">ویرایش اطلاعات کاربر</SheetTitle>
        </SheetHeader>
        <SheetDescription asChild>
          <Form {...form}>
            <form
              className="space-y-8 px-4 grid"
              onSubmit={form.handleSubmit(submitUserForm)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام و نام خانوادگی</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره موبایل</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کد ملی کاربر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ایمیل کاربر</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نقش کاربر</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(e) => field.onChange(e)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">user</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isWorking} className="mr-auto">
                {isEditSession ? "ویرایش کاربر" : "ایجاد کاربر جدید"}
              </Button>
            </form>
          </Form>
        </SheetDescription>
      </ScrollArea>
    </SheetContent>
  );
}
