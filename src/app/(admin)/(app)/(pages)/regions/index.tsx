import PageBreadcrumb from '@/components/PageBreadcrumb';
import RegionListTabel from './components/RegionListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Regions View" />
      <main>
        <PageBreadcrumb subtitle="Regions" title="Regions view" />
        <RegionListTabel />
      </main>
    </>
  );
};

export default Index;
