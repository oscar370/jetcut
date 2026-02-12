import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <NavigationMenu className="flex justify-between w-full items-center max-w-full py-1 px-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" className="font-bold">
              Jetcut
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/"> Hola </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="max-w-150 mx-auto px-1 md:px-0">{children}</div>
    </>
  );
}
