import { gql } from 'apollo-server-lambda';

  /**
   * schema here for CRUD access to DB records - rename to best practises - see dal.ts
   * 
   * getTenantByName(id)
   * getTenantById(name)
   * getTenants
   * createTenant(name, label) 
   * updateTenant(id, name, label)
   * 
   * getUserByName(id)
   * getUserByEmail(email)
   * getUsersByTenantId(id)
   * getUsersByTenantName(name)
   * 
   * createUser(tenant_id, email, first_name, last_name)
   * updateUser(id, tenant_id, email, first_name, last_name)
   */

export const typeDefs = gql`
  type Query {
    testMessage: String!
    getTenants: [Tenant]
    getTenantById(id: String!): Tenant
    getTenantByName(name: String!): Tenant
    getUserByName(firstName: String!): Users
    getUserByEmail(email:String):Users
    getUserByTenantID(tenantId:String):[Users]
    getUsersByTenantName(tenant_name:String):[Users]
    getUsers: [Users]
  }
  type Tenant{
    id:String,
    name:String,
    label:String,
    createdAt:String,
    updatedAt:String
  } 
  type Users{
    id: String,
    email: String,
    firstName : String,
    lastName : String,
    createdAt: String,
    updatedAt : String,
    tenant : String
  }
  type Mutation {
    createTenant(name:String!,label:String!): Boolean
    createUser(tenant_id:String,email:String!,first_name:String!,last_name:String!): Boolean
    updateTenant(id:String!,name:String!,label:String!):Boolean
    updateUser(id:String!, email:String, first_name:String, last_name:String):Boolean
  }
`;





