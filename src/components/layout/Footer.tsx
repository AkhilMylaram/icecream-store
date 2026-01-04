import { IceCream, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 py-10">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center items-center gap-2 mb-4">
          <IceCream className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">Creamery Central</span>
        </div>
        <p className="max-w-md mx-auto mb-6">
          Crafting happiness, one scoop at a time with the finest ingredients.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
        </div>
         <div className="text-sm">
           <p className="mb-2">Designed and Developed by <span className="font-bold text-primary">Akhil</span></p>
           <p>&copy; {new Date().getFullYear()} Creamery Central. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
