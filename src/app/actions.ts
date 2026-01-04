'use server';

import { getPersonalizedRecommendations, PersonalizedRecommendationsInput } from '@/ai/flows/personalized-ice-cream-recommendations';
import { z } from 'zod';

const FormSchema = z.object({
  flavorPreferences: z.string().min(10, { message: "Please describe your preferences in a bit more detail." }),
  pastOrders: z.string(),
});

type State = {
  recommendations: string[] | null;
  error: string | null;
};

export async function getPersonalizedRecommendationsAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    flavorPreferences: formData.get('flavorPreferences'),
    pastOrders: formData.get('pastOrders'),
  });

  if (!validatedFields.success) {
    return {
      recommendations: null,
      error: validatedFields.error.flatten().fieldErrors.flavorPreferences?.[0] ?? "Invalid input.",
    };
  }

  try {
    const pastOrders = JSON.parse(validatedFields.data.pastOrders) as string[];

    const input: PersonalizedRecommendationsInput = {
      flavorPreferences: validatedFields.data.flavorPreferences,
      pastOrders,
    };

    const result = await getPersonalizedRecommendations(input);

    if (result && result.recommendations) {
      return { recommendations: result.recommendations, error: null };
    } else {
      return { recommendations: null, error: "Could not generate recommendations." };
    }
  } catch (error) {
    console.error(error);
    return { recommendations: null, error: "An unexpected error occurred. Please try again." };
  }
}
