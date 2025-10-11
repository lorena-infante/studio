'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing code improvement suggestions.
 *
 * - codeImprovementSuggestions - A function that takes code as input and returns improvement suggestions.
 * - CodeImprovementSuggestionsInput - The input type for the codeImprovementSuggestions function.
 * - CodeImprovementSuggestionsOutput - The return type for the codeImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeImprovementSuggestionsInputSchema = z.object({
  code: z
    .string()
    .describe('The code snippet to provide improvement suggestions for.'),
});
export type CodeImprovementSuggestionsInput = z.infer<
  typeof CodeImprovementSuggestionsInputSchema
>;

const CodeImprovementSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('The code improvement suggestions, adhering to PEP 8 standards and best practices.'),
  explanation: z
    .string()
    .describe('Explanation of each suggestion with alternative solutions'),
});
export type CodeImprovementSuggestionsOutput = z.infer<
  typeof CodeImprovementSuggestionsOutputSchema
>;

export async function codeImprovementSuggestions(
  input: CodeImprovementSuggestionsInput
): Promise<CodeImprovementSuggestionsOutput> {
  return codeImprovementSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeImprovementSuggestionsPrompt',
  input: {schema: CodeImprovementSuggestionsInputSchema},
  output: {schema: CodeImprovementSuggestionsOutputSchema},
  prompt: `You are an AI code assistant that provides suggestions for improving code, adhering to PEP 8 standards and best practices.

  Analyze the following code snippet and provide improvement suggestions, along with explanations and alternative solutions.

  Code:
  {{code}}
  `,
});

const codeImprovementSuggestionsFlow = ai.defineFlow(
  {
    name: 'codeImprovementSuggestionsFlow',
    inputSchema: CodeImprovementSuggestionsInputSchema,
    outputSchema: CodeImprovementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
