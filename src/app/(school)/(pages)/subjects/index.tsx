import PageBreadcrumb from '@/components/PageBreadcrumb';
import RegionListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Subjects View" />
      <main>
        <PageBreadcrumb subtitle="Subjects" title="Subjects view" />
        <RegionListTabel />
      </main>
    </>
  );
};

export default Index;
