import {Store} from "@/store";

export interface AppState extends Object {
    fetching: boolean
}

class AppStore extends Store<AppState> {
    protected hydrate(state: object): any {
        console.log('AppStore.hydrate.state', state);
        const t_app = (state as any).app;
        const t_data = this.data();
        console.log('A', t_app, 'D', t_data);
        return (state as any).app || this.data();
    }

    protected data(): AppState {
        return {
            fetching: false,
        };
    }

    set fetching(fetching: boolean) {
        this.state.fetching = fetching;
    }
}

export const appStore: AppStore = new AppStore()