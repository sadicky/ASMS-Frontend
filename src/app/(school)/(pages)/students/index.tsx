import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="School View" />
      <main>
        <PageBreadcrumb subtitle="School" title="List view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
