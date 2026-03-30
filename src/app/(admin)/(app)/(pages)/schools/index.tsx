import PageBreadcrumb from '@/components/PageBreadcrumb';
import DirListTabel from './components/ClusterListTabel';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Clusters View" />
      <main>
        <PageBreadcrumb subtitle="Clusters" title="List view" />
        <DirListTabel />
      </main>
    </>
  );
};

export default Index;
