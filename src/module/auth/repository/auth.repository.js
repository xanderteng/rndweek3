import { prisma } from '../../../helper/db.js';

export const findByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

export const createUser = (data) =>
  prisma.user.create({ data });

export const updateRole = (email, role) =>
  prisma.user.update({
    where: { email },
    data: { role },
  });
