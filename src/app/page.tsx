import { GamificationSummary } from '@/components/dashboard/gamification-summary';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { WelcomeBanner } from '@/components/dashboard/welcome-banner';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProgressOverview />
        </div>
        <div className="md:col-span-1">
          <GamificationSummary />
        </div>
      </div>
    </div>
  );
}
