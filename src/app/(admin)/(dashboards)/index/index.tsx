import PageBreadcrumb from '@/components/PageBreadcrumb';
import PageMeta from '@/components/PageMeta';
import Audience from './components/Audience';
import CustomerService from './components/CustomerService';
// import OrderStatistics from './components/OrderStatistics';
import ProductOrders from './components/ProductOrders';
import SalesRevenueOverview from './components/SalesRevenueOverview';
import SalesThisMonth from './components/SalesThisMonth';
import TopSellingProducts from './components/TopSellingProducts';
import TrafficResources from './components/TrafficResources';
import WelcomeUser from './components/WelcomeUser';
import PageDetails from './components/pageCount';

const Index = () => {
  return (
    <>
      <PageMeta title="Dashboard" />
      <main>
        <PageBreadcrumb title="Dashboard" subtitle="Dashboard" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
          <div className="lg:col-span-2 col-span-1">
            <WelcomeUser />
            <PageDetails />
          </div>
          {/* <OrderStatistics /> */}
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-5">
          <SalesRevenueOverview />
          <TrafficResources />
        </div>
        <ProductOrders />
        {/* <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
          <CustomerService />
          <SalesThisMonth />
          <TopSellingProducts />
          <Audience />
        </div> */}
      </main>
    </>
  );
};

export default Index;
