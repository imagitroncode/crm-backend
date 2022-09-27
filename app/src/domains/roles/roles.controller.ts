import { Controller, Get, Headers, Inject } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesRecordInterface } from "./interfaces/roles.record.interface";
import { RolesHttpService } from "./roles.http.service";

@Controller("roles")
@ApiTags("Roles")
export class RolesController {
  constructor(
    @Inject("ROLES_HTTP_SERVICE")
    private readonly httpService: RolesHttpService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Get a list of all Roles",
  })
  public async getAllRoles(@Headers() headers) {
    const roles: RolesRecordInterface[] = await this.httpService.getAllRoles();
    return {
      status: 201,
      data: roles,
    };
  }
}
