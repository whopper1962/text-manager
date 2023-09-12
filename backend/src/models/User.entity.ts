import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProjectMember } from "@/models/ProjectMember.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "last_name",
  })
  lastName!: string;

  @Column({
    name: "first_name",
  })
  firstName!: string;

  @Column({
    name: "password",
  })
  password!: string;

  @Column({
    name: "email",
  })
  email!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  readonly createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  readonly updatedAt!: Date;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.member)
  readonly projectMembers!: ProjectMember[];
}
