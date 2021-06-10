/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dal.ts":
/*!********************!*\
  !*** ./src/dal.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DAL = void 0;
const environment_1 = __webpack_require__(/*! ./environment */ "./src/environment.ts");
const pg_1 = __webpack_require__(/*! pg */ "pg");
class DAL {
    constructor() {
        this.pool = new pg_1.Pool({
            database: environment_1.environment.dbName,
            host: environment_1.environment.dbHost,
            port: environment_1.environment.dbPort,
            user: environment_1.environment.dbUser,
            password: environment_1.environment.dbPassword,
            max: environment_1.environment.dbPoolMax,
            idleTimeoutMillis: environment_1.environment.dbPoolConnectionTimeoutMillis,
            connectionTimeoutMillis: environment_1.environment.dbPoolConnectionTimeoutMillis,
        });
    }
    getTenantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("select * from tenant where id='" + id + "'");
                console.log(res.rows[0]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
                return null;
            }
            finally {
                client.release();
            }
        });
    }
    getTenantByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("trying to connect");
            const client = yield this.pool.connect();
            console.log("conneected");
            try {
                const res = yield client.query("select * from tenant where name='" + name + "'");
                console.log(res.rows[0]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
                return null;
            }
            finally {
                client.release();
            }
        });
    }
    getTenants() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("select * from tenant");
                console.log(res.rows);
                return res.rows;
            }
            catch (error) {
                console.log(error);
                return null;
            }
            finally {
                client.release();
            }
        });
    }
    createTenant(name, label) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("INSERT INTO tenant(name, label, created_at, updated_at) VALUES($1, $2, $3, $4) RETURNING *", [name, label, new Date(), new Date()]);
                if (res.rows)
                    return true;
                else
                    throw (res);
            }
            catch (error) {
                console.log(error);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("select * from users");
                console.log(res.rows);
                return res.rows;
            }
            catch (error) {
                console.log(error);
            }
            finally {
                client.release();
            }
        });
    }
    getUserByName(firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("select * from users where first_name=$1", [firstName]);
                console.log(res.rows[0]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
            }
            finally {
                client.release();
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("select * from users where email=$1", [email]);
                console.log(res.rows[0]);
                return res.rows[0];
            }
            catch (error) {
                console.log(error);
            }
            finally {
                client.release();
            }
        });
    }
    getUserByTenantID(tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("SELECT * FROM USERS WHERE tenant_id=$1", [tenantId]);
                console.log(res.rows);
                return res.rows;
            }
            catch (error) {
                console.log(error);
            }
            finally {
                client.release();
            }
        });
    }
    getUsersByTenantName(tenant_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("SELECT * FROM USERS RIGHT JOIN TENANT ON USERS.tenant_id = TENANT.id WHERE TENANT.name=$1", [tenant_name]);
                console.log(res.rows);
                return res.rows;
            }
            catch (error) {
                console.log(error);
            }
            finally {
                client.release();
            }
        });
    }
    createUser(tenant_id, email, first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query("INSERT INTO users(email, first_name, last_name, created_at, updated_at, tenant_id ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [email, first_name, last_name, new Date(), new Date(), tenant_id]);
                console.log(res.rows);
                if (res)
                    return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    updateUser(id, email, first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                let query = "UPDATE USERS SET ";
                if (email != null)
                    query += ("email='" + email + "',");
                if (first_name != null)
                    query += ("first_name='" + first_name + "',");
                if (last_name != null)
                    query += ("last_name='" + last_name + "',");
                query += ("updated_at=$1 WHERE id=$2");
                console.log(query);
                const res = yield client.query(query, [Date.now(), id]);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
    updateTenant(id, name, label) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                let query = "UPDATE TENANT SET ";
                if (name != null)
                    query += ("email='" + name + "',");
                if (label != null)
                    query += ("label='" + label + "',");
                query += ("updated_at=$1 WHERE id=$2");
                console.log(query);
                const res = yield client.query(query, [Date.now(), id]);
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.DAL = DAL;
;


/***/ }),

/***/ "./src/entity/Tenant.ts":
/*!******************************!*\
  !*** ./src/entity/Tenant.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tenant = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Tenant = class Tenant {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Tenant.prototype, "label", void 0);
__decorate([
    typeorm_1.Column({ name: "created_at" }),
    __metadata("design:type", Date)
], Tenant.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "updated_at" }),
    __metadata("design:type", Date)
], Tenant.prototype, "updatedAt", void 0);
Tenant = __decorate([
    typeorm_1.Entity()
], Tenant);
exports.Tenant = Tenant;


/***/ }),

/***/ "./src/entity/User.ts":
/*!****************************!*\
  !*** ./src/entity/User.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Users = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const Tenant_1 = __webpack_require__(/*! ./Tenant */ "./src/entity/Tenant.ts");
let Users = class Users {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Tenant_1.Tenant),
    typeorm_1.JoinColumn({ name: 'tenant_id', referencedColumnName: 'id' }),
    __metadata("design:type", Tenant_1.Tenant)
], Users.prototype, "tenant", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: "first_name" }),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ name: "last_name" }),
    __metadata("design:type", String)
], Users.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ name: "created_at" }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "updated_at" }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
Users = __decorate([
    typeorm_1.Entity()
], Users);
exports.Users = Users;


/***/ }),

/***/ "./src/environment.ts":
/*!****************************!*\
  !*** ./src/environment.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    secretMessage: process.env.SECRET_MESSAGE,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT || ''),
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbPoolMax: parseInt(process.env.DB_POOL_MAX || ''),
    dbPoolIdleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT_MILLIS || ''),
    dbPoolConnectionTimeoutMillis: parseInt(process.env.DB_POOL_CONNECTION_TIMEOUT_MILLIS || ''),
};


/***/ }),

