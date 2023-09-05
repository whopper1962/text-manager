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
import { ProjectTag } from "@/models/ProjectTag.entity";

@Entity("tags")
export class Tag {
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

  @OneToMany(() => TextTag, (textTag) => textTag.tag)
  readonly textTags?: TextTag[];

  @OneToMany(() => ProjectTag, (projectTag) => projectTag.tag)
  readonly projectTags?: ProjectTag[];
}
