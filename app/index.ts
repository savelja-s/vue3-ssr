import express, {Express, Request, Response} from 'express';
import compression from 'compression';
import middleware from './core/middleware'
import renderer from './core/renderer'
import shutdown from './core/shutdown'
import {SSR} from './typings';


export default <SSR.Scoped>function (ctx: SSR.Context): void {
    const {assets, https, reload} = middleware(ctx);
    const app: Express = express();
    // const httpsServer = require('https');
    // const fs = require('fs');
    // const options = {
    //     key: fs.readFileSync('../comics_backend/docker/nginx/certs/comics-site.key'),
    //     cert: fs.readFileSync('../comics_backend/docker/nginx/certs/comics-site.crt')
    // };
    // httpsServer.createServer(options, (req, res) => {
    //     res.writeHead(200);
    //     res.end('hello world\n');
    // }).listen(8000);


    app.use(compression())
    app.use(assets());
    const {config} = ctx;
    config.https && app.use(https());
    config.reload && app.use(reload());
    app.get('*', async (req: Request, res: Response) => {
        await renderer(ctx).response(req, res);
    });
    app.listen(config.port, config.hostname, () => {
            console.log(
                `Server started at ${config.https ? 'https' : 'http'}://${config.hostname}:${config.port}`
            );
        }
    );
    const PrettyError = require('pretty-error');
    const pe = new PrettyError();

// and use it for our app's error handler:
    app.use(async function (err: any, req: Request, res: Response, next: any) {
        console.log("TEST", pe.render(err));
        next();
    });
    shutdown();
}