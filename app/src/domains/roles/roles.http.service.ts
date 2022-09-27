import { Inject, Injectable } from "@nestjs/common";
import { RolesRecordInterface } from "./interfaces/roles.record.interface";
import { RolesService } from "./roles.service";

@Injectable()
export class RolesHttpService {
  constructor(
    @Inject("ROLES_SERVICE") private readonly service: RolesService,
  ) {}

  public async getAllRoles(): Promise<RolesRecordInterface[]> {
    return await this.service.getAllRoles();
  }
}
