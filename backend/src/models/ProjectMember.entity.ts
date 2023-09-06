import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "@/models/Project.entity";
import { User } from "@/models/User.entity";
import { MemberRole } from "@/types/projectMembers";

@Entity("project_members")
export class ProjectMember {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "role",
    type: "enum",
    enum: MemberRole,
  })
  role!: MemberRole;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  readonly createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  readonly updatedAt?: Date;

  @ManyToOne(() => Project, (project) => project.projectMembers)
  @JoinColumn({
    name: "project_id",
    referencedColumnName: "id",
  })
  project?: Project;

  @ManyToOne(() => User, (user) => user.projectMembers)
  @JoinColumn({
    name: "member_id",
    referencedColumnName: "id",
  })
  member?: User;
}
