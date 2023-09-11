import { MemberRole } from "@/types/projectMembers";

export type Project = {
  id: string;
  name: string;
  role: MemberRole;
};

export type CreateProjectPayload = {
  name: string;
};