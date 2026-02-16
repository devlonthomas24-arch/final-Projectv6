import * as propertyService from '../services/propertiesService.js';

export async function getProperties(req, res, next) {
  try {
    const { location, pricePerNight } = req.query;

    // If filters are used
    if (location || pricePerNight) {
      const properties = await propertyService.getAllProperties({
        location,
        pricePerNight
      });

      if (properties.length === 0) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.json(properties);
    }

    // No filters → return all properties
    const properties = await propertyService.getAllProperties();
    res.json(properties);

  } catch (err) {
    next(err);
  }
}

export async function getProperty(req, res, next) {
  try {
    const property = await propertyService.getPropertyById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    next(err);
  }
}

export async function createProperty(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Bad request" });
    }

    const newProperty = await propertyService.createProperty(req.body);
    res.status(201).json(newProperty);
  } catch (err) {
    next(err);
  }
}

export async function updateProperty(req, res, next) {
  try {
    const updated = await propertyService.updateProperty(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteProperty(req, res, next) {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    next(err);
  }
}
