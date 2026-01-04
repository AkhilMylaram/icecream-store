import Link from 'next/link';
import { ArrowRight, Gift, IceCream, ShoppingCart, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getAllProducts, getPromotions, getProductById } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const featuredProducts = getAllProducts().slice(0, 8);
  const promotions = getPromotions();
  const flavorOfTheMonth = getProductById('prod-006'); // Salted Caramel Craze
  
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const storyImage = PlaceHolderImages.find(p => p.id === 'story-1');
  const flavorOfTheMonthImage = flavorOfTheMonth ? PlaceHolderImages.find(p => p.id === flavorOfTheMonth.imageId) : undefined;


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
                <Button asChild variant="outline" size="lg">
                    <Link href="/products">View All Products</Link>
                </Button>
            </div>
          </div>
        </section>

        {flavorOfTheMonth && flavorOfTheMonthImage && (
          <section id="flavor-of-the-month" className="py-16 md:py-24 bg-accent/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Flavor of the Month</h2>
                <p className="mt-4 text-lg text-muted-foreground">A special treat, just for you.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <Image 
                  src={flavorOfTheMonthImage.imageUrl}
                  alt={flavorOfTheMonth.name}
                  width={600}
                  height={600}
                  className="rounded-lg shadow-xl object-cover aspect-square"
                  data-ai-hint={flavorOfTheMonthImage.imageHint}
                />
                <div>
                  <h3 className="font-headline text-4xl font-bold">{flavorOfTheMonth.name}</h3>
                  <p className="mt-4 text-lg text-muted-foreground">{flavorOfTheMonth.description}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Star className="text-yellow-500 fill-yellow-500" />
                    <Star className="text-yellow-500 fill-yellow-500" />
                    <Star className="text-yellow-500 fill-yellow-500" />
                    <Star className="text-yellow-500 fill-yellow-500" />
                    <Star className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-muted-foreground ml-2">(4.8 stars from 250+ reviews)</span>
                  </div>
                  <p className="text-3xl font-bold text-primary mt-4">${flavorOfTheMonth.price.toFixed(2)}</p>
                  <Button size="lg" className="mt-6">
                    <ShoppingCart className="mr-2" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="our-story" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                 {storyImage && (
                  <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl object-cover"
                    data-ai-hint={storyImage.imageHint}
                  />
                )}
                <div className="md:order-first">
                  <Badge variant="secondary" className="mb-4">Our Journey</Badge>
                  <h2 className="font-headline text-4xl md:text-5xl font-bold">Crafted with Passion</h2>
                  <p className="mt-6 text-lg text-muted-foreground">
                    Since 2010, Creamery Central has been a family-owned business dedicated to crafting the most delightful ice cream from locally-sourced ingredients. Our journey started in a small kitchen with a big dream: to spread joy one scoop at a time. We believe in quality, creativity, and community.
                  </p>
                   <Button asChild variant="link" className="pl-0 text-lg mt-4">
                      <Link href="/about">
                        Learn More About Us <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl md:text-5xl font-bold">What Our Fans Say</h2>
              <p className="mt-4 text-lg text-muted-foreground">We love our customers, and they love our ice cream!</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="https://picsum.photos/seed/avatar1/100/100" alt="Avatar of Sarah K." />
                      <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Sarah K.</CardTitle>
                      <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;Absolutely the best ice cream I&apos;ve ever had. The Classic Vanilla Bean is pure perfection!&quot;</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src="https://picsum.photos/seed/avatar2/100/100" alt="Avatar of Mike R." />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Mike R.</CardTitle>
                      <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;The flavor combinations are out of this world. Salted Caramel Craze is my go-to. Highly recommended!&quot;</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                       <AvatarImage src="https://picsum.photos/seed/avatar3/100/100" alt="Avatar of Emily T." />
                      <AvatarFallback>ET</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">Emily T.</CardTitle>
                      <div className="flex text-yellow-500">
                        <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&quot;Fast shipping and the ice cream arrived perfectly frozen. The online ordering is so easy to use.&quot;</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="promotions" className="py-16 md:py-24 bg-white">
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

      </main>
    </div>
  );
}
