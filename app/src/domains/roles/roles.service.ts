import { Inject, Injectable } from "@nestjs/common";
import { RolesDataServiceInterface } from "./interfaces/roles.data.service.interface";
import { RolesRecordInterface } from "./interfaces/roles.record.interface";

@Injectable()
export class RolesService {
  constructor(
    @Inject("ROLES_DATA_SERVICE")
    private readonly dataService: RolesDataServiceInterface,
  ) {}

  public async getAllRoles(): Promise<RolesRecordInterface[]> {
    return await this.dataService.getAllRoleNames();
  }
}
