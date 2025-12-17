import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import { database } from './config/database';

const app: Application = express();

// Connect DB
database();

// HTTP header security
app.use(helmet());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: 'Too many request, try again in 15 minutes',
});
app.use(limiter);

// JSON body parser
app.use(express.json());

// Data sanitize

// Prevent parameter polution
app.use(hpp());

// Enabling compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'develompent') app.use(morgan('dev'));

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Server running...');
});

export default app;