/***/ "./src/resolvers.ts":
/*!**************************!*\
  !*** ./src/resolvers.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolvers = void 0;
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const Tenant_1 = __webpack_require__(/*! ./entity/Tenant */ "./src/entity/Tenant.ts");
const User_1 = __webpack_require__(/*! ./entity/User */ "./src/entity/User.ts");
const dal_1 = __webpack_require__(/*! ./dal */ "./src/dal.ts");
function userParser(data) {
    const user = new User_1.Users();
    user.id = data.id;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    user.email = data.email;
    user.tenant = data.tenant_id;
    user.createdAt = data.created_at.toString();
    user.updatedAt = data.updated_at.toString();
    return user;
}
function userArrayParser(data) {
    const users = Array();
    data.forEach((elements) => {
        const user = new User_1.Users();
        user.id = elements.id;
        user.firstName = elements.first_name;
        user.lastName = elements.last_name;
        user.email = elements.email;
        user.createdAt = elements.created_at.toString();
        user.updatedAt = elements.updated_at.toString();
        user.tenant = elements.tenant_id;
        users.push(user);
    });
    return users;
}
function tenantParser(data) {
    const tenant = new Tenant_1.Tenant();
    tenant.name = data.name;
    tenant.label = data.label;
    tenant.createdAt = data.created_at.toString();
    tenant.updatedAt = data.updated_at.toString();
    tenant.id = data.id;
    return tenant;
}
function tenantArrayParser(data) {
    const tenants = Array();
    data.forEach((elements) => {
        const tenant = new Tenant_1.Tenant();
        tenant.name = elements.name;
        tenant.label = elements.label;
        tenant.createdAt = elements.created_at.toString();
        tenant.updatedAt = elements.updated_at.toString();
        tenant.id = elements.id;
        tenants.push(tenant);
    });
    return tenants;
}
exports.resolvers = {
    Query: {
        testMessage: () => 'Hello world',
        getTenants: () => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return tenantArrayParser(yield d.getTenants());
        }),
        getTenantById: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return tenantParser(yield d.getTenantById(id));
        }),
        getTenantByName: (_, { name }) => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return tenantParser(yield d.getTenantByName(name));
        }),
        getUserByName: (_, { firstName }) => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return userParser(yield d.getUserByName(firstName));
        }),
        getUserByEmail: (_, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return userParser(yield d.getUserByEmail(email));
        }),
        getUserByTenantID: (_, { tenantId }) => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return userArrayParser(yield d.getUserByTenantID(tenantId));
        }),
        getUsersByTenantName: (_, { tenant_name }) => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return userArrayParser(yield d.getUsersByTenantName(tenant_name));
        }),
        getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            const d = new dal_1.DAL();
            return userArrayParser(yield d.getUsers());
        })
    },
    Mutation: {
        createTenant: (_, { name, label }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const dal = new dal_1.DAL();
                const result = dal.createTenant(name, label);
                return result;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
        updateTenant: (_, { id, name, label }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const dal = new dal_1.DAL();
                return dal.updateTenant(id, name, label);
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
        createUser: (_, { tenant_id, email, first_name, last_name }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const dal = new dal_1.DAL();
                return dal.createUser(tenant_id, email, first_name, last_name);
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }),
        updateUser: (_, { id, email, first_name, last_name }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const dal = new dal_1.DAL();
                return dal.updateUser(id, email, first_name, last_name);
            }
            catch (error) {
                console.log(error);
                return false;
            }
        })
    },
};


/***/ }),

