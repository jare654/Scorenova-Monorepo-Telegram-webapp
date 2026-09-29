import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import AuthProvider from '@/features/auth/AuthProvider';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { useAuthStore } from '@/lib/store';

// ===== Lazy-loaded Pages =====

// Home
const HomePage = lazy(() => import('@/features/home/HomePage'));

// Practice
const PracticePage = lazy(() => import('@/features/practice/PracticePage'));
const TopicsPage = lazy(() => import('@/features/practice/TopicsPage'));
const QuestionPlayer = lazy(() => import('@/features/practice/QuestionPlayer'));
const QuizPage = lazy(() => import('@/features/practice/QuizPage'));

// Scanner
const ScannerPage = lazy(() => import('@/features/scanner/ScannerPage'));
const ScanResultPage = lazy(() => import('@/features/scanner/ScanResultPage'));
const ScanHistoryPage = lazy(() => import('@/features/scanner/ScanHistoryPage'));

// Mock Exams
const MockExamPage = lazy(() => import('@/features/mock-exam/MockExamPage'));
const MockExamListPage = lazy(() => import('@/features/mock-exam/MockExamListPage'));
const ExamTakingPage = lazy(() => import('@/features/mock-exam/ExamTakingPage'));
const ExamResultsPage = lazy(() => import('@/features/mock-exam/ExamResultsPage'));

// Profile & Settings
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));
const EditProfilePage = lazy(() => import('@/features/profile/EditProfilePage'));
const ProgressPage = lazy(() => import('@/features/progress/ProgressPage'));
const StudyGoalsPage = lazy(() => import('@/features/profile/StudyGoalsPage'));
const EditGoalsPage = lazy(() => import('@/features/profile/EditGoalsPage'));
const AchievementsPage = lazy(() => import('@/features/profile/AchievementsPage'));
const AllBadgesPage = lazy(() => import('@/features/profile/AllBadgesPage'));
const AllMilestonesPage = lazy(() => import('@/features/profile/AllMilestonesPage'));
const BookmarksPage = lazy(() => import('@/features/profile/BookmarksPage'));
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'));
const HelpPage = lazy(() => import('@/features/profile/HelpPage'));
const AboutPage = lazy(() => import('@/features/profile/AboutPage'));
const ChangePasswordPage = lazy(() => import('@/features/profile/ChangePasswordPage'));
const DeleteAccountPage = lazy(() => import('@/features/profile/DeleteAccountPage'));

// Upgrade
const UpgradePage = lazy(() => import('@/features/upgrade/UpgradePage'));

// Notifications
const NotificationsPage = lazy(() => import('@/features/notifications/NotificationsPage'));

// Feedback
const FeedbackPage = lazy(() => import('@/features/feedback/FeedbackPage'));

// Auth (for new Telegram users)
const ProfileSetupPage = lazy(() => import('@/features/auth/ProfileSetupPage'));
const OnboardingPage = lazy(() => import('@/features/auth/OnboardingPage'));

// ===== Page Wrapper with Suspense =====
function PageSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

// ===== App Component =====
export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  // Listen for auth:logout events from the API client
  useEffect(() => {
    const handleLogout = () => {
      useAuthStore.getState().logout();
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  if (false) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes for new Telegram users */}
        <Route
          path="/onboarding"
          element={
            <PageSuspense>
              <OnboardingPage />
            </PageSuspense>
          }
        />
        <Route
          path="/setup"
          element={
            <PageSuspense>
              <ProfileSetupPage />
            </PageSuspense>
          }
        />

        {/* Main app routes inside the shell */}
        <Route element={isAuthenticated ? <AppShell /> : <Navigate to="/onboarding" replace />}>
          {/* Home Tab */}
          <Route index element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <PageSuspense>
                <HomePage />
              </PageSuspense>
            }
          />

          {/* Practice Tab */}
          <Route
            path="/practice"
            element={
              <PageSuspense>
                <PracticePage />
              </PageSuspense>
            }
          />
          <Route
            path="/practice/:subjectId/topics"
            element={
              <PageSuspense>
                <TopicsPage />
              </PageSuspense>
            }
          />
          <Route
            path="/practice/:topicId/questions"
            element={
              <PageSuspense>
                <QuestionPlayer />
              </PageSuspense>
            }
          />
          <Route
            path="/practice/:topicId/quiz"
            element={
              <PageSuspense>
                <QuizPage />
              </PageSuspense>
            }
          />

          {/* Scanner Tab */}
          <Route
            path="/scanner"
            element={
              <PageSuspense>
                <ScannerPage />
              </PageSuspense>
            }
          />
          <Route
            path="/scanner/result"
            element={
              <PageSuspense>
                <ScanResultPage />
              </PageSuspense>
            }
          />
          <Route
            path="/scanner/history"
            element={
              <PageSuspense>
                <ScanHistoryPage />
              </PageSuspense>
            }
          />

          {/* Mock Exams Tab */}
          <Route
            path="/mock-exams"
            element={
              <PageSuspense>
                <MockExamPage />
              </PageSuspense>
            }
          />
          <Route
            path="/mock-exams/:subjectId"
            element={
              <PageSuspense>
                <MockExamListPage />
              </PageSuspense>
            }
          />
          <Route
            path="/mock-exams/:examId/take"
            element={
              <PageSuspense>
                <ExamTakingPage />
              </PageSuspense>
            }
          />
          <Route
            path="/mock-exams/:sessionId/results"
            element={
              <PageSuspense>
                <ExamResultsPage />
              </PageSuspense>
            }
          />

          {/* Profile Tab */}
          <Route
            path="/profile"
            element={
              <PageSuspense>
                <ProfilePage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <PageSuspense>
                <EditProfilePage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/progress"
            element={
              <PageSuspense>
                <ProgressPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/goals"
            element={
              <PageSuspense>
                <StudyGoalsPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/goals/edit"
            element={
              <PageSuspense>
                <EditGoalsPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/achievements"
            element={
              <PageSuspense>
                <AchievementsPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/achievements/badges"
            element={
              <PageSuspense>
                <AllBadgesPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/achievements/milestones"
            element={
              <PageSuspense>
                <AllMilestonesPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/bookmarks"
            element={
              <PageSuspense>
                <BookmarksPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/password"
            element={
              <PageSuspense>
                <ChangePasswordPage />
              </PageSuspense>
            }
          />
          <Route
            path="/profile/delete-account"
            element={
              <PageSuspense>
                <DeleteAccountPage />
              </PageSuspense>
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              <PageSuspense>
                <SettingsPage />
              </PageSuspense>
            }
          />

          {/* Upgrade */}
          <Route
            path="/upgrade"
            element={
              <PageSuspense>
                <UpgradePage />
              </PageSuspense>
            }
          />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={
              <PageSuspense>
                <NotificationsPage />
              </PageSuspense>
            }
          />

          {/* Feedback */}
          <Route
            path="/feedback"
            element={
              <PageSuspense>
                <FeedbackPage />
              </PageSuspense>
            }
          />

          {/* Help & About */}
          <Route
            path="/help"
            element={
              <PageSuspense>
                <HelpPage />
              </PageSuspense>
            }
          />
          <Route
            path="/about"
            element={
              <PageSuspense>
                <AboutPage />
              </PageSuspense>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}
