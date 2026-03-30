import PageBreadcrumb from '@/components/PageBreadcrumb';
import YearListTabel from './components/YearListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="School Years View" />
      <main>
        <PageBreadcrumb subtitle="School Years" title="All School Years" />
        <YearListTabel />
      </main>
    </>
  );
};

export default Index;
