export const MemberRole = {
  MAINTAINER: "MAINTAINER", // can read create delete
  DEVELOPER: "DEVELOPER", // can read create
  GUEST: "GUEST", // can read
} as const;

export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];
