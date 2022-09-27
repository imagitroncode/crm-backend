import { Module } from "@nestjs/common";
import { UsersDataService } from "./users.data.service";
import { UsersHttpService } from "./users.http.service";
import { UsersMySqlService } from "./users.mysql.service";
import { UsersService } from "./users.service";

@Module({
  providers: [
    {
      provide: "USERS_SERVICE",
      useClass: UsersService,
    },
    {
      provide: "USERS_HTTP_SERVICE",
      useClass: UsersHttpService,
    },
    {
      provide: "USERS_MYSQL_SERVICE",
      useClass: UsersMySqlService,
    },
    {
      provide: "USERS_DATA_SERVICE",
      useClass: UsersDataService,
    },
  ],
})
export class UsersModule {}
