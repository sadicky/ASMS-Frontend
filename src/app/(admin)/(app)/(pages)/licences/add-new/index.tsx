import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="School Licence" />
      <main>
        <PageBreadcrumb title="Licence" subtitle="School" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
