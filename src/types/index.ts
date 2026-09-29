// ===== User & Account Types =====

export interface User {
  id: string;
  name: string;
  phone_number?: string;
  email?: string;
  type: 'student' | 'admin';
  gender?: 'male' | 'female';
  is_active: boolean;
  is_premium: boolean;
  premium_start_date?: string;
  premium_end_date?: string;
  premium_plan?: string;
  stream_id?: string;
  stream?: Stream;
  grade_id?: string;
  grade?: Grade;
  fcm_id?: string;
  profile_image_filename?: string;
  telegram_id?: number;
  telegram_username?: string;
  telegram_photo_url?: string;
  study_goals?: StudyGoals;
  created_at: string;
  updated_at: string;
}

export interface StudyGoals {
  daily_questions?: number;
  daily_study_minutes?: number;
  weekly_study_days?: number;
}

// ===== Curriculum Types =====

export interface Stream {
  id: string;
  name: string;
  description?: string;
}

export interface Grade {
  id: string;
  name: string;
  description?: string;
}

export interface Subject {
  id: string;
  name: string;
  stream_id?: string;
  stream?: Stream;
  grade_id?: string;
  description?: string;
  is_free: boolean;
  access_type: 'free' | 'paid';
  topic_count?: number;
  question_count?: number;
}

export interface Topic {
  id: string;
  name: string;
  subject_id: string;
  description?: string;
  duration_minutes?: number;
  is_free: boolean;
  access_type: 'free' | 'paid';
  question_count?: number;
}

// ===== Question Types =====

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer: number; // 0-based index (correctIndex)
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  subject_id?: string;
  topic_id?: string;
  subject?: Subject;
  topic?: Topic;
}

export interface QuestionExplanation {
  id: string;
  question_id: string;
  step_by_step: string;
  clear: string;
  simplified: string;
}

export interface SavedQuestion {
  id: string;
  question_id: string;
  question: Question;
  created_at: string;
}

export interface QuestionFlag {
  id: string;
  question_id: string;
  account_id: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
}

// ===== Practice Types =====

export interface PracticeSubject {
  id: string;
  name: string;
  stream_id?: string;
  is_free: boolean;
  access_type: 'free' | 'paid';
  topic_count: number;
  question_count: number;
}

export interface PracticeTopic {
  id: string;
  name: string;
  subject_id: string;
  duration_minutes: number;
  is_free: boolean;
  access_type: 'free' | 'paid';
  question_count: number;
}

export interface PracticeQuestion {
  id: string;
  text: string;
  choices: string[];
  correctIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

// ===== Mock Exam Types =====

export interface MockExamSubject {
  id: string;
  name: string;
  exam_count: number;
}

export interface MockExam {
  id: string;
  label: string;
  subject_id: string;
  subject?: Subject;
  question_count: number;
  duration_minutes: number;
  is_free: boolean;
  access_type: 'free' | 'paid';
  status: 'pending' | 'completed' | 'failed';
}

export interface MockExamSession {
  session_id: string;
  exam_id: string;
  questions: MockExamQuestion[];
  duration_minutes: number;
}

export interface MockExamQuestion {
  question: string;
  choices: string[];
  // answer and explanation are hidden until submission
  answer?: number;
  explanation?: string;
}

export interface MockExamResult {
  id: string;
  exam_id: string;
  account_id: string;
  subject_id: string;
  session_id: string;
  total_questions: number;
  correct_answers: number;
  score_percent: number;
  passed: boolean;
  taken_at: string;
  subject?: Subject;
  answers?: MockExamAnswer[];
}

export interface MockExamAnswer {
  question: string;
  choices: string[];
  selected_answer: number;
  correct_answer: number;
  is_correct: boolean;
  explanation?: string;
}

// ===== Progress & Analytics Types =====

export interface UserProgress {
  overall_accuracy: number;
  study_streak: number;
  total_study_hours: number;
  questions_today: number;
  total_questions_attempted: number;
  weekly_chart: WeeklyChartPoint[];
  subject_stats: SubjectStat[];
  recent_mock_attempts: MockExamResult[];
}

export interface WeeklyChartPoint {
  day: string;
  questions: number;
  correct: number;
}

export interface SubjectStat {
  subject_id: string;
  subject_name: string;
  total_attempted: number;
  correct: number;
  accuracy: number;
}

export interface SubjectProgress {
  subject_id: string;
  subject_name: string;
  topics: TopicProgress[];
}

export interface TopicProgress {
  topic_id: string;
  topic_name: string;
  total_questions: number;
  attempted: number;
  correct: number;
  accuracy: number;
}

// ===== AI Types =====

export interface AiExplanation {
  step_by_step: string;
  clear: string;
  simplified: string;
}

export interface ScanResult {
  id?: string;
  question: string;
  given_data?: string;
  formula_used?: string;
  step_by_step_solution: string;
  final_answer: string;
  created_at?: string;
}

// ===== Notification Types =====

export interface Notification {
  id: string;
  title: string;
  body: string;
  type?: string;
  read: boolean;
  created_at: string;
}

// ===== Feedback Types =====

export interface Feedback {
  id: string;
  account_id: string;
  message: string;
  rating?: number;
  created_at: string;
}

// ===== Settings / Plans Types =====

export interface PremiumPlan {
  name: string;
  price: number;
  duration_days: number;
  currency: string;
  savings_percent?: number;
}

export interface PremiumSettings {
  plans: PremiumPlan[];
  telegramSupport: string;
  freeSubjectId?: string;
}

// ===== Attempt Types =====

export interface ExamSession {
  id: string;
  account_id: string;
  subject_id: string;
  subject_name?: string;
  total_questions: number;
  correct_answers: number;
  score_percent: number;
  passed: boolean;
  created_at: string;
}

// ===== Achievement Types =====

export interface Achievement {
  id: string;
  type: 'badge' | 'milestone';
  title: string;
  description: string;
  icon?: string;
  unlocked: boolean;
  unlocked_at?: string;
  progress?: number;
  target?: number;
}

// ===== Auth Response Types =====

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TelegramAuthResponse {
  status: 'authenticated' | 'new_user' | 'link_required';
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  telegramId?: number;
}

// ===== API Response Wrappers =====

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiSuccessResponse {
  message: string;
  status: string;
}
