import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add GradeBook" />
      <main>
        <PageBreadcrumb title="Add GradeBook" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
