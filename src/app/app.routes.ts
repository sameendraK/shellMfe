import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const MFE_APP_URL = "http://localhost:4201/remoteEntry.js"
export const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
    },
    {
        path: 'mfe1',
        loadChildren: () => {
            return loadRemoteModule({
                type:'script',
                remoteEntry: MFE_APP_URL,
                remoteName: "mfe1",
                exposedModule: "./Component"
            }).then((m) => {
                console.log("from  M")
                return m.Component
            }).catch(err => console.log(err))
        }
    }
];
