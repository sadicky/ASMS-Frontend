import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Assessment" />
      <main>
        <PageBreadcrumb title="Add Assessment" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
