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
            Enter the code snippet you want to get feedback on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="code"
              placeholder="def my_function( a, b ):..."
              className="min-h-[200px] font-code text-sm"
              required
            />
            {state?.error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      {state?.suggestions && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Code /> Improved Code
            </CardTitle>
            <CardDescription>
              Here is a refactored version of your code with our suggestions applied.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="font-code text-sm">{state.suggestions}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {state?.explanation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Bot /> Explanation
            </CardTitle>
            <CardDescription>
              Here&apos;s a breakdown of the changes and why they improve the code.
            </CardDescription>
          </CardHeader>
          <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                <code className="font-code text-sm leading-relaxed">{state.explanation}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
