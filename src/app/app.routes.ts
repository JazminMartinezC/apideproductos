import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
export const routes: Routes = [
   
    {
        path: 'login', component:LoginComponent
    },
    {
        path: 'user-list', component:UserListComponent
    },
    {
        path: '', redirectTo: '/login',pathMatch:'full'
    },
];
