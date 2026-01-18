export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TRAINER" | "STUDENT";
};

export const MOCK_USERS: MockUser[] = [
  {
    id: "u_admin_001",
    name: "Admin Test",
    email: "admin@digitechpro.test",
    role: "ADMIN",
  },
  {
    id: "u_trainer_001",
    name: "Formateur Test",
    email: "trainer@digitechpro.test",
    role: "TRAINER",
  },
  {
    id: "u_student_001",
    name: "Apprenant Test",
    email: "student@digitechpro.test",
    role: "STUDENT",
  },
];
