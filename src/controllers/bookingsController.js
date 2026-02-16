import * as bookingService from '../services/bookingsService.js';

export async function getBookings(req, res, next) {
  try {
    const { userId } = req.query;

    if (userId) {
      const bookings = await bookingService.getAllBookings({ userId });

      if (bookings.length === 0) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.json(bookings);
    }

    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
}

export async function getBooking(req, res, next) {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    next(err);
  }
}

export async function createBooking(req, res, next) {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Bad request" });
    }

    const newBooking = await bookingService.createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
}

export async function updateBooking(req, res, next) {
  try {
    const updated = await bookingService.updateBooking(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteBooking(req, res, next) {
  try {
    await bookingService.deleteBooking(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    next(err);
  }
}
