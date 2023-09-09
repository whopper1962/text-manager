import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Tag } from "@/models/Tag.entity";
import { TextMaster } from "./TextMaster.entity";

@Entity("bookmarks")
export class Bookmark {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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

  // TODO: Validation unique text_master_id+tag_id
  @ManyToOne(() => TextMaster, (textMaster) => textMaster.textTags)
  @JoinColumn({
    name: "text_master_id",
    referencedColumnName: "id",
  })
  textMaster!: TextMaster;

  @ManyToOne(() => Tag, (tag) => tag.textTags)
  @JoinColumn({
    name: "project_member_id",
    referencedColumnName: "id",
  })
  projectMember!: Tag;
}
