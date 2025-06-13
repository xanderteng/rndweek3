import * as repo from '../repository/auth.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const registerSchema = Joi.object({
  name:        Joi.string().required(),
  email:       Joi.string().email().required(),
  password:    Joi.string().pattern(/(?=.*[A-Z])(?=.*\d).{6,}/).required(),
  dateOfBirth: Joi.date().required(),
});

export async function register(payload) {
  const { error, value } = registerSchema.validate(payload);
  if (error) throw Object.assign(new Error(error.details[0].message), { status: 400 });

  const exists = await repo.findByEmail(value.email);
  if (exists) throw Object.assign(new Error('Email already used'), { status: 409 });

  const hashed = await bcrypt.hash(value.password, 10);
  return repo.createUser({ 
    name: value.name,
    email: value.email,
    password: hashed,
    role: 'reader',
    dateOfBirth: value.dateOfBirth,
  });
}

export async function login({ email, password }) {
  const user = await repo.findByEmail(email);
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return { token };
}

export async function assignRole(email, role) {
  return repo.updateRole(email, role);
}
