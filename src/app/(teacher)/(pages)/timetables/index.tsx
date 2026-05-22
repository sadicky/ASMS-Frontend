import PageBreadcrumb from '@/components/PageBreadcrumb';
import RegionListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Timetable View" />
      <main>
        <PageBreadcrumb subtitle="Timetables" title="Timetable view" />
        <RegionListTabel />
      </main>
    </>
  );
};

export default Index;
