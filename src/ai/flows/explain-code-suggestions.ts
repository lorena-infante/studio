'use server';

/**
 * @fileOverview An AI agent that provides explanations for code improvement suggestions.
 *
 * - explainCodeSuggestion - A function that explains code improvement suggestions.
 * - ExplainCodeSuggestionInput - The input type for the explainCodeSuggestion function.
 * - ExplainCodeSuggestionOutput - The return type for the explainCodeSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeSuggestionInputSchema = z.object({
  code: z.string().describe('The code snippet to analyze.'),
  suggestion: z.string().describe('The code improvement suggestion.'),
});
export type ExplainCodeSuggestionInput = z.infer<typeof ExplainCodeSuggestionInputSchema>;

const ExplainCodeSuggestionOutputSchema = z.object({
  explanation: z.string().describe('The explanation for the code improvement suggestion.'),
});
export type ExplainCodeSuggestionOutput = z.infer<typeof ExplainCodeSuggestionOutputSchema>;

export async function explainCodeSuggestion(input: ExplainCodeSuggestionInput): Promise<ExplainCodeSuggestionOutput> {
  return explainCodeSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodeSuggestionPrompt',
  input: {schema: ExplainCodeSuggestionInputSchema},
  output: {schema: ExplainCodeSuggestionOutputSchema},
  prompt: `You are a code assistant that provides explanations for code improvement suggestions.

  Explain the reasoning behind the following code improvement suggestion for the given code snippet.

  Code:
  {{code}}

  Suggestion:
  {{suggestion}}

  Explanation:
  `,
});

const explainCodeSuggestionFlow = ai.defineFlow(
  {
    name: 'explainCodeSuggestionFlow',
    inputSchema: ExplainCodeSuggestionInputSchema,
    outputSchema: ExplainCodeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
