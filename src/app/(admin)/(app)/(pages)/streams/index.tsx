import PageBreadcrumb from '@/components/PageBreadcrumb';
import RegionListTabel from './components/ListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Streams View" />
      <main>
        <PageBreadcrumb subtitle="Streams" title="Streams view" />
        <RegionListTabel />
      </main>
    </>
  );
};

export default Index;
