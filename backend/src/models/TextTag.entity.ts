import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Text } from "@/models/Text.entity";
import { Tag } from "@/models/Tag.entity";

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

  @ManyToOne(() => Text, (text) => text.textTags)
  @JoinColumn({
    name: "text_id",
    referencedColumnName: "id",
  })
  text?: Text;

  @ManyToOne(() => Tag, (tag) => tag.textTags)
  @JoinColumn({
    name: "tag_id",
    referencedColumnName: "id",
  })
  tag?: Tag;
}
