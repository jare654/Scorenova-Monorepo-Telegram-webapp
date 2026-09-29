import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import AuthProvider from '@/features/auth/AuthProvider';
import { useAuthStore } from '@/lib/store';

// Eager load core tabs to prevent suspense flashes
import HomePage from '@/features/home/HomePage';
import PracticePage from '@/features/practice/PracticePage';
import ScannerPage from '@/features/scanner/ScannerPage';
import MockExamPage from '@/features/mock-exam/MockExamPage';
import ProfilePage from '@/features/profile/ProfilePage';

// Lazy load secondary pages
const TopicsPage = React.lazy(() => import('@/features/practice/TopicsPage'));
const QuestionPlayer = React.lazy(() => import('@/features/practice/QuestionPlayer'));
const QuizPage = React.lazy(() => import('@/features/practice/QuizPage'));

const ScanResultPage = React.lazy(() => import('@/features/scanner/ScanResultPage'));
const ScanHistoryPage = React.lazy(() => import('@/features/scanner/ScanHistoryPage'));

const MockExamListPage = React.lazy(() => import('@/features/mock-exam/MockExamListPage'));
const ExamTakingPage = React.lazy(() => import('@/features/mock-exam/ExamTakingPage'));
const ExamResultsPage = React.lazy(() => import('@/features/mock-exam/ExamResultsPage'));

const EditProfilePage = React.lazy(() => import('@/features/profile/EditProfilePage'));
const StudyGoalsPage = React.lazy(() => import('@/features/profile/StudyGoalsPage'));
const EditGoalsPage = React.lazy(() => import('@/features/profile/EditGoalsPage'));
const AchievementsPage = React.lazy(() => import('@/features/profile/AchievementsPage'));
const AllBadgesPage = React.lazy(() => import('@/features/profile/AllBadgesPage'));
const AllMilestonesPage = React.lazy(() => import('@/features/profile/AllMilestonesPage'));
const BookmarksPage = React.lazy(() => import('@/features/profile/BookmarksPage'));
const ChangePasswordPage = React.lazy(() => import('@/features/profile/ChangePasswordPage'));
const DeleteAccountPage = React.lazy(() => import('@/features/profile/DeleteAccountPage'));

const ProgressPage = React.lazy(() => import('@/features/progress/ProgressPage'));
const SettingsPage = React.lazy(() => import('@/features/settings/SettingsPage'));
const UpgradePage = React.lazy(() => import('@/features/upgrade/UpgradePage'));
const NotificationsPage = React.lazy(() => import('@/features/notifications/NotificationsPage'));
const HelpPage = React.lazy(() => import('@/features/profile/HelpPage'));
const AboutPage = React.lazy(() => import('@/features/profile/AboutPage'));
const FeedbackPage = React.lazy(() => import('@/features/feedback/FeedbackPage'));
const ProfileSetupPage = React.lazy(() => import('@/features/auth/ProfileSetupPage'));
const OnboardingPage = React.lazy(() => import('@/features/auth/OnboardingPage'));

function PageSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense 
      fallback={
        <div className="flex-1 flex items-center justify-center h-full min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-[#0D367A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const handleLogout = () => {
      useAuthStore.getState().logout();
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/onboarding" element={<PageSuspense><OnboardingPage /></PageSuspense>} />
        <Route path="/setup" element={<PageSuspense><ProfileSetupPage /></PageSuspense>} />

        <Route element={isAuthenticated ? <AppShell /> : <Navigate to="/onboarding" replace />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/:subjectId/topics" element={<PageSuspense><TopicsPage /></PageSuspense>} />
          <Route path="/practice/:topicId/questions" element={<PageSuspense><QuestionPlayer /></PageSuspense>} />
          <Route path="/practice/:topicId/quiz" element={<PageSuspense><QuizPage /></PageSuspense>} />

          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/scanner/result" element={<PageSuspense><ScanResultPage /></PageSuspense>} />
          <Route path="/scanner/history" element={<PageSuspense><ScanHistoryPage /></PageSuspense>} />

          <Route path="/mock-exams" element={<MockExamPage />} />
          <Route path="/mock-exams/:subjectId" element={<PageSuspense><MockExamListPage /></PageSuspense>} />
          <Route path="/mock-exams/:examId/take" element={<PageSuspense><ExamTakingPage /></PageSuspense>} />
          <Route path="/mock-exams/:sessionId/results" element={<PageSuspense><ExamResultsPage /></PageSuspense>} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<PageSuspense><EditProfilePage /></PageSuspense>} />
          <Route path="/profile/progress" element={<PageSuspense><ProgressPage /></PageSuspense>} />
          <Route path="/profile/goals" element={<PageSuspense><StudyGoalsPage /></PageSuspense>} />
          <Route path="/profile/goals/edit" element={<PageSuspense><EditGoalsPage /></PageSuspense>} />
          <Route path="/profile/achievements" element={<PageSuspense><AchievementsPage /></PageSuspense>} />
          <Route path="/profile/achievements/badges" element={<PageSuspense><AllBadgesPage /></PageSuspense>} />
          <Route path="/profile/achievements/milestones" element={<PageSuspense><AllMilestonesPage /></PageSuspense>} />
          <Route path="/profile/bookmarks" element={<PageSuspense><BookmarksPage /></PageSuspense>} />
          <Route path="/profile/password" element={<PageSuspense><ChangePasswordPage /></PageSuspense>} />
          <Route path="/profile/delete-account" element={<PageSuspense><DeleteAccountPage /></PageSuspense>} />

          <Route path="/settings" element={<PageSuspense><SettingsPage /></PageSuspense>} />
          <Route path="/upgrade" element={<PageSuspense><UpgradePage /></PageSuspense>} />
          <Route path="/notifications" element={<PageSuspense><NotificationsPage /></PageSuspense>} />
          <Route path="/feedback" element={<PageSuspense><FeedbackPage /></PageSuspense>} />
          <Route path="/help" element={<PageSuspense><HelpPage /></PageSuspense>} />
          <Route path="/about" element={<PageSuspense><AboutPage /></PageSuspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}
