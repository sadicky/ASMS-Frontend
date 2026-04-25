import PageBreadcrumb from '@/components/PageBreadcrumb';
import ClassDetail from './components/Details';
import PageMeta from '@/components/PageMeta';

const Index = () => {
  return (
    <>
      <PageMeta title="Class Overview" />
      <main>
        <PageBreadcrumb title="Overview" subtitle="Classes" />
        <div className="grid lg:grid-cols-1 grid-cols-1 lg:gap-5">
          {/* <Product /> */}
          <div className="lg:col-span-1 col-span-1">
            <div className="card">
              <div className="card-body">
                <ClassDetail />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
