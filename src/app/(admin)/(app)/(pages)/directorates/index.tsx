import PageBreadcrumb from '@/components/PageBreadcrumb';
import DirListTabel from './components/DirListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Directorates View" />
      <main>
        <PageBreadcrumb subtitle="Directorates" title="List view" />
        <DirListTabel />
      </main>
    </>
  );
};

export default Index;
