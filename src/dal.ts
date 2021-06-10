import { environment } from './environment';
import { Pool } from 'pg';

export class DAL {

  public pool: Pool;

  constructor() {
    this.pool = new Pool({
      database: environment.dbName,
      host: environment.dbHost,
      port: environment.dbPort,
      user: environment.dbUser,
      password: environment.dbPassword,
      max: environment.dbPoolMax,
      idleTimeoutMillis: environment.dbPoolConnectionTimeoutMillis,
      connectionTimeoutMillis: environment.dbPoolConnectionTimeoutMillis,
    });
  }

  // const connectToDb : () => {
  //   const client = await this.pool.connect();
  //   try {

  //   } catch (error) {

  //   } finally {

  //   }
  // }

  public async getTenantById(id: String) {
    const client = await this.pool.connect();
    try {

      const res = await client.query("select * from tenant where id='" + id + "'");
      console.log(res.rows[0]);
      return res.rows[0];

    } catch (error) {
      console.log(error);
      return null;
    } finally {
      client.release();
    }
  }

  public async getTenantByName(name: String) {
    console.log("trying to connect")
    const client = await this.pool.connect();
    console.log("conneected")
    try {

      const res = await client.query("select * from tenant where name='" + name + "'");
      console.log(res.rows[0]);
      return res.rows[0];

    } catch (error) {
      console.log(error);
      return null;
    } finally {
      client.release();
    }
  }


  public async getTenants() {
    const client = await this.pool.connect();
    try {
      const res = await client.query("select * from tenant");
      console.log(res.rows);
      return res.rows;

    } catch (error) {
      console.log(error);
      return null;
    } finally {
      client.release();
    }
  }

  public async createTenant(name: String, label: String) {
    const client = await this.pool.connect();
    try {
      const res = await client.query("INSERT INTO tenant(name, label, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING *", [name, label, new Date(), new Date()]);
      if (res.rows)
        return true

      else
        throw (res);

    } catch (error) {
      console.log(error);
      return false
    } finally {
      client.release();
    }
  }

  public async getUsers() {
    const client = await this.pool.connect();
    try {

      const res = await client.query("select * from users");
      console.log(res.rows);
      return res.rows;

    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }

  public async getUserByName(firstName: String) {
    const client = await this.pool.connect();
    try {

      const res = await client.query("select * from users where first_name=$1", [firstName]);
      console.log(res.rows[0]);
      return res.rows[0];


    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }

  public async getUserByEmail(email: String) {
    const client = await this.pool.connect();
    try {

      const res = await client.query("select * from users where email=$1", [email]);
      console.log(res.rows[0]);
      return res.rows[0];

    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }

  public async getUserByTenantID(tenantId: String) {
    const client = await this.pool.connect();
    try {

      const res = await client.query("SELECT * FROM USERS WHERE tenant_id=$1", [tenantId]);
      console.log(res.rows);
      return res.rows;

    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }


  public async getUsersByTenantName(tenant_name: String) {
    const client = await this.pool.connect();
    try {

      const res = await client.query("SELECT * FROM USERS RIGHT JOIN TENANT ON USERS.tenant_id = TENANT.id WHERE TENANT.name=$1", [tenant_name]);
      console.log(res.rows);
      return res.rows;

    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }

  public async createUser(tenant_id: String, email: String, first_name: String, last_name: String) {
    const client = await this.pool.connect();
    try {

      const res = await client.query("INSERT INTO users(email, first_name, last_name, created_at, updated_at, tenant_id ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [email, first_name, last_name, new Date(), new Date(), tenant_id]);
      console.log(res.rows);
      if (res)
        return true;

    } catch (error) {
      console.log(error);
      return false;
    } finally {
      client.release();
    }
  }

  public async updateUser(id: String, email: String, first_name: String, last_name: String) {

    const client = await this.pool.connect();
    try {

      let query = "UPDATE USERS SET ";
      if (email != null)
        query += ("email='" + email + "',")

      if (first_name != null)
        query += ("first_name='" + first_name + "',")

      if (last_name != null)
        query += ("last_name='" + last_name + "',")

      query += ("updated_at=$1 WHERE id=$2")
      console.log(query);
      const res = await client.query(query, [Date.now(), id])
      return true;

    } catch (err) {
      console.log(err);
      return false;
    } finally {
      client.release();
    }

  }

  public async updateTenant(id: String, name: String, label: String) {

    const client = await this.pool.connect();
    try {

      let query = "UPDATE TENANT SET ";
      if (name != null)
        query += ("email='" + name + "',")

      if (label != null)
        query += ("label='" + label + "',")

      query += ("updated_at=$1 WHERE id=$2")
      console.log(query);
      const res = await client.query(query, [Date.now(), id])
      return true;

    } catch (err) {
      console.log(err);
      return false;
    } finally {
      client.release();
    }

  }

  /**
   * Methods here for CRUD access to DB records - rename to best practises
   * 
   * getTenantByName(id) - eg SELECT * FROM tenants WHERE id=?
   * getTenantById(name) - eg SELECT * FROM tenants WHERE name=?
   * getTenants - eg SELECT * FROM tenants?
   * createTenant(name, label) - eg INSERT INTO tenants (name, label) VALUES (?,?)
   * updateTenant(id, name, label) - eg UPDATE tenants SET(name=?, label=?, updated_at=(now() at time zone 'utc')) WHERE id=?
   * - it would be nice to only update the supplied columns
   * 
   * getUserByName(id) - eg SELECT * FROM users WHERE id=?
   * getUserByEmail(email) - eg SELECT * FROM users WHERE email=?
   * getUsersByTenantId(id) - eg SELECT * FROM users WHERE tenant_id=?
   * getUsersByTenantName(name) - eg SELECT * FROM users JOIN tenants ON users.tenant_id=tenants.id WHERE tenants.name=?
   * 
   * createUser(tenant_id, email, first_name, last_name) - eg INSERT INTO tenants (tenant_id, email, first_name, last_name) VALUES (?,?,?,?)
   * updateUser(id, tenant_id, email, first_name, last_name) - eg UPDATE tenants SET(tenant_id=?, email=?, first_name=?, last_name=?, updated_at=(now() at time zone 'utc')) WHERE id=?
   * - it would be nice to only update the supplied columns
   */

};