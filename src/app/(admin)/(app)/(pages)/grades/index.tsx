import PageBreadcrumb from '@/components/PageBreadcrumb';
import GradeListTabel from './components/GradeList';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Grade View" />
      <main>
        <PageBreadcrumb subtitle="Grades" title="Grades view" />
        <GradeListTabel />
      </main>
    </>
  );
};

export default Index;
