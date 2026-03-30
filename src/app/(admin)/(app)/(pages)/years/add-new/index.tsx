import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add School Year" />
      <main>
        <PageBreadcrumb title="Add School Year" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
