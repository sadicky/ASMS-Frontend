import 'flatpickr/dist/flatpickr.css';
import 'swiper/swiper-bundle.css';
import { Toaster } from "react-hot-toast";
import '@/assets/css/style.css';
import ProvidersWrapper from './components/ProvidersWrapper';
import AppRoutes from './routes';

const App = () => {
  return (
    <ProvidersWrapper>
      <Toaster position="top-right" />
      <AppRoutes />
    </ProvidersWrapper>
  );
};

export default App;
