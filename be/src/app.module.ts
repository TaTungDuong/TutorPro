import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StaffModule } from './modules/staff/staff.module';
import { ParentsModule } from './modules/parents/parents.module';
import { TutorsModule } from './modules/tutors/tutors.module';
import { StudentsModule } from './modules/students/students.module';
import { ClassesModule } from './modules/classes/classes.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { ContractsModule } from './modules/contracts/contracts.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReportsModule } from './modules/reports/reports.module';
import { LogsModule } from './modules/logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StaffModule,
    ParentsModule,
    TutorsModule,
    StudentsModule,
    ClassesModule,
    ApplicationsModule,
    ContractsModule,
    SessionsModule,
    ComplaintsModule,
    PaymentsModule,
    ReportsModule,
    LogsModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: AuditLogInterceptor },
  ],
})
export class AppModule {}
