import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Cluster" />
      <main>
        <PageBreadcrumb title="Add Cluster" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
