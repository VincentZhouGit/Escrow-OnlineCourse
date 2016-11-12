import { Routes, RouterModule } from "@angular/router";


import { AUTH_ROUTES } from "./auth/auth.routes";
import {AdminComponent} from "./admin/admin.component";
import {LearnerComponent} from "./learner/learner.component";
import {LandingComponent} from "./auth/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full'},
    { path: 'auth', component: LandingComponent, children: AUTH_ROUTES},
    { path: 'admin', component: AdminComponent },
    { path: 'learner',component: LearnerComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);

