import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from 'routes';

import Loader from 'components/atoms/Loader';

const LandingPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((item: any) => (
          <Route
            key={item.path}
            path={item.path}
            element={<Suspense fallback={<Loader />}>{item.component}</Suspense>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default LandingPage;
