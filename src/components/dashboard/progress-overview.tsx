import { learningModules } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ModuleCard } from '../learning/module-card';

export function ProgressOverview() {
  const inProgressModules = learningModules.filter(
    (m) => m.progress > 0 && m.progress < 100
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Continue Learning
        </CardTitle>
        <CardDescription>
          Pick up where you left off in your learning paths.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {inProgressModules.length > 0 ? (
          <div className="space-y-4">
            {inProgressModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>No modules in progress. Start a new one!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
