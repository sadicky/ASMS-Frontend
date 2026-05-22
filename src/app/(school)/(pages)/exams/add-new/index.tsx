import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Exam" />
      <main>
        <PageBreadcrumb title="Add Exam" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
