"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const logs_service_1 = require("../../modules/logs/logs.service");
let AuditLogInterceptor = class AuditLogInterceptor {
    logs;
    constructor(logs) {
        this.logs = logs;
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const method = req.method;
        const shouldLog = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method);
        if (!shouldLog)
            return next.handle();
        const user = req.user;
        const userId = user?.userId;
        const target = req.originalUrl ?? '';
        const action = `${method} ${target}`;
        return next.handle().pipe((0, rxjs_1.tap)({
            next: () => {
                if (typeof userId === 'number') {
                    this.logs.create(userId, action, target, req.ip).catch(() => undefined);
                }
            },
        }));
    }
};
exports.AuditLogInterceptor = AuditLogInterceptor;
exports.AuditLogInterceptor = AuditLogInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logs_service_1.LogsService])
], AuditLogInterceptor);
//# sourceMappingURL=audit-log.interceptor.js.map