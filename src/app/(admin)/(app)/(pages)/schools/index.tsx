import PageBreadcrumb from '@/components/PageBreadcrumb';
import SchoolListTabel from './components/SchoolListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Schools View" />
      <main>
        <PageBreadcrumb subtitle="Schools" title="List view" />
        <SchoolListTabel />
      </main>
    </>
  );
};

export default Index;
