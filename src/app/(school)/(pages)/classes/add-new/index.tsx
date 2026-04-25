import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Class" />
      <main>
        <PageBreadcrumb title="Add Class" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
