import {createApplication} from './app'
import {appStore} from './store/app'

export default (context: any) => {
    return new Promise((resolve, reject) => {
        const {app, router} = createApplication()
        console.log('SERVER START URL ', context.url);
        router.push(context.url)
        router.isReady()
            .then(() => {
                const matchedComponents = router.currentRoute.value.matched;
                console.log('matchedComponents', matchedComponents);
                if (!matchedComponents.length) {
                    console.log('404');
                    return reject(new Error('404'));
                }
                const state = {
                    app: appStore.getState()
                }
                return resolve({app, router, state});
            })
            .catch((e) => {
                console.log('e reject',e);
                reject(e);
            });
    })
}