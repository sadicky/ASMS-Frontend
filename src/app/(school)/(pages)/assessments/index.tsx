import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Assessments View" />
      <main>
        <PageBreadcrumb subtitle="Assessments" title="Assessments view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
