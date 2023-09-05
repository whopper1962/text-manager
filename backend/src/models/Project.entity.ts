import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProjectMember } from "./ProjectMember.entity";
import { ProjectText } from "./ProjectText.entity";
import { ProjectTag } from "./ProjectTag.entity";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "name",
  })
  name!: string;

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

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
  readonly projectMembers?: ProjectMember[];

  @OneToMany(() => ProjectText, (projectText) => projectText.project)
  readonly projectTexts?: ProjectText[];

  @OneToMany(() => ProjectTag, (projectTag) => projectTag.project)
  readonly projectTags?: ProjectTag[];
}
