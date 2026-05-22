import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Stream" />
      <main>
        <PageBreadcrumb title="Add Stream" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
