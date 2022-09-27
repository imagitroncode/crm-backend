import { Module } from "@nestjs/common";
import { OrganizationModule } from "./domains/organization/organization.module";
import { RolesModule } from "./domains/roles/roles.modules";
import { UsersModule } from "./domains/users/users.module";
import { databaseModules } from "./shared/database";

@Module({
  imports: [...databaseModules, OrganizationModule, UsersModule, RolesModule],
})
export class AppModule {}
