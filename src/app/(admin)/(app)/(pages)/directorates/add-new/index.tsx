import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Directorate" />
      <main>
        <PageBreadcrumb title="Add Directorate" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
