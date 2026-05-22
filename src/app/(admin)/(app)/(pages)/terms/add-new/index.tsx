import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Term" />
      <main>
        <PageBreadcrumb title="Add Term" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
