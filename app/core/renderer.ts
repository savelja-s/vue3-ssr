import {Request, Response} from 'express';
import {renderToString} from '@vue/server-renderer';
import fs from 'fs';
import {h} from 'vue';
import bundle from './bundle'
import {SSR} from '../typings';

export default <SSR.Scoped>function (ctx: SSR.Context): SSR.Renderer {
    const renderer: SSR.Renderer = {
        response: async (req: Request, res: Response) => {
            console.log("start renderer response");
            const context: SSR.BundleContext = await bundle(ctx).entry(req);
            const content: SSR.OutputContext = await renderer.context(context);
            console.log("renderer.response", ctx.paths.template());
            if (fs.existsSync(ctx.paths.template())) {
                console.log("renderer.response.fixe-exists");
                fs.readFile(ctx.paths.template(), (err: NodeJS.ErrnoException | null, template: Buffer) => {
                    console.log("response err,template", err, template);
                    if (err) {
                        throw err;
                    }
                    res.setHeader('Content-Type', 'text/html');
                    res.send(renderer.hydrate(template, content));
                });
            }
        },
        context: async ({app, state}: SSR.BundleContext): Promise<SSR.OutputContext> => {
            console.log("renderer.context");
            return {
                app: await renderToString(app),
                state: JSON.stringify(state),
                meta: await renderToString(
                    h(app._context.components.PageMeta as any)
                )
            };
        },
        hydrate: (template: Buffer, {app, meta, state}: SSR.OutputContext) => {
            console.log("renderer.hydrate.state", state);
            return template.toString()
                .replace('<meta name="meta">', meta)
                .replace('<div id="app"></div>', `<div id="app">${app}</div>`)
                .replace('<div id="state"></div>', `<script>window.__STATE__ = ${state}</script>`)
        },
    }
    return renderer
}