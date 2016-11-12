import { Routes, RouterModule } from "@angular/router";


import { AUTH_ROUTES } from "./landing/auth.routes";
import {AdminComponent} from "./admin/admin.component";
import {LearnerComponent} from "./learner/learner.component";
import {LandingComponent} from "./landing/authentication.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full'},
    { path: 'landing', component: LandingComponent, children: AUTH_ROUTES},
    { path: 'admin', component: AdminComponent },
    { path: 'learner',component: LearnerComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);

