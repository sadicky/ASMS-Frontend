import PageBreadcrumb from '@/components/PageBreadcrumb';
import ClasseListTabel from './components/ClassList';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Class View" />
      <main>
        <PageBreadcrumb subtitle="Classes" title="Class view" />
        <ClasseListTabel />
      </main>
    </>
  );
};

export default Index;
