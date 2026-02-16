import * as userService from '../services/usersService.js';

export async function getUsers(req, res, next) {
  try {
    const { username, email } = req.query;

    // Filter by username
    if (username) {
      const user = await userService.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "Not found" });
      }
      return res.json(user);
    }

    // Filter by email
    if (email) {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Not found" });
      }
      return res.json(user);
    }

    // No filters → return all users
    const users = await userService.getAllUsers();
    res.json(users);

  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Bad request" });
    }

    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "User already exists" });
    }
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    if (err.code === 'P2025' || err.code === 'P2023') {
      return res.status(404).json({ error: 'User not found' });
    }
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    if (err.code === 'P2025' || err.code === 'P2023') {
      return res.status(404).json({ error: 'User not found' });
    }
    next(err);
  }
}
