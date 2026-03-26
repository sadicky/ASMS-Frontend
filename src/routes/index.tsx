// import { Navigate, Route, Routes } from 'react-router-dom';
// import { layoutsRoutes, singlePageRoutes } from './Routes';
// import PageWrapper from '@/components/PageWrapper';
// import ProtectedRoute from '@/guards/ProtectedRoute';

// const AppRoutes = () => {
//   return (
//     <>
//       <Routes>
//          {/* REDIRECT ROOT -> LOGIN */}
//         <Route path="/" element={<Navigate to="/auth" replace />} />
//         {/* <Route path="/logout" element={<Logout />} /> */}

//         {layoutsRoutes.map(route => (
//           <Route element={<ProtectedRoute/>}>
//           <Route
//             key={route.name}
//             path={route.path}
//             element={<PageWrapper>{route.element}</PageWrapper>}
//           />
//           </Route>
//         ))}

//         {singlePageRoutes.map(route => (
//           // <Route element={<ProtectedRoute/>}>
//             <Route key={route.name} path={route.path} element={route.element} />
//           // </Route>
//         ))}
//         <Route path="*" element={<Navigate to="/404" replace />} />
//       </Routes>
//     </>
//   );
// };

// export default AppRoutes;

import { Navigate, Route, Routes } from 'react-router-dom';
import { layoutsRoutes, singlePageRoutes } from './Routes';
import PageWrapper from '@/components/PageWrapper';
import ProtectedRoute from '@/guards/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* REDIRECT ROOT -> LOGIN */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* ROUTES PROTEGEES */}
      {layoutsRoutes.map(route => (
        <Route
          key={route.name}
          element={<ProtectedRoute allowedRoles={route.roles} />}
        >
          <Route
            path={route.path}
            element={<PageWrapper>{route.element}</PageWrapper>}
          />
        </Route>
      ))}

      {/* ROUTES PUBLIQUES */}
      {singlePageRoutes.map(route => (
        <Route key={route.name} path={route.path} element={route.element} />
      ))}

      {/* 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;