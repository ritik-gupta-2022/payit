import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const loggedIn = await getLoggedInUser();
  if(!loggedIn){
    redirect('/sign-in');
  }
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn}/>
      <div className="size-full flex flex-col">
        <div className="root-layout">
          <Image src='/icons/logo.svg' alt='logo' width={30} height={30}/>

          <div>
            <MobileNav user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}