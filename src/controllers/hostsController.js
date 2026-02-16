import * as hostService from '../services/hostsService.js';

export async function getHosts(req, res, next) {
  try {
    const { name } = req.query;

    if (name) {
      const hosts = await hostService.findHostsByName(name);

      if (hosts.length === 0) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.json(hosts);
    }

    const hosts = await hostService.getAllHosts();
    res.json(hosts);
  } catch (err) {
    next(err);
  }
}

export async function getHost(req, res, next) {
  try {
    const host = await hostService.getHostById(req.params.id);

    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }

    res.json(host);
  } catch (err) {
    next(err);
  }
}

export async function createHost(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Bad request" });
    }

    const newHost = await hostService.createHost(req.body);
    res.status(201).json(newHost);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Host already exists" });
    }
    next(err);
  }
}

export async function updateHost(req, res, next) {
  try {
    const updated = await hostService.updateHost(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    if (err.code === 'P2025' || err.code === 'P2023') {
      return res.status(404).json({ error: 'Host not found' });
    }
    next(err);
  }
}

export async function deleteHost(req, res, next) {
  try {
    await hostService.deleteHost(req.params.id);
    res.json({ message: 'Host deleted' });
  } catch (err) {
    if (err.code === 'P2025' || err.code === 'P2023') {
      return res.status(404).json({ error: 'Host not found' });
    }
    next(err);
  }
}
