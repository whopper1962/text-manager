import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "./Project.entity";
import { Tag } from "./Tag.entity";

@Entity("project_tags")
export class ProjectTag {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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

  @ManyToOne(() => Project, (project) => project.projectTexts)
  @JoinColumn({
    name: "project_id",
    referencedColumnName: "id",
  })
  project?: Project;

  @OneToOne(() => Tag, (text) => text.projectTags)
  @JoinColumn({
    name: "tag_id",
    referencedColumnName: "id",
  })
  tag?: Tag;
}
