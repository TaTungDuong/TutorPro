import { PrismaClient } from '@prisma/client';

async function hashPassword(plain: string): Promise<string> {
  // Use bcryptjs in seed to avoid native binary issues on Windows/containers
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bcryptjs = require('bcryptjs');
  return bcryptjs.hash(plain, 10);
}

const prisma = new PrismaClient();

async function main() {
  const adminPass = await hashPassword('Admin@123');
  const staffPass = await hashPassword('Staff@123');
  const parentPass = await hashPassword('Parent@123');
  const tutorPass = await hashPassword('Tutor@123');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tutorpro.local' },
    update: {},
    create: { email: 'admin@tutorpro.local', password: adminPass, role: 'ADMIN', status: 'ACTIVE' } as any,
  });

  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@tutorpro.local' },
    update: {},
    create: { email: 'staff@tutorpro.local', password: staffPass, role: 'STAFF', status: 'ACTIVE' } as any,
  });

  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@tutorpro.local' },
    update: {},
    create: { email: 'parent@tutorpro.local', password: parentPass, role: 'PARENT', status: 'ACTIVE' } as any,
  });

  const tutorUser = await prisma.user.upsert({
    where: { email: 'tutor@tutorpro.local' },
    update: {},
    create: { email: 'tutor@tutorpro.local', password: tutorPass, role: 'TUTOR', status: 'ACTIVE' } as any,
  });

  // Create role profiles (schema expects these required fields)
  const staff = await prisma.staff.upsert({
    where: { userId: staffUser.id },
    update: {},
    // Staff model requires department/position/status (string fields)
    create: {
      userId: staffUser.id,
      department: 'Operations',
      position: 'Staff',
      status: 'ACTIVE',
    },
  });

  const parent = await prisma.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: { userId: parentUser.id, name: 'Tran Thi Parent', phone: '0900000002', address: 'TP.HCM' },
  });

  const tutor = await prisma.tutor.upsert({
    where: { userId: tutorUser.id },
    update: {},
    create: { userId: tutorUser.id, specialization: 'Toán', feeProposal: 250000, feedback: null },
  });

  // Create sample class
  const cls = await prisma.class.create({
    data: {
      classID: 'CLS-001',
      subject: 'Toán 9',
      level: 'Cấp 2',
      location: 'TP.HCM',
      schedule: 'T2-T4-T6 19:00',
      fee: '300000/buổi',
      status: 'APPROVED' as any,
      parentId: parent.id,
      staffId: staff.id,
    } as any,
  });

  await prisma.application.create({
    data: { tutorId: tutor.id, classId: cls.id, status: 'APPLIED' as any, matchScore: 0.85 } as any,
  });

  console.log('✅ Seed completed');
  console.log('Demo accounts:');
  console.log('- admin@tutorpro.local / Admin@123');
  console.log('- staff@tutorpro.local / Staff@123');
  console.log('- parent@tutorpro.local / Parent@123');
  console.log('- tutor@tutorpro.local / Tutor@123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
