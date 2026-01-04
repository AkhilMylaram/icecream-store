import { IceCream } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <IceCream className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl font-bold">Creamery Central</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary">About Us</Link>
                <Link href="#" className="hover:text-primary">Contact</Link>
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
            </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">Designed and Developed by <span className="font-bold text-primary">Akhil</span></p>
          <p>&copy; {new Date().getFullYear()} Creamery Central. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
