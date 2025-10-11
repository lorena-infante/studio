import { user } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function WelcomeBanner() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-3xl">
                Welcome back, {user.name.split(' ')[0]}!
                </CardTitle>
                <CardDescription className="mt-2">
                Ready to continue your onboarding journey? Let&apos;s get started.
                </CardDescription>
            </div>
            <Badge variant="secondary">{user.department}</Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
