import * as service from '../service/auth.service.js';

export async function register(req, res, next) {
  try {
    const user = await service.register(req.body);
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { token } = await service.login(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

export async function assignRole(req, res, next) {
  try {
    const { email, role } = req.body;
    const updated = await service.assignRole(email, role);
    res.json({ email: updated.email, role: updated.role });
  } catch (err) {
    next(err);
  }
}
