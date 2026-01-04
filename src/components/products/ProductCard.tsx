import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { getPromotionById } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const promotion = getPromotionById(product.promotionId);
  const image = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        {image && (
          <Image
            src={image.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-48"
            data-ai-hint={image.imageHint}
          />
        )}
        {promotion && (
          <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">{promotion.title}</Badge>
        )}
        {product.inventory === 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">Sold Out</Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl h-14">{product.name}</CardTitle>
        <CardDescription className="h-10">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={product.inventory === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
