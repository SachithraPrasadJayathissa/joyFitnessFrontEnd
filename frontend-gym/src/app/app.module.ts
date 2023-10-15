import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ManageComponent} from './views/pages/manage/manage.component';
import {BodyComponent} from './views/pages/body/body.component';
import {SidenavComponent} from './views/pages/sidenav/sidenav.component';
import {DashboardComponent} from './views/pages/dashboard/dashboard.component';
import {SettingsComponent} from './views/pages/settings/settings.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TraineerService} from "./service/traineer.service";
import {MemberService} from "./service/member.service";
import {TrainerComponent} from "./views/pages/trainer/trainer.component";
import { ManagetrainerComponent } from './views/pages/managetrainer/managetrainer.component';
import { LoginComponent } from './views/pages/login/login.component';
import {LoginService} from "./service/login.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        ManageComponent,
        BodyComponent,
        SidenavComponent,
        DashboardComponent,
        SettingsComponent,
        TrainerComponent,
        ManagetrainerComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [TraineerService, MemberService, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
