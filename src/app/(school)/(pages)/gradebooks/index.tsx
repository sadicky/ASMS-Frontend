import PageBreadcrumb from '@/components/PageBreadcrumb';
import ListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="GradeBooks View" />
      <main>
        <PageBreadcrumb subtitle="GradeBooks" title="GradeBooks view" />
        <ListTabel />
      </main>
    </>
  );
};

export default Index;
