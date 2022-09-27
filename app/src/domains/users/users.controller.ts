import { Controller, Headers, Inject, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersHttpService } from "./users.http.service";

@Controller("users")
@ApiTags("Users")
export class UsersController {
  constructor(
    @Inject("USERS_HTTP_SERVICE")
    private readonly usersHttpService: UsersHttpService,
  ) {}

  @Post(":user_uuid")
  @ApiOperation({
    summary: "Create a new user",
  })
  public async createUser(@Headers() headers) {}
}
