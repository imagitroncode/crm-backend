import { Injectable } from "@nestjs/common";
import { UsersDataServiceInterface } from "./interfaces/users.data.service.interface";

@Injectable()
export class UsersDataService implements UsersDataServiceInterface {}
