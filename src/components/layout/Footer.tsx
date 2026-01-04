import { IceCream, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand and social */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <IceCream className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">Creamery Central</span>
            </div>
            <p className="text-muted-foreground max-w-xs">Crafting happiness, one scoop at a time. The finest ingredients for the best ice cream.</p>
            <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">Flavors</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-primary">My Orders</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Shipping Information</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center text-sm text-muted-foreground border-t">
          <p className="mb-2">Designed and Developed by <span className="font-bold text-primary">Akhil</span></p>
          <p>&copy; {new Date().getFullYear()} Creamery Central. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
