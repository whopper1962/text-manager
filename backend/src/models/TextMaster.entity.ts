import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TextTag } from "@/models/TextTag.entity";
import { Language } from "./Language.entity";
import { Project } from "./Project.entity";
import { TextContent } from "./TextContent.entity";

@Entity("text_masters")
export class TextMaster {
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

  @ManyToOne(() => Project, (project) => project.textMasters)
  @JoinColumn({
    name: "project_id",
    referencedColumnName: "id",
  })
  project?: Project;

  @OneToMany(() => TextTag, (textTag) => textTag.textMaster)
  readonly textTags!: TextTag[];

  @OneToMany(() => TextContent, (textContent) => textContent.textMaster)
  readonly textContents!: TextContent[];
}