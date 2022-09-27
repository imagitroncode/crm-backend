import { PhoneNumberTypes } from "src/shared/enums/phone-number.types.enum";

exports.up = async (knex) => {
  const organizationsTableExists = await knex.schema.hasTable("organizations");
  if (!organizationsTableExists) {
    await knex.schema.createTable("organizations", (t) => {
      t.increments("id").unsigned().primary();
      t.string("uuid", 36);
      t.string("name", 250).notNullable();
      t.integer("super_admin_id").unsigned().notNullable();
      t.integer("created_by").unsigned().notNullable();
      t.dateTime("created_at").notNullable().default(knex.fn.now());
      t.integer("last_updated_by").unsigned().notNullable();
      t.dateTime("last_updated_at").notNullable().default(knex.fn.now());
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_uuid
      ON organizations(uuid)
    `);

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_super_admin_id
      ON organizations(super_admin_id)
    `);

    await knex("organizations").insert([
      {
        id: 1,
        uuid: "a5d0e6ff-6488-4f99-a38e-4403a8d064ca",
        name: "Imagitron Inc",
        super_admin_id: 1,
        created_by: 1,
        last_updated_by: 1,
      },
    ]);
  }

  const rolesTableExists = await knex.schema.hasTable("roles");
  if (!rolesTableExists) {
    await knex.schema.createTable("roles", (t) => {
      t.increments("id").primary().unsigned();
      t.string("uuid", 36).notNullable();
      t.string("name", 255).notNullable();
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_uuid
      ON roles (uuid)
    `);

    await knex("roles").insert([
      {
        id: 1,
        uuid: "1e5ae5bf-8da9-4b81-8dac-4c2fd5d98760",
        name: "Owner",
      },
    ]);
  }

  const peopleTableExists = await knex.schema.hasTable("people");
  if (!peopleTableExists) {
    await knex.schema.createTable("people", (t) => {
      t.increments("id").unsigned().primary();
      t.string("uuid", 36);
      t.string("title", 20);
      t.string("first_name", 250);
      t.string("middle_name", 250);
      t.string("last_name", 250).notNullable();
      t.string("suffix", 250);
      t.integer("created_by").unsigned().notNullable();
      t.dateTime("created_at").notNullable().default(knex.fn.now());
      t.integer("last_updated_by").unsigned().notNullable();
      t.dateTime("last_updated_at").notNullable().default(knex.fn.now());
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_uuid
      ON people(uuid)
    `);

    await knex("people").insert([
      {
        id: 1,
        uuid: "1c115940-e1d7-46f9-9947-c4a14a6aa7ca",
        first_name: "Raj",
        last_name: "N",
        created_by: 1,
        last_updated_by: 1,
      },
    ]);
  }

  const usersTableExists = await knex.schema.hasTable("users");
  if (!usersTableExists) {
    await knex.schema.createTable("users", (t) => {
      t.increments("id").primary().unsigned();
      t.string("uuid", 36);
      t.string("username", 250).notNullable();
      t.string("password", 250).notNullable();
      t.integer("organization_id").unsigned().notNullable();
      t.integer("person_id").unsigned().notNullable();
      t.integer("role_id").unsigned().notNullable();
      t.integer("created_by").unsigned().notNullable();
      t.dateTime("created_at").notNullable().default(knex.fn.now());
      t.integer("last_updated_by").unsigned().notNullable();
      t.dateTime("last_updated_at").notNullable().default(knex.fn.now());
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_uuid 
      ON users(uuid)
    `);
    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_username 
      ON users(username)
    `);

    await knex("users").insert([
      {
        uuid: "b87bfb3d-3da7-4d37-a2a0-7f5318a990d8",
        username: "raj@imagitroninc.com",
        password: "some-password",
        organization_id: 1,
        person_id: 1,
        role_id: 1,
        created_by: 1,
        last_updated_by: 1,
      },
    ]);

    await knex.schema.raw(`
      ALTER TABLE users
      ADD CONSTRAINT fk_users_person_id
      FOREIGN KEY (person_id)
      REFERENCES people(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE users
      ADD CONSTRAINT fk_users_role_id
      FOREIGN KEY (role_id)
      REFERENCES roles(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE users 
      ADD CONSTRAINT fk_users_organization_id 
      FOREIGN KEY (organization_id) 
      REFERENCES organizations(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE users 
      ADD CONSTRAINT fk_users_created_by 
      FOREIGN KEY (created_by) 
      REFERENCES users(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE users 
      ADD CONSTRAINT fk_users_last_updated_by 
      FOREIGN KEY (last_updated_by) 
      REFERENCES users(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE organizations 
      ADD CONSTRAINT fk_organizations_created_by 
      FOREIGN KEY (created_by) 
      REFERENCES users(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE organizations 
      ADD CONSTRAINT fk_organizations_last_updated_by 
      FOREIGN KEY (last_updated_by) 
      REFERENCES users(id)
    `);
  }

  const addressesTableExists = await knex.schema.hasTable("addresses");
  if (!addressesTableExists) {
    await knex.schema.createTable("addresses", (t) => {
      t.increments("id").primary().unsigned();
      t.string("uuid", 36);
      t.string("country_code", 2).notNullable();
      t.string("address_line_1", 4000).notNullable();
      t.string("address_line_2", 4000);
      t.string("address_line_3", 4000);
      t.string("town_or_city").notNullable();
      t.string("region_1").notNullable();
      t.string("region_2");
      t.string("zip_code", 10).notNullable();
      t.boolean("primary").notNullable().default(false);
      t.enum("address_type", ["home", "office"]);
      t.integer("created_by").unsigned().notNullable();
      t.dateTime("created_at").notNullable().default(knex.fn.now());
      t.integer("last_updated_by").unsigned().notNullable();
      t.dateTime("last_updated_at").notNullable().default(knex.fn.now());
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_uuid
      ON addresses(uuid)
    `);

    await knex.schema.raw(`
      ALTER TABLE addresses 
      ADD CONSTRAINT fk_addresses_created_by 
      FOREIGN KEY (created_by) 
      REFERENCES users(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE addresses 
      ADD CONSTRAINT fk_addresses_last_updated_by 
      FOREIGN KEY (last_updated_by) 
      REFERENCES users(id)
    `);
  }

  const locationsTableExists = await knex.schema.hasTable("locations");
  if (!locationsTableExists) {
    await knex.schema.createTable("locations", (t) => {
      t.increments("id").unsigned().primary();
      t.string("uuid", 36);
      t.integer("organization_id").unsigned().notNullable();
      t.integer("address_id").unsigned().notNullable();
      t.integer("created_by").unsigned().notNullable();
      t.dateTime("created_at").notNullable().default(knex.fn.now());
      t.integer("last_updated_by").unsigned().notNullable();
      t.dateTime("last_updated_at").notNullable().default(knex.fn.now());
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_uuid
      ON locations(uuid)
    `);

    await knex.schema.raw(`
      ALTER TABLE locations
      ADD CONSTRAINT fk_locations_address_id
      FOREIGN KEY (address_id)
      REFERENCES addresses(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE locations 
      ADD CONSTRAINT fk_locations_organization_id 
      FOREIGN KEY (organization_id) 
      REFERENCES organizations(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE locations 
      ADD CONSTRAINT fk_locations_created_by 
      FOREIGN KEY (created_by) 
      REFERENCES users(id)
    `);

    await knex.schema.raw(`
      ALTER TABLE locations 
      ADD CONSTRAINT fk_locations_last_updated_by 
      FOREIGN KEY (last_updated_by) 
      REFERENCES users(id)
    `);
  }

  const rolePermissionsTableExists = await knex.schema.hasTable(
    "role_permissions",
  );
  if (!rolePermissionsTableExists) {
    await knex.schema.createTable("role_permissions", (t) => {
      t.integer("role_id").unsigned().notNullable();
      t.enum("action", [
        "createOwn",
        "createAny",
        "updateOwn",
        "updateAny",
        "deleteOwn",
        "deleteAny",
        "readOwn",
        "readAny",
      ]).notNullable();
      t.enum("resource", [
        "organization",
        "user",
        "person",
        "address",
        "phone_number",
        "role",
      ]).notNullable();
    });

    await knex.schema.raw(`
      ALTER TABLE role_permissions
      ADD CONSTRAINT fk_role_permissions_role_id
      FOREIGN KEY (role_id)
      REFERENCES roles(id);
    `);

    await knex("role_permissions").insert([
      { role_id: 1, action: "createAny", resource: "organization" },
      { role_id: 1, action: "updateAny", resource: "organization" },
      { role_id: 1, action: "deleteAny", resource: "organization" },
      { role_id: 1, action: "readAny", resource: "organization" },
      { role_id: 1, action: "createAny", resource: "user" },
      { role_id: 1, action: "updateAny", resource: "user" },
      { role_id: 1, action: "deleteAny", resource: "user" },
      { role_id: 1, action: "readAny", resource: "user" },
      { role_id: 1, action: "createAny", resource: "person" },
      { role_id: 1, action: "updateAny", resource: "person" },
      { role_id: 1, action: "deleteAny", resource: "person" },
      { role_id: 1, action: "readAny", resource: "person" },
      { role_id: 1, action: "createAny", resource: "address" },
      { role_id: 1, action: "updateAny", resource: "address" },
      { role_id: 1, action: "deleteAny", resource: "address" },
      { role_id: 1, action: "readAny", resource: "address" },
      { role_id: 1, action: "createAny", resource: "phone_number" },
      { role_id: 1, action: "updateAny", resource: "phone_number" },
      { role_id: 1, action: "deleteAny", resource: "phone_number" },
      { role_id: 1, action: "readAny", resource: "phone_number" },
      { role_id: 1, action: "createAny", resource: "role" },
      { role_id: 1, action: "updateAny", resource: "role" },
      { role_id: 1, action: "deleteAny", resource: "role" },
      { role_id: 1, action: "readAny", resource: "role" },
    ]);
  }

  const emailsTableExists = await knex.schema.hasTable("emails");
  if (!emailsTableExists) {
    await knex.schema.createTable("emails", (t) => {
      t.increments("id").unsigned().primary();
      t.string("email", 250);
      t.boolean("primary").notNullable().default(true);
      t.integer("person_id").unsigned().notNullable();
    });

    await knex.schema.raw(`
      CREATE UNIQUE INDEX idx_email
      ON emails(email)
    `);

    await knex.schema.raw(`
      ALTER TABLE emails
      ADD CONSTRAINT fk_emails_person_id
      FOREIGN KEY (person_id)
      REFERENCES people(id)
    `);
  }

  const phoneNumbersTableExists = await knex.schema.hasTable("phone_numbers");
  if (!phoneNumbersTableExists) {
    await knex.schema.createTable("phone_numbers", (t) => {
      t.increments("id").primary().notNullable();
      t.integer("person_id").unsigned().notNullable();
      t.string("country_code", 5).notNullable().default("+1");
      t.string("phone_number", 10).notNullable();
      t.boolean("primary").notNullable().default(true);
      t.enum("phone_number_types", ["mobile", "office", "home"]).notNullable();
      t.string("extension", 10);
    });

    await knex.schema.raw(`
      ALTER TABLE phone_numbers
      ADD CONSTRAINT fk_phone_numbers_person_id
      FOREIGN KEY (person_id)
      REFERENCES people(id)
    `);
  }
};

exports.down = async (knex) => {
  const phoneNumbersTableExists = await knex.schema.hasTable("phone_numbers");
  if (phoneNumbersTableExists) {
    await knex.schema.dropTable("phone_numbers");
  }

  const emailsTableExists = await knex.schema.hasTable("emails");
  if (emailsTableExists) {
    await knex.schema.dropTable("emails");
  }

  const rolePermissionsTableExists = await knex.schema.hasTable(
    "role_permissions",
  );
  if (rolePermissionsTableExists) {
    await knex.schema.dropTable("role_permissions");
  }

  const locationsTableExists = await knex.schema.hasTable("locations");
  if (locationsTableExists) {
    await knex.schema.dropTable("locations");
  }

  const addressesTableExists = await knex.schema.hasTable("addresses");
  if (addressesTableExists) {
    await knex.schema.dropTable("addresses");
  }

  const usersTableExists = await knex.schema.hasTable("users");
  if (usersTableExists) {
    await knex.schema.raw(`
      ALTER TABLE organizations
      DROP CONSTRAINT fk_organizations_created_by
    `);
    await knex.schema.raw(`
      ALTER TABLE organizations
      DROP CONSTRAINT fk_organizations_last_updated_by
    `);
    await knex.schema.dropTable("users");
  }

  const peopleTableExists = await knex.schema.hasTable("people");
  if (peopleTableExists) {
    await knex.schema.dropTable("people");
  }

  const rolesTableExists = await knex.schema.hasTable("roles");
  if (rolesTableExists) {
    await knex.schema.dropTable("roles");
  }

  const organizationsTableExists = await knex.schema.hasTable("organizations");
  if (organizationsTableExists) {
    await knex.schema.dropTable("organizations");
  }
};
