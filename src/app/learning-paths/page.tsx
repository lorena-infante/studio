import { learningModules, user } from '@/lib/data';
import type { LearningModule } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ModuleCard } from '@/components/learning/module-card';

export default function LearningPathsPage() {
  const departments = ['General', 'Engineering', 'Design', 'Product'];
  const userDepartment = user.department;

  const groupedModules = departments.reduce((acc, dept) => {
    acc[dept] = learningModules.filter((m) => m.department === dept);
    return acc;
  }, {} as Record<string, LearningModule[]>);

  // Sort departments to show user's department first, then General, then others
  const sortedDepartments = departments.sort((a, b) => {
    if (a === userDepartment) return -1;
    if (b === userDepartment) return 1;
    if (a === 'General') return -1;
    if (b === 'General') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Learning Paths</h1>
        <p className="text-muted-foreground mt-2">
          Explore curated content to get you up to speed.
        </p>
      </div>

      <div className="space-y-8">
        {sortedDepartments.map((dept) => {
          if (groupedModules[dept].length === 0) return null;
          return (
            <Card key={dept}>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{dept} Path</CardTitle>
                <CardDescription>
                  {dept === userDepartment
                    ? 'Modules specifically for your role.'
                    : dept === 'General'
                    ? 'Essential modules for everyone at the company.'
                    : `Modules for the ${dept} department.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {groupedModules[dept].map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
