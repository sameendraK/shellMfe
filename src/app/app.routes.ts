import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const MFE_APP_URL = 'http://localhost:4201/remoteEntry.js';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: MFE_APP_URL,
        exposedModule: './Component',
      })
        .then((m) => {
          console.log('from  M');
          return m.AppModule;
        })
        .catch((err) => console.log(err));
    },
  },
];
