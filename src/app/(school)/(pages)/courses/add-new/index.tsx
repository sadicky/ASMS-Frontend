import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Assign Course" />
      <main>
        <PageBreadcrumb title="Assign Course" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
