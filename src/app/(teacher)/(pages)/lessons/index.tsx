import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Lessons View" />
      <main>
        <PageBreadcrumb subtitle="Lessons" title="Lessons view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
