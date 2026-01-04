
'use client';

import { FlaskConical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function CreateFlavorForm() {

  return (
    <Card className="h-full border-2 border-accent/20 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-accent text-accent-foreground rounded-full p-3 w-fit mb-4">
            <FlaskConical className="h-8 w-8" />
        </div>
        <CardTitle className="font-headline text-4xl">Flavor Lab</CardTitle>
        <CardDescription className="text-lg">
          Dream up your own ice cream flavor!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={() => {}} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="flavorName" className="text-lg font-semibold">Flavor Name</Label>
            <Input
              id="flavorName"
              name="flavorName"
              placeholder="e.g., 'Cosmic Caramel Crunch'"
              required
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="flavorDescription" className="text-lg font-semibold">Describe your creation</Label>
            <Textarea
              id="flavorDescription"
              name="flavorDescription"
              placeholder="e.g., A creamy caramel base with chocolate-covered popping candy and a swirl of galaxy-blue marshmallow."
              rows={4}
              required
              className="text-base"
            />
          </div>

          <div className="text-center">
            <Button type="submit" size="lg">
              <>
                <FlaskConical className="mr-2 h-4 w-4" />
                Submit My Flavor
              </>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
