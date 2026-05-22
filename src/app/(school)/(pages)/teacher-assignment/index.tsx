import PageBreadcrumb from '@/components/PageBreadcrumb';
import RegionListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Courses View" />
      <main>
        <PageBreadcrumb subtitle="Courses" title="Courses view" />
        <RegionListTabel />
      </main>
    </>
  );
};

export default Index;
