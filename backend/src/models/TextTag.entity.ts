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

@Entity("text_tags")
export class TextTag {
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

  @ManyToOne(() => TextMaster, (textMaster) => textMaster.textTags)
  @JoinColumn({
    name: "text_master_id",
    referencedColumnName: "id",
  })
  textMaster!: TextMaster;

  @ManyToOne(() => Tag, (tag) => tag.textTags)
  @JoinColumn({
    name: "tag_id",
    referencedColumnName: "id",
  })
  tag!: Tag;
}
