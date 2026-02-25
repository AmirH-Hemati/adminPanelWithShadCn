import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1 overflow-x-hidden">
        <Navbar />
        <div className="px-4 max-w-5xl mx-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
