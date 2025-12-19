import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LogsService } from '@/modules/logs/logs.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private logs: LogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request & { user?: any; ip?: string }>();

    const method = (req as any).method;
    const shouldLog = ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method);
    if (!shouldLog) return next.handle();

    const user = (req as any).user as { userId?: number } | undefined;
    const userId = user?.userId;

    const target = (req as any).originalUrl ?? '';
    const action = `${method} ${target}`;

    return next.handle().pipe(
      tap({
        next: () => {
          if (typeof userId === 'number') {
            this.logs.create(userId, action, target, (req as any).ip).catch(() => undefined);
          }
        },
      }),
    );
  }
}
