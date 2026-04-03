import PageBreadcrumb from '@/components/PageBreadcrumb';
import SchoolListTabel from './components/SchoolListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="School View" />
      <main>
        <PageBreadcrumb subtitle="School" title="List view" />
        <SchoolListTabel />
      </main>
    </>
  );
};

export default Index;
