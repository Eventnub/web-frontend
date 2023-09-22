import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import PlainDashboardLayout from '../layouts/dashboard/Plain';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

// components
import LoadingScreen from '../components/LoadingScreen';

import RenderAfterLogin from './RenderAfterLogin';

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
const ProfilePage = Loadable(lazy(() => import('../pages/ProfilePage')));

// Main
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const EventDetailsPage = Loadable(lazy(() => import('../pages/EventDetailsPage')));
const AboutPage = Loadable(lazy(() => import('../pages/About')));
const ContactUsPage = Loadable(lazy(() => import('../pages/ContactUs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Events
const BecomeEventHostPage = Loadable(lazy(() => import('../pages/BecomeEventHost')));
const CreateEventPage = Loadable(lazy(() => import('../pages/myEvent/CreateEvent')));
const MyEventsPage = Loadable(lazy(() => import('../pages/myEvent/MyEventsPage')));
const MyEvetnDetailsPage = Loadable(lazy(() => import('../pages/myEvent/MyEventDetailsPage')));
const UpdateEvent = Loadable(lazy(() => import('../pages/myEvent/UpdateEvent')));

// Games
const QuizPage = Loadable(lazy(() => import('../pages/Quiz')));
const QuizCompletedPage = Loadable(lazy(() => import('../pages/QuizCompleted')));
const QuestionPage = Loadable(lazy(() => import('../pages/Question')));
const RafflePage = Loadable(lazy(() => import('../pages/Raffle')));
const BeatGameActivatedPage = Loadable(lazy(() => import('../pages/BeatGameActivated')));
const MusicMatchPage = Loadable(lazy(() => import('../pages/MusicMatch')));

// Payment
const CheckOutPage = Loadable(lazy(() => import('../pages/CheckOutPage')));

// My Result
const UserResults = Loadable(lazy(() => import('../pages/results/UserResults')));

// Leaderboard
const Leaderboard = Loadable(lazy(() => import('../pages/leaderboard/Leaderboard')));

export default function Router() {
  return useRoutes([
    // Authentication Routes
    {
      path: 'auth',
      children: [
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
        { element: <RenderAfterLogin />, index: true },
        { path: 'events', element: <Events /> },
        { path: 'tickets', element: <TicketsDashboard /> },
        { path: 'profile', element: <ProfilePage /> },
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
      path: 'become-event-host',
      element: (
        <AuthGuard>
          <BecomeEventHostPage />
        </AuthGuard>
      ),
    },
    {
      path: 'create-event',
      element: (
        <AuthGuard>
          <CreateEventPage />
        </AuthGuard>
      ),
    },
    {
      path: 'update-event/:eventId',
      element: (
        <AuthGuard>
          <UpdateEvent />
        </AuthGuard>
      ),
    },
    {
      path: 'my-events',
      element: (
        <AuthGuard>
          <MyEventsPage />
        </AuthGuard>
      ),
    },
    {
      path: 'my-event-details/:eventId',
      element: (
        <AuthGuard>
          <MyEvetnDetailsPage />
        </AuthGuard>
      ),
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
      path: 'music-match/:eventId',
      element: (
        <AuthGuard>
          <MusicMatchPage />
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
    {
      path: 'my-results',
      element: (
        <AuthGuard>
          <UserResults />
        </AuthGuard>
      ),
    },
    {
      path: 'leaderboard',
      element: (
        <AuthGuard>
          <Leaderboard />
        </AuthGuard>
      ),
    },

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
