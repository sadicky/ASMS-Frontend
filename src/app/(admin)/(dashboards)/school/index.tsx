import PageBreadcrumb from '@/components/PageBreadcrumb';
import BirthdayCard from './components/BirthdayCard';
import EmployeePerformance from './components/EmployeePerformance';
import RecentPayroll from './components/RecentPayroll';
import TotalProjects from './components/TotalProjects';
import UpcomingInterview from './components/UpcomingInterview';
import UpcomingScheduled from './components/UpcomingScheduled';
import PageMeta from '@/components/PageMeta';
import Welcome from './components/Activities';

const Index = () => {
  return (
    <>
      <PageMeta title="School Dashboard" />
      <main>
        <PageBreadcrumb title="School" subtitle="Dashboard" />
        <Welcome />
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
          <div className="lg:col-span-3 col-span-1">
            <EmployeePerformance />
            <div className="grid lg:grid-cols-3 col-span-1 gap-5">
              <TotalProjects />
              <UpcomingInterview />
              <div className="col-span-1">
                <BirthdayCard />
                <RecentPayroll />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <UpcomingScheduled />
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
