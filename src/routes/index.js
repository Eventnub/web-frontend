import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import PlainDashboardLayout from '../layouts/dashboard/Plain';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname?.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

// const Auth = Loadable(lazy(() => import('../pages/auth/Auth')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));

// Dashboard
const Events = Loadable(lazy(() => import('../pages/dashboard/Events')));
const TicketsDashboard = Loadable(lazy(() => import('../pages/TicketsDashboard')));
// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const EventDetailsPage = Loadable(lazy(() => import('../pages/EventDetailsPage')));
const AboutPage = Loadable(lazy(() => import('../pages/About')));
const ContactUsPage = Loadable(lazy(() => import('../pages/ContactUs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Games
const QuizPage = Loadable(lazy(() => import('../pages/Quiz')));
const QuizCompletedPage = Loadable(lazy(() => import('../pages/QuizCompleted')));
const QuestionPage = Loadable(lazy(() => import('../pages/Question')));
const RafflePage = Loadable(lazy(() => import('../pages/Raffle')));
const BeatGameActivatedPage = Loadable(lazy(() => import('../pages/BeatGameActivated')));
const NameTheBeatPage = Loadable(lazy(() => import('../pages/NameTheBeat')));

// Payment
const CheckOutPage = Loadable(lazy(() => import('../pages/CheckOutPage')));

export default function Router() {
  return useRoutes([
    // Authentication Routes
    {
      path: 'auth',
      children: [
        // {
        //   element: (
        //     <GuestGuard>
        //       <Auth />
        //     </GuestGuard>
        //   ),
        //   index: true,
        // },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: (
            <GuestGuard>
              <ForgotPassword />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <PlainDashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'events', element: <Events /> },
        { path: 'tickets', element: <TicketsDashboard /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <HomePage />,
      index: true,
    },
    {
      path: 'about',
      element: <AboutPage />,
    },
    {
      path: 'event-details/:eventId',
      element: <EventDetailsPage />,
    },
    {
      path: 'contact-us',
      element: <ContactUsPage />,
    },
    {
      path: 'quiz/:eventId',
      element: (
        <AuthGuard>
          <QuizPage />
        </AuthGuard>
      ),
    },
    {
      path: 'quiz-completed',
      element: <QuizCompletedPage />,
    },
    {
      path: 'question/:eventId',
      element: (
        <AuthGuard>
          <QuestionPage />,
        </AuthGuard>
      ),
    },
    {
      path: 'raffle/:eventId',
      element: (
        <AuthGuard>
          <RafflePage />,
        </AuthGuard>
      ),
    },
    {
      path: 'beat-game-activated/:eventId',
      element: (
        <AuthGuard>
          <BeatGameActivatedPage />
        </AuthGuard>
      ),
    },
    {
      path: 'name-the-beat/:eventId',
      element: (
        <AuthGuard>
          <NameTheBeatPage />
        </AuthGuard>
      ),
    },
    {
      path: 'payment/:eventId',
      element: (
        <AuthGuard>
          <CheckOutPage />
        </AuthGuard>
      ),
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
