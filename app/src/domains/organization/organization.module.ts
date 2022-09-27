import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationDataService } from "./organization.data.service";
import { OrganizationHttpService } from "./organization.http.service";
import { OrganizationMySqlService } from "./organization.mysql.service";
import { OrganizationService } from "./organization.service";

@Module({
  controllers: [OrganizationController],
  providers: [
    {
      provide: "ORGANIZATION_SERVICE",
      useClass: OrganizationService,
    },
    {
      provide: "ORGANIZATION_DATA_SERVICE",
      useClass: OrganizationDataService,
    },
    {
      provide: "ORGANIZATION_MYSQL_SERVICE",
      useClass: OrganizationMySqlService,
    },
    {
      provide: "ORGANIZATION_HTTP_SERVICE",
      useClass: OrganizationHttpService,
    },
  ],
  exports: ["ORGANIZATION_SERVICE"],
})
export class OrganizationModule {}
