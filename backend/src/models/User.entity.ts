import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProjectMember } from "@/models/ProjectMember.entity";
import * as bcrypt from "bcrypt";
import { TextMaster } from "./TextMaster.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    name: "name",
    nullable: true,
  })
  name!: string;

  @Column({
    name: "password",
  })
  password!: string;

  @Column({
    name: "email",
    unique: true,
  })
  email!: string;

  @Column({
    name: "profile_image",
    nullable: true,
  })
  profileImage!: string;

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

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.member)
  readonly projectMembers!: ProjectMember[];

  @OneToMany(() => TextMaster, (textMaster) => textMaster.updater)
  readonly updaters!: TextMaster[];

  @BeforeInsert()
  async hashPassword() {
    console.error("HASH PASSWORD");
    this.password = await bcrypt.hash(this.password, 10);
  }
}
