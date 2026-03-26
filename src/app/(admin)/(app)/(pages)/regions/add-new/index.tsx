import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Region" />
      <main>
        <PageBreadcrumb title="Add Region" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
