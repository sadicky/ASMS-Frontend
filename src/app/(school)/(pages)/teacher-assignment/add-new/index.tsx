import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Assign Teacher" />
      <main>
        <PageBreadcrumb title="Assign Teacher" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
