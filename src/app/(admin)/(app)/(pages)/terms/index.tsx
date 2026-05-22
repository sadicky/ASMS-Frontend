import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Terms View" />
      <main>
        <PageBreadcrumb subtitle="Terms" title="Terms view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
