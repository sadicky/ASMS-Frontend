import PageBreadcrumb from '@/components/PageBreadcrumb';
import LicenceListTabel from './components/LicenceListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Licenses View" />
      <main>
        <PageBreadcrumb subtitle="Licenses" title="List view" />
        <LicenceListTabel />
      </main>
    </>
  );
};

export default Index;
