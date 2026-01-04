import Link from 'next/link';
import { ArrowRight, Gift } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getAllProducts, getPromotions, getPastOrders } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';
import RecommendationForm from '@/components/recommendations/RecommendationForm';
import CreateFlavorForm from '@/components/CreateFlavorForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function Home() {
  const featuredProducts = getAllProducts().slice(0, 8);
  const promotions = getPromotions();
  const pastOrders = getPastOrders();

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-shadow">
              Discover Your Perfect Scoop
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-shadow-sm">
              From timeless classics to daring new flavors, Creamery Central is your gateway to the world of artisanal ice cream.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/products">
                Explore Flavors <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="featured-products" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Featured Flavors</h2>
              <p className="mt-4 text-lg text-muted-foreground">Handpicked for you to enjoy.</p>
            </div>
            <ProductGrid products={featuredProducts} />
             <div className="text-center mt-12">
                <Button asChild variant="outline">
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="promotions" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Sweet Deals</h2>
              <p className="mt-4 text-lg text-muted-foreground">Don't miss out on our latest promotions!</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {promotions.map((promo) => (
                <Card key={promo.id} className="bg-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-full">
                        <Gift />
                      </div>
                      <div>
                        <CardTitle className="font-headline text-2xl">{promo.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{promo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section id="ai-features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <CreateFlavorForm />
            <RecommendationForm pastOrders={pastOrders} />
          </div>
        </section>

      </main>
    </div>
  );
}
