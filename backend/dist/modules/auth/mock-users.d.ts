export type MockUser = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "TRAINER" | "STUDENT";
};
export declare const MOCK_USERS: MockUser[];
