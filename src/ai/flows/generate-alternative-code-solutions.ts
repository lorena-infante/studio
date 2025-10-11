'use server';

/**
 * @fileOverview Generates alternative code solutions for a given coding problem.
 *
 * - generateAlternativeSolutions - A function that generates alternative code solutions.
 * - GenerateAlternativeSolutionsInput - The input type for the generateAlternativeSolutions function.
 * - GenerateAlternativeSolutionsOutput - The return type for the generateAlternativeSolutions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlternativeSolutionsInputSchema = z.object({
  codeProblem: z.string().describe('The coding problem to solve.'),
  programmingLanguage: z.string().describe('The programming language to use.'),
});

export type GenerateAlternativeSolutionsInput = z.infer<
  typeof GenerateAlternativeSolutionsInputSchema
>;

const GenerateAlternativeSolutionsOutputSchema = z.object({
  alternativeSolutions: z
    .array(z.string())
    .describe('An array of alternative code solutions.'),
});

export type GenerateAlternativeSolutionsOutput = z.infer<
  typeof GenerateAlternativeSolutionsOutputSchema
>;

export async function generateAlternativeSolutions(
  input: GenerateAlternativeSolutionsInput
): Promise<GenerateAlternativeSolutionsOutput> {
  return generateAlternativeSolutionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlternativeSolutionsPrompt',
  input: {schema: GenerateAlternativeSolutionsInputSchema},
  output: {schema: GenerateAlternativeSolutionsOutputSchema},
  prompt: `You are an expert coding assistant. You are helping a new employee learn different coding techniques.

  The employee has a coding problem and is looking for alternative solutions. Generate at least 3 different solutions to the problem in the specified programming language. Provide clear and concise code examples for each solution.

  Problem: {{{codeProblem}}}
  Language: {{{programmingLanguage}}}

  Solutions:
  {{#each alternativeSolutions}}
  - {{{this}}}
  {{/each}}`,
});

const generateAlternativeSolutionsFlow = ai.defineFlow(
  {
    name: 'generateAlternativeSolutionsFlow',
    inputSchema: GenerateAlternativeSolutionsInputSchema,
    outputSchema: GenerateAlternativeSolutionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
