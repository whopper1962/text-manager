import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProjectText } from "@/models/ProjectText.entity";
import { TextTag } from "@/models/TextTag.entity";

@Entity("texts")
export class Text {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "content",
  })
  content!: string;

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

  @OneToOne(() => ProjectText, (projectText) => projectText.text)
  readonly projectText?: ProjectText;

  @OneToMany(() => TextTag, (textTag) => textTag.text)
  readonly textTags?: TextTag[];
}
