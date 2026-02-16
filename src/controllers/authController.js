import * as authService from '../services/authService.js';

export async function login(req, res) {
  const { username, password } = req.body;

  const result = await authService.login(username, password);

  if (!result) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.json(result);
}
