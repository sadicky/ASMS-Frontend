import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Staff View" />
      <main>
        <PageBreadcrumb subtitle="Staff" title="List view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
