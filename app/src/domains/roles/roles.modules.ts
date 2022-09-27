import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesDataService } from "./roles.data.service";
import { RolesHttpService } from "./roles.http.service";
import { RolesMySqlService } from "./roles.mysql.service";
import { RolesService } from "./roles.service";

@Module({
  controllers: [RolesController],
  providers: [
    {
      provide: "ROLES_DATA_SERVICE",
      useClass: RolesDataService,
    },
    {
      provide: "ROLES_MYSQL_SERVICE",
      useClass: RolesMySqlService,
    },
    {
      provide: "ROLES_HTTP_SERVICE",
      useClass: RolesHttpService,
    },
    {
      provide: "ROLES_SERVICE",
      useClass: RolesService,
    },
  ],
  exports: ["ROLES_SERVICE"],
})
export class RolesModule {}
