import express from "express";
import * as Sentry from "@sentry/node";
import usersRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import authRouter from "./routes/auth.js";
import { requestLogger } from "./middleware/loggingMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0
});

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(requestLogger);

app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Bad request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "P2023") {
    return res.status(404).json({ error: "Not found" });
  }
  if (err.code === "P2025") {
    return res.status(404).json({ error: "Not found" });
  }
  next(err);
});

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
