import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/howto",
    label: "How To",
  },
  {
    href: "/developer",
    label: "Developer",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-50 w-full dark:border-b-slate-700 bg-black py-3">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
                <Link to='/' className='flex gap-3 items-center'>
                    <img src="/assets/images/logo.png" alt="logo" width={150} height={30} />
                </Link>
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="flex justify-center items-center">
                    <Link to='/' className='flex items-center'>
                        <img src="/assets/images/logo.png" alt="logo" width={150} height={30} />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-4 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <Link
                    to='/signin'
                    className={`w-[110px] ${buttonVariants({
                      variant: "white",
                    })}`}
                  >
                    Login
                  </Link>
                  <Link
                    to='/signup'
                    className={`w-[110px]  ${buttonVariants({
                      variant: "default",
                    })}`}
                  >
                    Register
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
