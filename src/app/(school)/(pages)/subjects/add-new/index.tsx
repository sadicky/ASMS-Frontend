import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Subject" />
      <main>
        <PageBreadcrumb title="Add Subject" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
