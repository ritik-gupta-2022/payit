import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  
  const loggedIn = {firstName:'Ritik', lastName:'Gupta'};
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