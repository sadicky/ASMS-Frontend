import PageBreadcrumb from '@/components/PageBreadcrumb';
import RegionListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Exam View" />
      <main>
        <PageBreadcrumb subtitle="Exams" title="Exam view" />
        <RegionListTabel />
      </main>
    </>
  );
};

export default Index;
