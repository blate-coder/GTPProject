import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, User, BarChart2, Award, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-6">
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink className="text-xl font-bold">
                  日本語 Learn
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/grammar-quizzes">
                <NavigationMenuLink className="text-sm">
                  Grammar Practice
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <Link href="/analytics">
                  <NavigationMenuLink className="text-sm flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    My Analytics
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/profile">
                <div className="flex items-center gap-2 text-sm hover:text-primary transition">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/assets/avatars/${user.profileImage || 'default-avatar'}.svg`} />
                    <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.username}</span>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
                      {user.tokens || 0} tokens
                    </span>
                  </div>
                </div>
              </Link>
              
              <div className="flex gap-2">
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="h-8">
                    <Award className="h-4 w-4 mr-1" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="h-8"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}