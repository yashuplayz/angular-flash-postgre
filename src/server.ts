// import {
//   AngularNodeAppEngine,
//   createNodeRequestHandler,
//   isMainModule,
//   writeResponseToNodeResponse,
// } from '@angular/ssr/node';
// import cors from 'cors';
// import express from 'express';
// import { join } from 'node:path';
// import { Pool } from 'pg';

// const browserDistFolder = join(import.meta.dirname, '../browser');

// const app = express();
// const angularApp = new AngularNodeAppEngine();

// // PostgreSQL connection setup
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'employee_db', 
//   password: 'Yashu@143', 
//   port: 5432, 
// });

// app.use(cors());

// /**
//  * Example Express Rest API endpoints can be defined here.
//  * Uncomment and define endpoints as necessary.
//  *
//  * Example:
//  * ```ts
//  * app.get('/api/{*splat}', (req, res) => {
//  *   // Handle API request
//  * });
//  * ```
//  */

// /**
//  * Serve static files from /browser
//  */
// app.use(
//   express.static(browserDistFolder, {
//     maxAge: '1y',
//     index: false,
//     redirect: false,
//   }),
// );

// /**
//  * Express REST API for employees
//  */
// app.use(express.json());

// app.get('/employees', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM employees ORDER BY id');
//     res.json(result.rows);
//   } catch (err) {
//     const error = err instanceof Error ? err : new Error('Unknown error');
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/employees', async (req, res) => {
//   const { name, email, designation } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO employees (name, email, designation) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, designation],
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     const error = err instanceof Error ? err : new Error('Unknown error');
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/employees/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email, designation } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE employees SET name = $1, email = $2, designation = $3 WHERE id = $4 RETURNING *',
//       [name, email, designation, id],
//     );
//     if (result.rowCount === 0) {
//       res.status(404).json({ error: 'Not found' });
//       return;
//     }
//     res.json(result.rows[0]);
//   } catch (err) {
//     const error = err instanceof Error ? err : new Error('Unknown error');
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/employees/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
//     if (result.rowCount === 0) {
//       res.status(404).json({ error: 'Not found' });
//       return;
//     }
//     res.status(204).send();
//   } catch (err) {
//     const error = err instanceof Error ? err : new Error('Unknown error');
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * Handle all other requests by rendering the Angular application.
//  */
// app.use((req, res, next) => {
//   angularApp
//     .handle(req)
//     .then((response) =>
//       response ? writeResponseToNodeResponse(response, res) : next(),
//     )
//     .catch(next);
// });

// /**
//  * Start the server if this module is the main entry point.
//  * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
//  */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, (error) => {
//     if (error) {
//       throw error;
//     }

//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// /**
//  * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
//  */
// export const reqHandler = createNodeRequestHandler(app);
