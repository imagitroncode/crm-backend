import { RolesDataServiceInterface } from "./interfaces/roles.data.service.interface";
import { RolesRecordInterface } from "./interfaces/roles.record.interface";
import { InjectKnex, Knex } from "nestjs-knex";

export class RolesMySqlService implements RolesDataServiceInterface {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  public async getAllRoleNames(): Promise<RolesRecordInterface[]> {
    interface AllRolesQueryResponseInterface {
      uuid: string;
      name: string;
    }

    const allRolesQueryResponse: {
      0: AllRolesQueryResponseInterface[];
    } = await this.knex.raw(`
        SELECT uuid, name
        FROM roles
        WHERE 1=1
    `);

    if (allRolesQueryResponse[0].length === 0) {
      return;
    }

    const rows = allRolesQueryResponse[0];

    return rows.map((row) => {
      return {
        name: row.name,
        uuid: row.uuid,
      };
    });
  }
}
