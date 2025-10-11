import type { LearningModule } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CircleCheck, CirclePlay } from 'lucide-react';

export function ModuleCard({ module }: { module: LearningModule }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{module.title}</CardTitle>
        <CardDescription>{module.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <p>{module.progress}% complete</p>
        </div>
        <Progress value={module.progress} aria-label={`${module.title} progress`} />
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm">
        <Badge variant={module.department === 'General' ? 'secondary' : 'outline'}>
          {module.department}
        </Badge>
        <div className="flex items-center gap-2 font-semibold text-primary">
          {module.progress === 100 ? (
            <>
              <CircleCheck className="h-5 w-5" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <CirclePlay className="h-5 w-5" />
              <span>{module.progress > 0 ? 'Continue' : 'Start'}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
