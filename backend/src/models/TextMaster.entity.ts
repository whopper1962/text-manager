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
import { Project } from "./Project.entity";
import { TextContent } from "./TextContent.entity";
import { Bookmark } from "./Bookmark.entity";
import { User } from "./User.entity";

@Entity("text_masters")
export class TextMaster {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "alias",
    nullable: true,
  })
  alias!: string;

  @Column({
    name: "memo",
    type: "text",
    nullable: true,
  })
  memo!: string;

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

  @ManyToOne(() => User, (user) => user.updaters)
  @JoinColumn({
    name: "updater_id",
    referencedColumnName: "id",
  })
  updater!: User;

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

  @OneToMany(() => Bookmark, (bookmark) => bookmark.textMaster)
  readonly bookmarks!: Bookmark[];
}
