import { Inject } from "@nestjs/common";
import { RolesDataServiceInterface } from "./interfaces/roles.data.service.interface";
import { RolesRecordInterface } from "./interfaces/roles.record.interface";

export class RolesDataService implements RolesDataServiceInterface {
  constructor(
    @Inject("ROLES_MYSQL_SERVICE")
    private readonly mysqlService: RolesDataServiceInterface,
  ) {}
  public async getAllRoleNames(): Promise<RolesRecordInterface[]> {
    return await this.mysqlService.getAllRoleNames();
  }
}
