import { Injectable } from "@nestjs/common";
import { OrganizationDataServiceInterface } from "./interfaces/organization.data.service.interface";

@Injectable()
export class OrganizationMySqlService
  implements OrganizationDataServiceInterface {}
