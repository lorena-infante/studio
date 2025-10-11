import Image from 'next/image';
import { user } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function GamificationSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Stats</CardTitle>
        <CardDescription>Points and badges you&apos;ve earned.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Points</h3>
          <p className="text-4xl font-bold text-primary">{user.points}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Badges</h3>
          <TooltipProvider>
            <div className="flex flex-wrap gap-3 mt-2">
              {user.badges.map((badge) => {
                const badgeImage = PlaceHolderImages.find(p => p.imageUrl === badge.icon);
                return (
                  <Tooltip key={badge.id}>
                    <TooltipTrigger asChild>
                      <div className="relative h-14 w-14 rounded-full border-2 border-accent p-1 transition-transform hover:scale-110">
                        <Image
                          src={badge.icon}
                          alt={badge.name}
                          width={64}
                          height={64}
                          className="rounded-full"
                          data-ai-hint={badgeImage?.imageHint}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{badge.name}</p>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
