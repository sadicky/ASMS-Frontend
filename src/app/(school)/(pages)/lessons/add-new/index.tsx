import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Lesson Session" />
      <main>
        <PageBreadcrumb title="Add Lesson Session" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
