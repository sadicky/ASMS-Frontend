import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Attendances View" />
      <main>
        <PageBreadcrumb subtitle="Attendances" title="Attendances view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
