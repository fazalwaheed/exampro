export type UserRole = 'student' | 'admin';

export type StudentRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  createdAt: string;
  testsCompleted: number;
  avgScore: number;
  status: 'Active' | 'Inactive';
  joinedDate: string;
  lastActive: string;
};

export type AdminRecord = {
  email: string;
  password: string;
  name: string;
};

export type MCQRecord = {
  id: number;
  question: string;
  subject: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  createdAt: string;
};

export type SessionRecord = {
  role: UserRole;
  email: string;
  name: string;
  loginAt: string;
};

type OtpPurpose = 'register' | 'login';

type OtpSession = {
  email: string;
  code: string;
  purpose: OtpPurpose;
  createdAt: string;
};

type PlatformState = {
  students: StudentRecord[];
  admins: AdminRecord[];
  mcqs: MCQRecord[];
  currentSession: SessionRecord | null;
  otpSession: OtpSession | null;
};

const STORAGE_KEY = 'exampro-platform-state';

const defaultState: PlatformState = {
  students: [
    {
      id: 'stu-1',
      name: 'Ahmed Khan',
      email: 'ahmed.khan@example.com',
      phone: '+92 300 1234567',
      verified: true,
      createdAt: '2026-01-15',
      testsCompleted: 45,
      avgScore: 78,
      status: 'Active',
      joinedDate: '2026-01-15',
      lastActive: '2 hours ago',
    },
    {
      id: 'stu-2',
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com',
      phone: '+92 301 2345678',
      verified: true,
      createdAt: '2026-01-10',
      testsCompleted: 52,
      avgScore: 85,
      status: 'Active',
      joinedDate: '2026-01-10',
      lastActive: '1 hour ago',
    },
    {
      id: 'stu-3',
      name: 'Hassan Raza',
      email: 'hassan.raza@example.com',
      phone: '+92 302 3456789',
      verified: true,
      createdAt: '2026-02-01',
      testsCompleted: 38,
      avgScore: 72,
      status: 'Active',
      joinedDate: '2026-02-01',
      lastActive: '5 hours ago',
    },
  ],
  admins: [
    {
      email: 'admin@mdcatprep.com',
      password: 'admin123',
      name: 'Platform Admin',
    },
  ],
  mcqs: [
    {
      id: 1,
      question: 'Which organelle is responsible for protein synthesis?',
      subject: 'Biology',
      category: 'Cell Biology',
      difficulty: 'Medium',
      optionA: 'Mitochondria',
      optionB: 'Ribosome',
      optionC: 'Golgi apparatus',
      optionD: 'Lysosome',
      correctAnswer: 'B',
      explanation: 'Ribosomes are the cellular structures that assemble proteins.',
      createdAt: '2026-05-20',
    },
    {
      id: 2,
      question: 'What is the general formula for alkanes?',
      subject: 'Chemistry',
      category: 'Organic Chemistry',
      difficulty: 'Easy',
      optionA: 'CnH2n',
      optionB: 'CnH2n+2',
      optionC: 'CnH2n-2',
      optionD: 'CnHn',
      correctAnswer: 'B',
      explanation: 'Alkanes are saturated hydrocarbons with the formula CnH2n+2.',
      createdAt: '2026-05-19',
    },
    {
      id: 3,
      question: "According to Newton's second law, force equals:",
      subject: 'Physics',
      category: 'Mechanics',
      difficulty: 'Easy',
      optionA: 'm / a',
      optionB: 'm x a',
      optionC: 'm + a',
      optionD: 'a / m',
      correctAnswer: 'B',
      explanation: 'Force equals mass multiplied by acceleration.',
      createdAt: '2026-05-18',
    },
  ],
  currentSession: null,
  otpSession: null,
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readState(): PlatformState {
  if (!canUseStorage()) {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    writeState(defaultState);
    return defaultState;
  }

  try {
    return { ...defaultState, ...JSON.parse(raw) } as PlatformState;
  } catch {
    writeState(defaultState);
    return defaultState;
  }
}

function writeState(state: PlatformState) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getPlatformState() {
  return readState();
}

export function getCurrentSession() {
  return readState().currentSession;
}

export function logout() {
  const state = readState();
  writeState({ ...state, currentSession: null });
}

export function registerStudent(input: { name: string; email: string; phone: string }) {
  const state = readState();
  const email = input.email.trim().toLowerCase();

  if (state.students.some((student) => student.email === email)) {
    return { ok: false as const, message: 'This email is already registered for a student account.' };
  }

  const nextStudent: StudentRecord = {
    id: `stu-${Date.now()}`,
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    verified: false,
    createdAt: new Date().toISOString(),
    testsCompleted: 0,
    avgScore: 0,
    status: 'Inactive',
    joinedDate: new Date().toISOString().slice(0, 10),
    lastActive: 'Never',
  };

  const otpSession: OtpSession = {
    email,
    code: '123456',
    purpose: 'register',
    createdAt: new Date().toISOString(),
  };

  writeState({
    ...state,
    students: [...state.students, nextStudent],
    otpSession,
  });

  return { ok: true as const, email, otp: otpSession.code };
}

export function startStudentLogin(emailInput: string) {
  const state = readState();
  const email = emailInput.trim().toLowerCase();
  const student = state.students.find((item) => item.email === email);

  if (!student) {
    return { ok: false as const, message: 'No student account found for this email.' };
  }

  if (!student.verified) {
    return { ok: false as const, message: 'This email is not verified yet. Please complete registration first.' };
  }

  if (state.currentSession?.role === 'student' && state.currentSession.email === email) {
    return { ok: false as const, message: 'This student email is already logged in on one active session.' };
  }

  const otpSession: OtpSession = {
    email,
    code: '123456',
    purpose: 'login',
    createdAt: new Date().toISOString(),
  };

  writeState({
    ...state,
    otpSession,
  });

  return { ok: true as const, email, otp: otpSession.code, name: student.name };
}

export function verifyStudentOtp(emailInput: string, otp: string) {
  const state = readState();
  const email = emailInput.trim().toLowerCase();
  const session = state.otpSession;

  if (!session || session.email !== email) {
    return { ok: false as const, message: 'OTP session expired. Please request a new code.' };
  }

  if (session.code !== otp) {
    return { ok: false as const, message: 'Incorrect OTP code.' };
  }

  const students = state.students.map((student) =>
    student.email === email
      ? {
          ...student,
          verified: true,
          status: 'Active' as const,
          lastActive: 'Just now',
        }
      : student,
  );

  const activeStudent = students.find((student) => student.email === email);
  if (!activeStudent) {
    return { ok: false as const, message: 'Student account not found.' };
  }

  const currentSession: SessionRecord = {
    role: 'student',
    email,
    name: activeStudent.name,
    loginAt: new Date().toISOString(),
  };

  writeState({
    ...state,
    students,
    currentSession,
    otpSession: null,
  });

  return { ok: true as const, session: currentSession };
}

export function resendOtp(emailInput: string) {
  const state = readState();
  const email = emailInput.trim().toLowerCase();

  if (!state.otpSession || state.otpSession.email !== email) {
    return { ok: false as const, message: 'No pending OTP session found for this email.' };
  }

  const otpSession: OtpSession = {
    ...state.otpSession,
    code: '123456',
    createdAt: new Date().toISOString(),
  };

  writeState({
    ...state,
    otpSession,
  });

  return { ok: true as const, otp: otpSession.code };
}

export function loginAdmin(input: { email: string; password: string }) {
  const state = readState();
  const email = input.email.trim().toLowerCase();
  const admin = state.admins.find((item) => item.email === email && item.password === input.password);

  if (!admin) {
    return { ok: false as const, message: 'Invalid admin email or password.' };
  }

  const currentSession: SessionRecord = {
    role: 'admin',
    email: admin.email,
    name: admin.name,
    loginAt: new Date().toISOString(),
  };

  writeState({
    ...state,
    currentSession,
  });

  return { ok: true as const, session: currentSession };
}

export function addMcq(input: Omit<MCQRecord, 'id' | 'createdAt'>) {
  const state = readState();
  const nextId = state.mcqs.length ? Math.max(...state.mcqs.map((item) => item.id)) + 1 : 1;
  const mcq: MCQRecord = {
    ...input,
    id: nextId,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  writeState({
    ...state,
    mcqs: [mcq, ...state.mcqs],
  });

  return mcq;
}

export function deleteMcq(id: number) {
  const state = readState();
  writeState({
    ...state,
    mcqs: state.mcqs.filter((item) => item.id !== id),
  });
}
