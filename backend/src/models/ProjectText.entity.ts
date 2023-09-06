import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Project } from "@/models/Project.entity";
import { Text } from "@/models/Text.entity";

@Entity("project_texts")
export class ProjectText {
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

  @OneToOne(() => Text, (text) => text.projectText)
  @JoinColumn({
    name: "text_id",
    referencedColumnName: "id",
  })
  text?: Text;
}
