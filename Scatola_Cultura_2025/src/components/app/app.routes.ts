import { Routes } from '@angular/router';
import { Homepage } from '../homepage/homepage';
import { Detail } from '../detail/detail';

export const routes: Routes = [
    { 
        path: '', 
        component: Homepage 
    },
    { 
        path: 'homepage', 
        component: Homepage 
    },
    {
        path:'detail/:id',
        component:Detail
    }
];
