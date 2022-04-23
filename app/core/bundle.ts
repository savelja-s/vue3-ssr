import path from 'path';
import {Request} from 'express';
import {SSR} from '../typings';

const getEntry = async (req: Request, bundle: SSR.Bundle) => {
    console.log('TTTT',bundle.path());
    return await require(bundle.path()).default(req);
}
export default <SSR.Scoped>function ({config, directories, paths}: SSR.Context): SSR.Bundle {
    const bundle: SSR.Bundle = {
        manifest: () => require(paths.manifest()),
        path: () => path.join(directories.server(), bundle.manifest()[`${config.entry.server}.js`]),
        entry: async (req: Request): Promise<SSR.BundleContext> => getEntry(req,bundle),
    }
    return bundle
}