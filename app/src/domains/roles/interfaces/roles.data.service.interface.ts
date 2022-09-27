import { RolesRecordInterface } from "./roles.record.interface";

export interface RolesDataServiceInterface {
  getAllRoleNames(): Promise<RolesRecordInterface[]>;
}
