import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add School" />
      <main>
        <PageBreadcrumb title="Add School" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
