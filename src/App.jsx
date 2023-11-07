import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const LoadingComponent = lazy(() => import('./loading/LoadingComponent.jsx'));
const ErrorComponent = lazy(() => import('./error/ErrorComponent.jsx'));

const Frontpage = lazy(() => import('./views/Frontpage.jsx'));

const Services = lazy(() => import('./views/Services.jsx'));
const Service = lazy(() => import('./views/Service.jsx'));

const Dashboard = lazy(() => import('./views/Dashboard.jsx'));

const FAQ = lazy(() => import('./views/Faq.jsx'));
const Support = lazy(() => import('./views/Support.jsx'));
const SupportSuccess = lazy(() =>
  import('./views/SupportSuccess.jsx')
);
const Contact = lazy(() => import('./views/Contact.jsx'));
const ContactSuccess = lazy(() =>
  import('./views/ContactSuccess.jsx')
);

function App() {
  return (
    <>
      <Router basename="/">
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route index path="/" element={<Frontpage />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="contact/success"
              element={<ContactSuccess />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:service" element={<Service />} />
            <Route path="support" element={<Support />} />
            <Route
              path="support/success"
              element={<SupportSuccess />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
