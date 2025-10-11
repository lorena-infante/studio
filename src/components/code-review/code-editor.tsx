'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { codeImprovementSuggestions } from '@/ai/flows/code-improvement-suggestions';
import { Bot, Code, Loader, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  suggestions: null,
  explanation: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Suggestions
        </>
      )}
    </Button>
  );
}

export function CodeEditor() {
  const [state, formAction] = useFormState(
    async (
      prevState: typeof initialState,
      formData: FormData
    ): Promise<typeof initialState> => {
      const code = formData.get('code') as string;
      if (!code) {
        return { ...initialState, error: 'Please enter some code to analyze.' };
      }
      try {
        const result = await codeImprovementSuggestions({ code });
        if (!result) {
          return { ...initialState, error: 'Failed to get suggestions from the AI.' };
        }
        return { ...result, error: null };
      } catch (e) {
        return { ...initialState, error: 'An unexpected error occurred.' };
      }
    },
    initialState
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Final Assessment</h1>
        <p className="text-muted-foreground mt-2">
          In the code editor, we've left a simple function with some room for improvement.

          Identify: Read the code and find at least two elements that don't follow PEP 8 style conventions (these could be variable names, spacing, etc.).

          Refactor: Correct the code directly in the editor to align it with best practices.

          Check: When you think it's ready, press "Next" to compare your solution with ours.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your Code</CardTitle>
          <CardDescription>
            Enter the code snippet you want to get feedback on
            <br></br>
            <br></br>

            <a
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              target="_blank"
              rel="noopener noreferrer"
              href="https://clozeitllm.streamlit.app/"
            >
              HERE
            </a>
          </CardDescription>

        </CardHeader>

      </Card>
    </div>
  );
}
