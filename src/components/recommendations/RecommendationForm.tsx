'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { getPersonalizedRecommendationsAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type RecommendationFormProps = {
  pastOrders: string[];
};

const initialState = {
  recommendations: [],
  error: null,
};

export default function RecommendationForm({ pastOrders }: RecommendationFormProps) {
  const [state, formAction, isPending] = useActionState(getPersonalizedRecommendationsAction, initialState);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: state.error,
      });
    }
    if (state.recommendations && state.recommendations.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, toast]);

  return (
    <Card className="h-full border-2 border-primary/20 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <Wand2 className="h-8 w-8" />
        </div>
        <CardTitle className="font-headline text-4xl">Flavor Wizard</CardTitle>
        <CardDescription className="text-lg">
          Let our AI find your next favorite ice cream flavor!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="flavorPreferences" className="text-lg font-semibold">What flavors or textures do you enjoy?</Label>
            <Textarea
              id="flavorPreferences"
              name="flavorPreferences"
              placeholder="e.g., I love fruity and tangy flavors like raspberry, but not too sweet. I also enjoy creamy textures with a bit of crunch."
              rows={4}
              required
              className="text-base"
            />
          </div>

          <input type="hidden" name="pastOrders" value={JSON.stringify(pastOrders)} />

          <div className="space-y-2">
            <Label className="text-lg font-semibold">Based on your past orders:</Label>
            <ul className="list-disc list-inside bg-secondary/50 p-4 rounded-md">
                {pastOrders.map((order, index) => (
                    <li key={index} className="text-muted-foreground">{order}</li>
                ))}
            </ul>
          </div>

          <div className="text-center">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Flavors...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Recommendations
                </>
              )}
            </Button>
          </div>
        </form>

        {state.recommendations && state.recommendations.length > 0 && (
          <div ref={resultsRef} className="mt-8 pt-6 border-t">
            <h3 className="text-center font-headline text-3xl font-bold mb-4">Your Personalized Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.recommendations.map((rec, index) => (
                <Card key={index} className="bg-accent/30">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-accent text-accent-foreground p-3 rounded-full">
                        <Sparkles />
                    </div>
                    <p className="font-semibold text-lg">{rec}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
