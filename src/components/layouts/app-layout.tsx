import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { auth } from "@/lib/auth";
import Link from "next/link";

type AppLayoutProps = {
  children: React.ReactNode;
};

export async function AppLayout({ children }: AppLayoutProps) {
  const session = await auth();

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

        <NavigationMenuList className="space-x-1">
          {!session?.user ? (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/sign-in">Sign in</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/user">{session.user.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="max-w-150 mx-auto px-1 md:px-0 mt-2">{children}</div>
    </>
  );
}
