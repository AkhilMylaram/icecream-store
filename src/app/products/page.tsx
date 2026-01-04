import { getAllProducts } from '@/lib/data';
import ProductGrid from '@/components/products/ProductGrid';

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold">All Our Flavors</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our collection of handcrafted ice creams.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
