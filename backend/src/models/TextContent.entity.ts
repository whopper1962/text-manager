import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Language } from "./Language.entity";
import { TextMaster } from "./TextMaster.entity";

@Entity("text_contents")
export class TextContent {
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
  readonly createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  readonly updatedAt!: Date;

  @ManyToOne(() => TextMaster, (textMaster) => textMaster.textContents)
  @JoinColumn({
    name: "text_master_id",
    referencedColumnName: "id",
  })
  textMaster!: TextMaster;

  @ManyToOne(() => Language, (language) => language.textConetnts)
  @JoinColumn({
    name: "language_id",
    referencedColumnName: "id",
  })
  language!: Language;
}
