import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProjectMember } from "@/models/ProjectMember.entity";
import { Tag } from "./Tag.entity";
import { Language } from "./Language.entity";
import { TextMaster } from "./TextMaster.entity";

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

  @OneToMany(() => TextMaster, (textMaster) => textMaster.project)
  readonly textMasters?: TextMaster[];

  @OneToMany(() => Language, (language) => language.project)
  readonly languages?: Language[];

  @OneToMany(() => Tag, (tag) => tag.project)
  readonly tags?: Tag[];
}
