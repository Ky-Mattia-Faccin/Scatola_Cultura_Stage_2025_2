import { Routes } from '@angular/router';
import { Homepage } from '../homepage/homepage';
import { Detail } from '../detail/detail';

export const routes: Routes = [
    { 
        path: '', 
        component: Homepage 
    },
    { 
        path: 'detail',
        component: Detail 
    },
    { 
        path: 'homepage', 
        component: Homepage 
    }
];
