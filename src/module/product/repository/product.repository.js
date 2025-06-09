import { prisma } from '../../../helper/db.js';

export const getAll = async () => {
  return prisma.product.findMany();
};

export const getById = async (id) => {
  return prisma.product.findUnique({ where: { id: Number(id) } });
};

export const create = async (data) => {
  return prisma.product.create({ data });
};

export const updateById = async (id, data) => {
  return prisma.product.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteById = async (id) => {
  return prisma.product.delete({ where: { id: Number(id) } });
};
