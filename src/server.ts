// import 'zone.js/node';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// import * as express from 'express';
// import { join } from 'path';

// import { AppServerModule } from './main.server';

// export function app(): express.Express {
//   const server = express();
//   const distFolder = join(process.cwd(), 'dist/employee-dashboard/browser');
//   const indexHtml = 'index.html';

//   server.engine('html', ngExpressEngine({
//     bootstrap: AppServerModule,
//   }));

//   server.set('view engine', 'html');
//   server.set('views', distFolder);

//   // Serve static files
//   server.get('*.*', express.static(distFolder, {
//     maxAge: '1y'
//   }));

//   // All regular routes use the Universal engine
//   server.get('*', (req, res) => {
//     res.render(indexHtml, { req });
//   });

//   return server;
// }

// function run(): void {
//   const port = process.env.PORT || 4000;
//   const server = app();
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// if (require.main === module) {
//   run();
// }

// export * from './main.server';
