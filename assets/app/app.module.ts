import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import {AdminComponent} from "./admin/admin.component";
import { LandingComponent} from "./landing/authentication.component";
import {AuthService} from "./landing/auth.service";
import {LearnerComponent} from "./learner/learner.component";
import {routing} from "./app.routing";
import {LogoutComponent} from "./landing/logout.component";
import {SignupComponent} from "./landing/signup.component";
import {SigninComponent} from "./landing/signin.component";
import {AUTH_ROUTES} from "./landing/auth.routes";



@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        LearnerComponent,

        LandingComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {

}