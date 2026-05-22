import PageBreadcrumb from '@/components/PageBreadcrumb';
import AddNew from './components/AddNew';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Add Attendance" />
      <main>
        <PageBreadcrumb title="Add Attendance" subtitle="Menu" />
        <AddNew />
      </main>
    </>
  );
};

export default Index;