/***/ "./src/type-defs.ts":
/*!**************************!*\
  !*** ./src/type-defs.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeDefs = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
exports.typeDefs = apollo_server_lambda_1.gql `
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


/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");;

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");;

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");;

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************************!*\
  !*** ./src/apollo-server.ts ***!
  \******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.graphqlHandler = exports.connection = void 0;
const apollo_server_lambda_1 = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const Tenant_1 = __webpack_require__(/*! ./entity/Tenant */ "./src/entity/Tenant.ts");
const User_1 = __webpack_require__(/*! ./entity/User */ "./src/entity/User.ts");
const resolvers_1 = __webpack_require__(/*! ./resolvers */ "./src/resolvers.ts");
const type_defs_1 = __webpack_require__(/*! ./type-defs */ "./src/type-defs.ts");
exports.connection = typeorm_1.createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "AnuragDB",
    database: "test",
    entities: [Tenant_1.Tenant, User_1.Users],
    synchronize: true,
    logging: false,
});
const apolloServer = new apollo_server_lambda_1.ApolloServer({ resolvers: resolvers_1.resolvers, typeDefs: type_defs_1.typeDefs });
exports.graphqlHandler = apolloServer.createHandler();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2Fwb2xsby1zZXJ2ZXIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aGl0ZWJyaWNrLWNsb3VkLy4vc3JjL2RhbC50cyIsIndlYnBhY2s6Ly93aGl0ZWJyaWNrLWNsb3VkLy4vc3JjL2VudGl0eS9UZW5hbnQudHMiLCJ3ZWJwYWNrOi8vd2hpdGVicmljay1jbG91ZC8uL3NyYy9lbnRpdHkvVXNlci50cyIsIndlYnBhY2s6Ly93aGl0ZWJyaWNrLWNsb3VkLy4vc3JjL2Vudmlyb25tZW50LnRzIiwid2VicGFjazovL3doaXRlYnJpY2stY2xvdWQvLi9zcmMvcmVzb2x2ZXJzLnRzIiwid2VicGFjazovL3doaXRlYnJpY2stY2xvdWQvLi9zcmMvdHlwZS1kZWZzLnRzIiwid2VicGFjazovL3doaXRlYnJpY2stY2xvdWQvZXh0ZXJuYWwgXCJhcG9sbG8tc2VydmVyLWxhbWJkYVwiIiwid2VicGFjazovL3doaXRlYnJpY2stY2xvdWQvZXh0ZXJuYWwgXCJwZ1wiIiwid2VicGFjazovL3doaXRlYnJpY2stY2xvdWQvZXh0ZXJuYWwgXCJyZWZsZWN0LW1ldGFkYXRhXCIiLCJ3ZWJwYWNrOi8vd2hpdGVicmljay1jbG91ZC9leHRlcm5hbCBcInR5cGVvcm1cIiIsIndlYnBhY2s6Ly93aGl0ZWJyaWNrLWNsb3VkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3doaXRlYnJpY2stY2xvdWQvLi9zcmMvYXBvbGxvLXNlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4vZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgUG9vbCB9IGZyb20gJ3BnJztcblxuZXhwb3J0IGNsYXNzIERBTCB7XG5cbiAgcHVibGljIHBvb2w6IFBvb2w7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woe1xuICAgICAgZGF0YWJhc2U6IGVudmlyb25tZW50LmRiTmFtZSxcbiAgICAgIGhvc3Q6IGVudmlyb25tZW50LmRiSG9zdCxcbiAgICAgIHBvcnQ6IGVudmlyb25tZW50LmRiUG9ydCxcbiAgICAgIHVzZXI6IGVudmlyb25tZW50LmRiVXNlcixcbiAgICAgIHBhc3N3b3JkOiBlbnZpcm9ubWVudC5kYlBhc3N3b3JkLFxuICAgICAgbWF4OiBlbnZpcm9ubWVudC5kYlBvb2xNYXgsXG4gICAgICBpZGxlVGltZW91dE1pbGxpczogZW52aXJvbm1lbnQuZGJQb29sQ29ubmVjdGlvblRpbWVvdXRNaWxsaXMsXG4gICAgICBjb25uZWN0aW9uVGltZW91dE1pbGxpczogZW52aXJvbm1lbnQuZGJQb29sQ29ubmVjdGlvblRpbWVvdXRNaWxsaXMsXG4gICAgfSk7XG4gIH1cblxuICAvLyBjb25zdCBjb25uZWN0VG9EYiA6ICgpID0+IHtcbiAgLy8gICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLnBvb2wuY29ubmVjdCgpO1xuICAvLyAgIHRyeSB7XG5cbiAgLy8gICB9IGNhdGNoIChlcnJvcikge1xuXG4gIC8vICAgfSBmaW5hbGx5IHtcblxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRUZW5hbnRCeUlkKGlkOiBTdHJpbmcpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLnBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNsaWVudC5xdWVyeShcInNlbGVjdCAqIGZyb20gdGVuYW50IHdoZXJlIGlkPSdcIiArIGlkICsgXCInXCIpO1xuICAgICAgY29uc29sZS5sb2cocmVzLnJvd3NbMF0pO1xuICAgICAgcmV0dXJuIHJlcy5yb3dzWzBdO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRUZW5hbnRCeU5hbWUobmFtZTogU3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coXCJ0cnlpbmcgdG8gY29ubmVjdFwiKVxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMucG9vbC5jb25uZWN0KCk7XG4gICAgY29uc29sZS5sb2coXCJjb25uZWVjdGVkXCIpXG4gICAgdHJ5IHtcblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFwic2VsZWN0ICogZnJvbSB0ZW5hbnQgd2hlcmUgbmFtZT0nXCIgKyBuYW1lICsgXCInXCIpO1xuICAgICAgY29uc29sZS5sb2cocmVzLnJvd3NbMF0pO1xuICAgICAgcmV0dXJuIHJlcy5yb3dzWzBdO1xuXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgcHVibGljIGFzeW5jIGdldFRlbmFudHMoKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5wb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFwic2VsZWN0ICogZnJvbSB0ZW5hbnRcIik7XG4gICAgICBjb25zb2xlLmxvZyhyZXMucm93cyk7XG4gICAgICByZXR1cm4gcmVzLnJvd3M7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNyZWF0ZVRlbmFudChuYW1lOiBTdHJpbmcsIGxhYmVsOiBTdHJpbmcpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLnBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjbGllbnQucXVlcnkoXCJJTlNFUlQgSU5UTyB0ZW5hbnQobmFtZSwgbGFiZWwsIGNyZWF0ZWRfYXQsIHVwZGF0ZWRfYXQpIFZBTFVFUygkMSwgJDIsICQzLCAkNCkgUkVUVVJOSU5HICpcIiwgW25hbWUsIGxhYmVsLCBuZXcgRGF0ZSgpLCBuZXcgRGF0ZSgpXSk7XG4gICAgICBpZiAocmVzLnJvd3MpXG4gICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgIGVsc2VcbiAgICAgICAgdGhyb3cgKHJlcyk7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFVzZXJzKCkge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMucG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFwic2VsZWN0ICogZnJvbSB1c2Vyc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5yb3dzKTtcbiAgICAgIHJldHVybiByZXMucm93cztcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFVzZXJCeU5hbWUoZmlyc3ROYW1lOiBTdHJpbmcpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLnBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNsaWVudC5xdWVyeShcInNlbGVjdCAqIGZyb20gdXNlcnMgd2hlcmUgZmlyc3RfbmFtZT0kMVwiLCBbZmlyc3ROYW1lXSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXMucm93c1swXSk7XG4gICAgICByZXR1cm4gcmVzLnJvd3NbMF07XG5cblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBTdHJpbmcpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLnBvb2wuY29ubmVjdCgpO1xuICAgIHRyeSB7XG5cbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNsaWVudC5xdWVyeShcInNlbGVjdCAqIGZyb20gdXNlcnMgd2hlcmUgZW1haWw9JDFcIiwgW2VtYWlsXSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXMucm93c1swXSk7XG4gICAgICByZXR1cm4gcmVzLnJvd3NbMF07XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRVc2VyQnlUZW5hbnRJRCh0ZW5hbnRJZDogU3RyaW5nKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5wb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjbGllbnQucXVlcnkoXCJTRUxFQ1QgKiBGUk9NIFVTRVJTIFdIRVJFIHRlbmFudF9pZD0kMVwiLCBbdGVuYW50SWRdKTtcbiAgICAgIGNvbnNvbGUubG9nKHJlcy5yb3dzKTtcbiAgICAgIHJldHVybiByZXMucm93cztcblxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuICB9XG5cblxuICBwdWJsaWMgYXN5bmMgZ2V0VXNlcnNCeVRlbmFudE5hbWUodGVuYW50X25hbWU6IFN0cmluZykge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMucG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2xpZW50LnF1ZXJ5KFwiU0VMRUNUICogRlJPTSBVU0VSUyBSSUdIVCBKT0lOIFRFTkFOVCBPTiBVU0VSUy50ZW5hbnRfaWQgPSBURU5BTlQuaWQgV0hFUkUgVEVOQU5ULm5hbWU9JDFcIiwgW3RlbmFudF9uYW1lXSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXMucm93cyk7XG4gICAgICByZXR1cm4gcmVzLnJvd3M7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjcmVhdGVVc2VyKHRlbmFudF9pZDogU3RyaW5nLCBlbWFpbDogU3RyaW5nLCBmaXJzdF9uYW1lOiBTdHJpbmcsIGxhc3RfbmFtZTogU3RyaW5nKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5wb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjbGllbnQucXVlcnkoXCJJTlNFUlQgSU5UTyB1c2VycyhlbWFpbCwgZmlyc3RfbmFtZSwgbGFzdF9uYW1lLCBjcmVhdGVkX2F0LCB1cGRhdGVkX2F0LCB0ZW5hbnRfaWQgKSBWQUxVRVMoJDEsICQyLCAkMywgJDQsICQ1LCAkNikgUkVUVVJOSU5HICpcIiwgW2VtYWlsLCBmaXJzdF9uYW1lLCBsYXN0X25hbWUsIG5ldyBEYXRlKCksIG5ldyBEYXRlKCksIHRlbmFudF9pZF0pO1xuICAgICAgY29uc29sZS5sb2cocmVzLnJvd3MpO1xuICAgICAgaWYgKHJlcylcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjbGllbnQucmVsZWFzZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVVc2VyKGlkOiBTdHJpbmcsIGVtYWlsOiBTdHJpbmcsIGZpcnN0X25hbWU6IFN0cmluZywgbGFzdF9uYW1lOiBTdHJpbmcpIHtcblxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IHRoaXMucG9vbC5jb25uZWN0KCk7XG4gICAgdHJ5IHtcblxuICAgICAgbGV0IHF1ZXJ5ID0gXCJVUERBVEUgVVNFUlMgU0VUIFwiO1xuICAgICAgaWYgKGVtYWlsICE9IG51bGwpXG4gICAgICAgIHF1ZXJ5ICs9IChcImVtYWlsPSdcIiArIGVtYWlsICsgXCInLFwiKVxuXG4gICAgICBpZiAoZmlyc3RfbmFtZSAhPSBudWxsKVxuICAgICAgICBxdWVyeSArPSAoXCJmaXJzdF9uYW1lPSdcIiArIGZpcnN0X25hbWUgKyBcIicsXCIpXG5cbiAgICAgIGlmIChsYXN0X25hbWUgIT0gbnVsbClcbiAgICAgICAgcXVlcnkgKz0gKFwibGFzdF9uYW1lPSdcIiArIGxhc3RfbmFtZSArIFwiJyxcIilcblxuICAgICAgcXVlcnkgKz0gKFwidXBkYXRlZF9hdD0kMSBXSEVSRSBpZD0kMlwiKVxuICAgICAgY29uc29sZS5sb2cocXVlcnkpO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2xpZW50LnF1ZXJ5KHF1ZXJ5LCBbRGF0ZS5ub3coKSwgaWRdKVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNsaWVudC5yZWxlYXNlKCk7XG4gICAgfVxuXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlVGVuYW50KGlkOiBTdHJpbmcsIG5hbWU6IFN0cmluZywgbGFiZWw6IFN0cmluZykge1xuXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5wb29sLmNvbm5lY3QoKTtcbiAgICB0cnkge1xuXG4gICAgICBsZXQgcXVlcnkgPSBcIlVQREFURSBURU5BTlQgU0VUIFwiO1xuICAgICAgaWYgKG5hbWUgIT0gbnVsbClcbiAgICAgICAgcXVlcnkgKz0gKFwiZW1haWw9J1wiICsgbmFtZSArIFwiJyxcIilcblxuICAgICAgaWYgKGxhYmVsICE9IG51bGwpXG4gICAgICAgIHF1ZXJ5ICs9IChcImxhYmVsPSdcIiArIGxhYmVsICsgXCInLFwiKVxuXG4gICAgICBxdWVyeSArPSAoXCJ1cGRhdGVkX2F0PSQxIFdIRVJFIGlkPSQyXCIpXG4gICAgICBjb25zb2xlLmxvZyhxdWVyeSk7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBjbGllbnQucXVlcnkocXVlcnksIFtEYXRlLm5vdygpLCBpZF0pXG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY2xpZW50LnJlbGVhc2UoKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBNZXRob2RzIGhlcmUgZm9yIENSVUQgYWNjZXNzIHRvIERCIHJlY29yZHMgLSByZW5hbWUgdG8gYmVzdCBwcmFjdGlzZXNcbiAgICogXG4gICAqIGdldFRlbmFudEJ5TmFtZShpZCkgLSBlZyBTRUxFQ1QgKiBGUk9NIHRlbmFudHMgV0hFUkUgaWQ9P1xuICAgKiBnZXRUZW5hbnRCeUlkKG5hbWUpIC0gZWcgU0VMRUNUICogRlJPTSB0ZW5hbnRzIFdIRVJFIG5hbWU9P1xuICAgKiBnZXRUZW5hbnRzIC0gZWcgU0VMRUNUICogRlJPTSB0ZW5hbnRzP1xuICAgKiBjcmVhdGVUZW5hbnQobmFtZSwgbGFiZWwpIC0gZWcgSU5TRVJUIElOVE8gdGVuYW50cyAobmFtZSwgbGFiZWwpIFZBTFVFUyAoPyw/KVxuICAgKiB1cGRhdGVUZW5hbnQoaWQsIG5hbWUsIGxhYmVsKSAtIGVnIFVQREFURSB0ZW5hbnRzIFNFVChuYW1lPT8sIGxhYmVsPT8sIHVwZGF0ZWRfYXQ9KG5vdygpIGF0IHRpbWUgem9uZSAndXRjJykpIFdIRVJFIGlkPT9cbiAgICogLSBpdCB3b3VsZCBiZSBuaWNlIHRvIG9ubHkgdXBkYXRlIHRoZSBzdXBwbGllZCBjb2x1bW5zXG4gICAqIFxuICAgKiBnZXRVc2VyQnlOYW1lKGlkKSAtIGVnIFNFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQ9P1xuICAgKiBnZXRVc2VyQnlFbWFpbChlbWFpbCkgLSBlZyBTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGVtYWlsPT9cbiAgICogZ2V0VXNlcnNCeVRlbmFudElkKGlkKSAtIGVnIFNFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgdGVuYW50X2lkPT9cbiAgICogZ2V0VXNlcnNCeVRlbmFudE5hbWUobmFtZSkgLSBlZyBTRUxFQ1QgKiBGUk9NIHVzZXJzIEpPSU4gdGVuYW50cyBPTiB1c2Vycy50ZW5hbnRfaWQ9dGVuYW50cy5pZCBXSEVSRSB0ZW5hbnRzLm5hbWU9P1xuICAgKiBcbiAgICogY3JlYXRlVXNlcih0ZW5hbnRfaWQsIGVtYWlsLCBmaXJzdF9uYW1lLCBsYXN0X25hbWUpIC0gZWcgSU5TRVJUIElOVE8gdGVuYW50cyAodGVuYW50X2lkLCBlbWFpbCwgZmlyc3RfbmFtZSwgbGFzdF9uYW1lKSBWQUxVRVMgKD8sPyw/LD8pXG4gICAqIHVwZGF0ZVVzZXIoaWQsIHRlbmFudF9pZCwgZW1haWwsIGZpcnN0X25hbWUsIGxhc3RfbmFtZSkgLSBlZyBVUERBVEUgdGVuYW50cyBTRVQodGVuYW50X2lkPT8sIGVtYWlsPT8sIGZpcnN0X25hbWU9PywgbGFzdF9uYW1lPT8sIHVwZGF0ZWRfYXQ9KG5vdygpIGF0IHRpbWUgem9uZSAndXRjJykpIFdIRVJFIGlkPT9cbiAgICogLSBpdCB3b3VsZCBiZSBuaWNlIHRvIG9ubHkgdXBkYXRlIHRoZSBzdXBwbGllZCBjb2x1bW5zXG4gICAqL1xuXG59OyIsImltcG9ydCB7IENvbHVtbiwgQ3JlYXRlRGF0ZUNvbHVtbiwgRW50aXR5LCBJbmRleCwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gXCJ0eXBlb3JtXCI7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFRlbmFudHtcblxuICAgIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKFwidXVpZFwiKVxuICAgIGlkITogU3RyaW5nO1xuXG4gICAgQENvbHVtbigpXG4gICAgQEluZGV4KHt1bmlxdWU6dHJ1ZX0pXG4gICAgbmFtZSE6U3RyaW5nO1xuXG4gICAgQENvbHVtbih7bnVsbGFibGU6dHJ1ZX0pXG4gICAgbGFiZWwhOlN0cmluZztcblxuICAgIEBDb2x1bW4oe25hbWU6XCJjcmVhdGVkX2F0XCJ9KVxuICAgIGNyZWF0ZWRBdCE6RGF0ZTtcblxuICAgIEBDb2x1bW4oe25hbWU6XCJ1cGRhdGVkX2F0XCJ9KVxuICAgIHVwZGF0ZWRBdCE6RGF0ZTtcbiAgICBcbiAgIFxufSIsImltcG9ydCB7IEVudGl0eSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiwgTWFueVRvT25lLCBDb2x1bW4sIEpvaW5Db2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSBcIi4vVGVuYW50XCI7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFVzZXJze1xuXG4gICAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oXCJ1dWlkXCIpXG4gICAgaWQhOlN0cmluZztcblxuICAgIEBNYW55VG9PbmUodHlwZSA9PiBUZW5hbnQpXG4gICAgQEpvaW5Db2x1bW4oe25hbWU6ICd0ZW5hbnRfaWQnLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogJ2lkJ30pXG4gICAgdGVuYW50ITogVGVuYW50O1xuXG4gICAgQENvbHVtbigpXG4gICAgZW1haWwhOiBTdHJpbmc7XG5cbiAgICBAQ29sdW1uKHtuYW1lOlwiZmlyc3RfbmFtZVwifSlcbiAgICBmaXJzdE5hbWUhOiBTdHJpbmc7XG5cbiAgICBAQ29sdW1uKHtuYW1lOlwibGFzdF9uYW1lXCJ9KVxuICAgIGxhc3ROYW1lITogU3RyaW5nO1xuXG4gICAgQENvbHVtbih7bmFtZTpcImNyZWF0ZWRfYXRcIn0pXG4gICAgY3JlYXRlZEF0ITogRGF0ZTtcblxuICAgIEBDb2x1bW4oe25hbWU6XCJ1cGRhdGVkX2F0XCJ9KVxuICAgIHVwZGF0ZWRBdCE6IERhdGU7XG5cblxufSIsInR5cGUgRW52aXJvbm1lbnQgPSB7XG4gIHNlY3JldE1lc3NhZ2U6IHN0cmluZztcbiAgZGJOYW1lOiBzdHJpbmcsXG4gIGRiSG9zdDogc3RyaW5nLFxuICBkYlBvcnQ6IG51bWJlcixcbiAgZGJVc2VyOiBzdHJpbmcsXG4gIGRiUGFzc3dvcmQ6IHN0cmluZyxcbiAgZGJQb29sTWF4OiBudW1iZXIsXG4gIGRiUG9vbElkbGVUaW1lb3V0TWlsbGlzOiBudW1iZXIsXG4gIGRiUG9vbENvbm5lY3Rpb25UaW1lb3V0TWlsbGlzOiBudW1iZXIsXG59O1xuXG5leHBvcnQgY29uc3QgZW52aXJvbm1lbnQ6IEVudmlyb25tZW50ID0ge1xuICBzZWNyZXRNZXNzYWdlOiBwcm9jZXNzLmVudi5TRUNSRVRfTUVTU0FHRSBhcyBzdHJpbmcsXG4gIGRiTmFtZTogcHJvY2Vzcy5lbnYuREJfTkFNRSBhcyBzdHJpbmcsXG4gIGRiSG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCBhcyBzdHJpbmcsXG4gIGRiUG9ydDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuREJfUE9SVCB8fCAnJykgYXMgbnVtYmVyLFxuICBkYlVzZXI6IHByb2Nlc3MuZW52LkRCX1VTRVIgYXMgc3RyaW5nLFxuICBkYlBhc3N3b3JkOiBwcm9jZXNzLmVudi5EQl9QQVNTV09SRCBhcyBzdHJpbmcsXG4gIGRiUG9vbE1heDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuREJfUE9PTF9NQVggfHwgJycpIGFzIG51bWJlcixcbiAgZGJQb29sSWRsZVRpbWVvdXRNaWxsaXM6IHBhcnNlSW50KHByb2Nlc3MuZW52LkRCX1BPT0xfSURMRV9USU1FT1VUX01JTExJUyB8fCAnJykgYXMgbnVtYmVyLFxuICBkYlBvb2xDb25uZWN0aW9uVGltZW91dE1pbGxpczogcGFyc2VJbnQocHJvY2Vzcy5lbnYuREJfUE9PTF9DT05ORUNUSU9OX1RJTUVPVVRfTUlMTElTIHx8ICcnKSBhcyBudW1iZXIsXG59O1xuXG4iLCJpbXBvcnQgeyBJUmVzb2x2ZXJzIH0gZnJvbSBcImFwb2xsby1zZXJ2ZXItbGFtYmRhXCI7XG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XG5pbXBvcnQgeyBUZW5hbnQgfSBmcm9tIFwiLi9lbnRpdHkvVGVuYW50XCI7XG5pbXBvcnQgeyBjb25uZWN0aW9uIH0gZnJvbSBcIi4vYXBvbGxvLXNlcnZlclwiO1xuaW1wb3J0IHsgVXNlcnMgfSBmcm9tIFwiLi9lbnRpdHkvVXNlclwiO1xuaW1wb3J0IHsgREFMIH0gZnJvbSBcIi4vZGFsXCI7XG5cbmZ1bmN0aW9uIHVzZXJQYXJzZXIoZGF0YTogYW55KSB7XG4gIGNvbnN0IHVzZXIgPSBuZXcgVXNlcnMoKTtcbiAgdXNlci5pZCA9IGRhdGEuaWQ7XG4gIHVzZXIuZmlyc3ROYW1lID0gZGF0YS5maXJzdF9uYW1lO1xuICB1c2VyLmxhc3ROYW1lID0gZGF0YS5sYXN0X25hbWU7XG4gIHVzZXIuZW1haWwgPSBkYXRhLmVtYWlsO1xuICB1c2VyLnRlbmFudCA9IGRhdGEudGVuYW50X2lkO1xuICB1c2VyLmNyZWF0ZWRBdCA9IGRhdGEuY3JlYXRlZF9hdC50b1N0cmluZygpO1xuICB1c2VyLnVwZGF0ZWRBdCA9IGRhdGEudXBkYXRlZF9hdC50b1N0cmluZygpO1xuICByZXR1cm4gdXNlcjtcbn1cblxuZnVuY3Rpb24gdXNlckFycmF5UGFyc2VyKGRhdGE6IGFueSkge1xuICBjb25zdCB1c2VycyA9IEFycmF5PFVzZXJzPigpO1xuXG4gIGRhdGEuZm9yRWFjaCgoZWxlbWVudHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcnMoKTtcbiAgICB1c2VyLmlkID0gZWxlbWVudHMuaWQ7XG4gICAgdXNlci5maXJzdE5hbWUgPSBlbGVtZW50cy5maXJzdF9uYW1lO1xuICAgIHVzZXIubGFzdE5hbWUgPSBlbGVtZW50cy5sYXN0X25hbWU7XG4gICAgdXNlci5lbWFpbCA9IGVsZW1lbnRzLmVtYWlsO1xuICAgIHVzZXIuY3JlYXRlZEF0ID0gZWxlbWVudHMuY3JlYXRlZF9hdC50b1N0cmluZygpO1xuICAgIHVzZXIudXBkYXRlZEF0ID0gZWxlbWVudHMudXBkYXRlZF9hdC50b1N0cmluZygpO1xuICAgIHVzZXIudGVuYW50ID0gZWxlbWVudHMudGVuYW50X2lkO1xuICAgIHVzZXJzLnB1c2godXNlcik7XG4gIH0pXG4gIHJldHVybiB1c2Vycztcbn1cblxuZnVuY3Rpb24gdGVuYW50UGFyc2VyKGRhdGE6IGFueSkge1xuICBjb25zdCB0ZW5hbnQgPSBuZXcgVGVuYW50KCk7XG4gIHRlbmFudC5uYW1lID0gZGF0YS5uYW1lO1xuICB0ZW5hbnQubGFiZWwgPSBkYXRhLmxhYmVsO1xuICB0ZW5hbnQuY3JlYXRlZEF0ID0gZGF0YS5jcmVhdGVkX2F0LnRvU3RyaW5nKCk7XG4gIHRlbmFudC51cGRhdGVkQXQgPSBkYXRhLnVwZGF0ZWRfYXQudG9TdHJpbmcoKTtcbiAgdGVuYW50LmlkID0gZGF0YS5pZDtcbiAgcmV0dXJuIHRlbmFudDtcbn1cblxuZnVuY3Rpb24gdGVuYW50QXJyYXlQYXJzZXIoZGF0YTogYW55KSB7XG4gIGNvbnN0IHRlbmFudHMgPSBBcnJheTxUZW5hbnQ+KCk7XG5cbiAgZGF0YS5mb3JFYWNoKChlbGVtZW50czogYW55KSA9PiB7XG4gICAgY29uc3QgdGVuYW50ID0gbmV3IFRlbmFudCgpO1xuICAgIHRlbmFudC5uYW1lID0gZWxlbWVudHMubmFtZTtcbiAgICB0ZW5hbnQubGFiZWwgPSBlbGVtZW50cy5sYWJlbDtcbiAgICB0ZW5hbnQuY3JlYXRlZEF0ID0gZWxlbWVudHMuY3JlYXRlZF9hdC50b1N0cmluZygpO1xuICAgIHRlbmFudC51cGRhdGVkQXQgPSBlbGVtZW50cy51cGRhdGVkX2F0LnRvU3RyaW5nKCk7XG4gICAgdGVuYW50LmlkID0gZWxlbWVudHMuaWQ7XG4gICAgdGVuYW50cy5wdXNoKHRlbmFudCk7XG4gIH0pXG4gIHJldHVybiB0ZW5hbnRzO1xufVxuZXhwb3J0IGNvbnN0IHJlc29sdmVyczogSVJlc29sdmVycyA9IHtcbiAgUXVlcnk6IHtcbiAgICB0ZXN0TWVzc2FnZTogKCkgPT4gJ0hlbGxvIHdvcmxkJyxcbiAgICBnZXRUZW5hbnRzOiBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkID0gbmV3IERBTCgpO1xuICAgICAgcmV0dXJuIHRlbmFudEFycmF5UGFyc2VyKGF3YWl0IGQuZ2V0VGVuYW50cygpKTtcbiAgICB9LFxuXG4gICAgZ2V0VGVuYW50QnlJZDogYXN5bmMgKF8sIHsgaWQgfSkgPT4ge1xuICAgICAgY29uc3QgZCA9IG5ldyBEQUwoKTtcbiAgICAgIHJldHVybiB0ZW5hbnRQYXJzZXIoYXdhaXQgZC5nZXRUZW5hbnRCeUlkKGlkKSk7XG4gICAgfSxcblxuICAgIGdldFRlbmFudEJ5TmFtZTogYXN5bmMgKF8sIHsgbmFtZSB9KSA9PiB7XG4gICAgICBjb25zdCBkID0gbmV3IERBTCgpO1xuICAgICAgcmV0dXJuIHRlbmFudFBhcnNlcihhd2FpdCBkLmdldFRlbmFudEJ5TmFtZShuYW1lKSk7XG4gICAgfSxcblxuICAgIGdldFVzZXJCeU5hbWU6IGFzeW5jIChfLCB7IGZpcnN0TmFtZSB9KSA9PiB7XG4gICAgICBjb25zdCBkID0gbmV3IERBTCgpO1xuICAgICAgcmV0dXJuIHVzZXJQYXJzZXIoYXdhaXQgZC5nZXRVc2VyQnlOYW1lKGZpcnN0TmFtZSkpO1xuICAgIH0sXG5cbiAgICBnZXRVc2VyQnlFbWFpbDogYXN5bmMgKF8sIHsgZW1haWwgfSkgPT4ge1xuICAgICAgY29uc3QgZCA9IG5ldyBEQUwoKTtcbiAgICAgIHJldHVybiB1c2VyUGFyc2VyKGF3YWl0IGQuZ2V0VXNlckJ5RW1haWwoZW1haWwpKTtcbiAgICB9LFxuXG4gICAgZ2V0VXNlckJ5VGVuYW50SUQ6IGFzeW5jIChfLCB7IHRlbmFudElkIH0pID0+IHtcbiAgICAgIGNvbnN0IGQgPSBuZXcgREFMKCk7XG4gICAgICByZXR1cm4gdXNlckFycmF5UGFyc2VyKGF3YWl0IGQuZ2V0VXNlckJ5VGVuYW50SUQodGVuYW50SWQpKTtcbiAgICB9LFxuXG4gICAgZ2V0VXNlcnNCeVRlbmFudE5hbWU6IGFzeW5jIChfLCB7IHRlbmFudF9uYW1lIH0pID0+IHtcblxuICAgICAgY29uc3QgZCA9IG5ldyBEQUwoKTtcbiAgICAgIHJldHVybiB1c2VyQXJyYXlQYXJzZXIoYXdhaXQgZC5nZXRVc2Vyc0J5VGVuYW50TmFtZSh0ZW5hbnRfbmFtZSkpO1xuXG4gICAgfSxcblxuICAgIGdldFVzZXJzOiBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBkID0gbmV3IERBTCgpO1xuICAgICAgcmV0dXJuIHVzZXJBcnJheVBhcnNlcihhd2FpdCBkLmdldFVzZXJzKCkpO1xuICAgIH1cbiAgfSxcblxuXG4gIE11dGF0aW9uOiB7XG4gICAgY3JlYXRlVGVuYW50OiBhc3luYyAoXywgeyBuYW1lLCBsYWJlbCB9OiBhbnkpID0+IHtcbiAgICAgIHRyeSB7XG5cbiAgICAgICAgY29uc3QgZGFsID0gbmV3IERBTCgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBkYWwuY3JlYXRlVGVuYW50KG5hbWUsIGxhYmVsKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVRlbmFudDogYXN5bmMgKF8sIHsgaWQsIG5hbWUsIGxhYmVsIH06IGFueSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGFsID0gbmV3IERBTCgpO1xuICAgICAgICByZXR1cm4gZGFsLnVwZGF0ZVRlbmFudChpZCwgbmFtZSwgbGFiZWwpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVVc2VyOiBhc3luYyAoXywgeyB0ZW5hbnRfaWQsIGVtYWlsLCBmaXJzdF9uYW1lLCBsYXN0X25hbWUgfTogYW55KSA9PiB7XG4gICAgICB0cnkge1xuXG4gICAgICAgIGNvbnN0IGRhbCA9IG5ldyBEQUwoKTtcbiAgICAgICAgcmV0dXJuIGRhbC5jcmVhdGVVc2VyKHRlbmFudF9pZCwgZW1haWwsIGZpcnN0X25hbWUsIGxhc3RfbmFtZSk7XG5cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVVc2VyOiBhc3luYyAoXywgeyBpZCwgZW1haWwsIGZpcnN0X25hbWUsIGxhc3RfbmFtZSB9KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkYWwgPSBuZXcgREFMKCk7XG4gICAgICAgIHJldHVybiBkYWwudXBkYXRlVXNlcihpZCwgZW1haWwsIGZpcnN0X25hbWUsIGxhc3RfbmFtZSk7XG5cbiAgICAgIH1cbiAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogcmVzb2x2ZXJzIGhlcmUgZm9yIENSVUQgYWNjZXNzIHRvIERCIHJlY29yZHMgLSByZW5hbWUgdG8gYmVzdCBwcmFjdGlzZXMgLSBzZWUgZGFsLnRzXG4gICAqIFxuICAgKiBnZXRUZW5hbnRCeU5hbWUoaWQpXG4gICAqIGdldFRlbmFudEJ5SWQobmFtZSlcbiAgICogZ2V0VGVuYW50c1xuICAgKiBjcmVhdGVUZW5hbnQobmFtZSwgbGFiZWwpIFxuICAgKiB1cGRhdGVUZW5hbnQoaWQsIG5hbWUsIGxhYmVsKVxuICAgKiBcbiAgICogZ2V0VXNlckJ5TmFtZShpZClcbiAgICogZ2V0VXNlckJ5RW1haWwoZW1haWwpXG4gICAqIGdldFVzZXJzQnlUZW5hbnRJZChpZClcbiAgICogZ2V0VXNlcnNCeVRlbmFudE5hbWUobmFtZSlcbiAgICogZ2V0VXNlcnNcbiAgICogY3JlYXRlVXNlcih0ZW5hbnRfaWQsIGVtYWlsLCBmaXJzdF9uYW1lLCBsYXN0X25hbWUpXG4gICAqIHVwZGF0ZVVzZXIoaWQsIHRlbmFudF9pZCwgZW1haWwsIGZpcnN0X25hbWUsIGxhc3RfbmFtZSlcbiAgICovXG5cblxuXG59OyIsImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItbGFtYmRhJztcblxuICAvKipcbiAgICogc2NoZW1hIGhlcmUgZm9yIENSVUQgYWNjZXNzIHRvIERCIHJlY29yZHMgLSByZW5hbWUgdG8gYmVzdCBwcmFjdGlzZXMgLSBzZWUgZGFsLnRzXG4gICAqIFxuICAgKiBnZXRUZW5hbnRCeU5hbWUoaWQpXG4gICAqIGdldFRlbmFudEJ5SWQobmFtZSlcbiAgICogZ2V0VGVuYW50c1xuICAgKiBjcmVhdGVUZW5hbnQobmFtZSwgbGFiZWwpIFxuICAgKiB1cGRhdGVUZW5hbnQoaWQsIG5hbWUsIGxhYmVsKVxuICAgKiBcbiAgICogZ2V0VXNlckJ5TmFtZShpZClcbiAgICogZ2V0VXNlckJ5RW1haWwoZW1haWwpXG4gICAqIGdldFVzZXJzQnlUZW5hbnRJZChpZClcbiAgICogZ2V0VXNlcnNCeVRlbmFudE5hbWUobmFtZSlcbiAgICogXG4gICAqIGNyZWF0ZVVzZXIodGVuYW50X2lkLCBlbWFpbCwgZmlyc3RfbmFtZSwgbGFzdF9uYW1lKVxuICAgKiB1cGRhdGVVc2VyKGlkLCB0ZW5hbnRfaWQsIGVtYWlsLCBmaXJzdF9uYW1lLCBsYXN0X25hbWUpXG4gICAqL1xuXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXG4gIHR5cGUgUXVlcnkge1xuICAgIHRlc3RNZXNzYWdlOiBTdHJpbmchXG4gICAgZ2V0VGVuYW50czogW1RlbmFudF1cbiAgICBnZXRUZW5hbnRCeUlkKGlkOiBTdHJpbmchKTogVGVuYW50XG4gICAgZ2V0VGVuYW50QnlOYW1lKG5hbWU6IFN0cmluZyEpOiBUZW5hbnRcbiAgICBnZXRVc2VyQnlOYW1lKGZpcnN0TmFtZTogU3RyaW5nISk6IFVzZXJzXG4gICAgZ2V0VXNlckJ5RW1haWwoZW1haWw6U3RyaW5nKTpVc2Vyc1xuICAgIGdldFVzZXJCeVRlbmFudElEKHRlbmFudElkOlN0cmluZyk6W1VzZXJzXVxuICAgIGdldFVzZXJzQnlUZW5hbnROYW1lKHRlbmFudF9uYW1lOlN0cmluZyk6W1VzZXJzXVxuICAgIGdldFVzZXJzOiBbVXNlcnNdXG4gIH1cbiAgdHlwZSBUZW5hbnR7XG4gICAgaWQ6U3RyaW5nLFxuICAgIG5hbWU6U3RyaW5nLFxuICAgIGxhYmVsOlN0cmluZyxcbiAgICBjcmVhdGVkQXQ6U3RyaW5nLFxuICAgIHVwZGF0ZWRBdDpTdHJpbmdcbiAgfSBcbiAgdHlwZSBVc2Vyc3tcbiAgICBpZDogU3RyaW5nLFxuICAgIGVtYWlsOiBTdHJpbmcsXG4gICAgZmlyc3ROYW1lIDogU3RyaW5nLFxuICAgIGxhc3ROYW1lIDogU3RyaW5nLFxuICAgIGNyZWF0ZWRBdDogU3RyaW5nLFxuICAgIHVwZGF0ZWRBdCA6IFN0cmluZyxcbiAgICB0ZW5hbnQgOiBTdHJpbmdcbiAgfVxuICB0eXBlIE11dGF0aW9uIHtcbiAgICBjcmVhdGVUZW5hbnQobmFtZTpTdHJpbmchLGxhYmVsOlN0cmluZyEpOiBCb29sZWFuXG4gICAgY3JlYXRlVXNlcih0ZW5hbnRfaWQ6U3RyaW5nLGVtYWlsOlN0cmluZyEsZmlyc3RfbmFtZTpTdHJpbmchLGxhc3RfbmFtZTpTdHJpbmchKTogQm9vbGVhblxuICAgIHVwZGF0ZVRlbmFudChpZDpTdHJpbmchLG5hbWU6U3RyaW5nISxsYWJlbDpTdHJpbmchKTpCb29sZWFuXG4gICAgdXBkYXRlVXNlcihpZDpTdHJpbmchLCBlbWFpbDpTdHJpbmcsIGZpcnN0X25hbWU6U3RyaW5nLCBsYXN0X25hbWU6U3RyaW5nKTpCb29sZWFuXG4gIH1cbmA7XG5cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXBvbGxvLXNlcnZlci1sYW1iZGFcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBnXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlb3JtXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgQXBvbGxvU2VydmVyIH0gZnJvbSAnYXBvbGxvLXNlcnZlci1sYW1iZGEnO1xuaW1wb3J0IHsgY3JlYXRlQ29ubmVjdGlvbiB9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHsgREFMIH0gZnJvbSAnLi9kYWwnO1xuaW1wb3J0IHsgVGVuYW50IH0gZnJvbSAnLi9lbnRpdHkvVGVuYW50JztcbmltcG9ydCB7IFVzZXJzIH0gZnJvbSAnLi9lbnRpdHkvVXNlcic7XG5pbXBvcnQgeyByZXNvbHZlcnMgfSBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgeyB0eXBlRGVmcyB9IGZyb20gJy4vdHlwZS1kZWZzJztcblxuZXhwb3J0IGNvbnN0IGNvbm5lY3Rpb24gPSAgY3JlYXRlQ29ubmVjdGlvbih7XG4gICAgICAgIHR5cGU6IFwicG9zdGdyZXNcIixcbiAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICAgICAgcG9ydDogNTQzMixcbiAgICAgICAgdXNlcm5hbWU6IFwiYWRtaW5cIiwgICAvLyBFbnRlciB5b3VyIHVzZXJuYW1lIG9mIHBvc3RncmVzXG4gICAgICAgIHBhc3N3b3JkOiBcIkFudXJhZ0RCXCIsICAgLy8gRW50ZXIgeW91ciBwYXNzd29yZCBvZiBwb3N0Z3Jlc1xuICAgICAgICBkYXRhYmFzZTogXCJ0ZXN0XCIsICAgLy8gRW50ZXIgeW91ciBkYXRhYmFzZSBuYW1lXG4gICAgICAgIGVudGl0aWVzOiBbVGVuYW50LFVzZXJzXSxcbiAgICAgICAgc3luY2hyb25pemU6IHRydWUsXG4gICAgICAgIGxvZ2dpbmc6IGZhbHNlLFxufSk7XG5cblxuXG5jb25zdCBhcG9sbG9TZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKHsgcmVzb2x2ZXJzICwgdHlwZURlZnMgfSk7XG5leHBvcnQgY29uc3QgZ3JhcGhxbEhhbmRsZXIgPSBhcG9sbG9TZXJ2ZXIuY3JlYXRlSGFuZGxlcigpO1xuXG5cbi8vIFRFU1RJTkcgQ09ERVxuLy8gdGVzdFF1ZXJ5XG4vLyB0ZXN0TXV0YXRpb25cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWFBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFHQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTs7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBR0E7O0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBOztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUVBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQXNCQTtBQXpRQTtBQXlRQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5UUE7QUFHQTtBQW1CQTtBQWhCQTtBQURBO0FBQ0E7QUFBQTtBQUlBO0FBRkE7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQURBO0FBQ0E7QUFBQTtBQUdBO0FBREE7QUFDQTtBQUFBO0FBR0E7QUFEQTtBQUNBO0FBQUE7QUFoQkE7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUdBO0FBeUJBO0FBdEJBO0FBREE7QUFDQTtBQUFBO0FBSUE7QUFGQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBREE7QUFDQTtBQUFBO0FBR0E7QUFEQTtBQUNBO0FBQUE7QUFHQTtBQURBO0FBQ0E7QUFBQTtBQUdBO0FBREE7QUFDQTtBQUFBO0FBR0E7QUFEQTtBQUNBO0FBQUE7QUF0QkE7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0E7Ozs7Ozs7Ozs7O0FDTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXVCQTtBQUNBO0FBQ0E7QTs7Ozs7Ozs7Ozs7QUNwTEE7QUFvQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQ0E7QUFDQTtBQUNBO0E7Ozs7Ozs7O0FDeERBO0FBQ0E7QTs7Ozs7Ozs7QUNEQTtBQUNBO0E7Ozs7Ozs7O0FDREE7QUFDQTtBOzs7Ozs7OztBQ0RBO0FBQ0E7QTs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBOzs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9