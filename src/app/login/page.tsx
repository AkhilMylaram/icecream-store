import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IceCream } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12">
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                    <IceCream className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
                <CardDescription>Log in to access your orders and saved flavors.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button className="w-full">Sign In</Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="underline hover:text-primary">
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    </div>
  );
}
