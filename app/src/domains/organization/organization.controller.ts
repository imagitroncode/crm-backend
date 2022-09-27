import { Controller, Get, Headers } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("organizations")
@ApiTags("Organizations")
export class OrganizationController {
  constructor() {}

  @Get()
  @ApiOperation({
    summary: "Get a list of all organizations",
  })
  public async getOrganizations(@Headers() headers) {
    throw new Error("Method not yet implemented");
  }
}
