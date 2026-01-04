import { getAllOrders } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export default function OrdersPage() {
  const orders = getAllOrders();

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Your Orders</CardTitle>
          <CardDescription>A history of your past purchases.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn({
                        'bg-yellow-500/20 text-yellow-700': order.status === 'Processing',
                        'bg-blue-500/20 text-blue-700': order.status === 'Shipped',
                        'bg-green-500/20 text-green-700': order.status === 'Delivered',
                      })}
                      variant="outline"
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
