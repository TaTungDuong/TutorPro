"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const audit_log_interceptor_1 = require("./common/interceptors/audit-log.interceptor");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const staff_module_1 = require("./modules/staff/staff.module");
const parents_module_1 = require("./modules/parents/parents.module");
const tutors_module_1 = require("./modules/tutors/tutors.module");
const students_module_1 = require("./modules/students/students.module");
const classes_module_1 = require("./modules/classes/classes.module");
const applications_module_1 = require("./modules/applications/applications.module");
const contracts_module_1 = require("./modules/contracts/contracts.module");
const sessions_module_1 = require("./modules/sessions/sessions.module");
const complaints_module_1 = require("./modules/complaints/complaints.module");
const payments_module_1 = require("./modules/payments/payments.module");
const reports_module_1 = require("./modules/reports/reports.module");
const logs_module_1 = require("./modules/logs/logs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            staff_module_1.StaffModule,
            parents_module_1.ParentsModule,
            tutors_module_1.TutorsModule,
            students_module_1.StudentsModule,
            classes_module_1.ClassesModule,
            applications_module_1.ApplicationsModule,
            contracts_module_1.ContractsModule,
            sessions_module_1.SessionsModule,
            complaints_module_1.ComplaintsModule,
            payments_module_1.PaymentsModule,
            reports_module_1.ReportsModule,
            logs_module_1.LogsModule,
        ],
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: audit_log_interceptor_1.AuditLogInterceptor },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map