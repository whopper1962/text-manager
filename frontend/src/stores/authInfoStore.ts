import { User } from "@/types/users";
import { defineStore } from "pinia";
import { Project } from "@/types/projects";

interface State {
  userId: string;
  userName: string;
  userProfileImage: string;
  usersProjects: Project[];
}

export const useAuthInfoStore = defineStore("authInfoStore", {
  state: (): State => ({
    userId: "",
    userName: "",
    userProfileImage: "",
    usersProjects: [],
  }),
  actions: {
    setAuthInfo(user: User) {
      this.userId = user.id;
      this.userName = user.name;
      this.userProfileImage = user.profileImage;
    },
  },
  persist: true,
});
