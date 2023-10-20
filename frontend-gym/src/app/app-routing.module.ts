import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./views/pages/dashboard/dashboard.component";
import {ManageComponent} from "./views/pages/manage/manage.component";
import {SettingsComponent} from "./views/pages/settings/settings.component";
import {TrainerComponent} from "./views/pages/trainer/trainer.component";
import {ManagetrainerComponent} from "./views/pages/managetrainer/managetrainer.component";
import {LoginComponent} from "./views/pages/login/login.component";
import {NavMemberComponent} from "./views/pages/nav-member/nav-member.component";
import {MemberDadhboardComponent} from "./views/pages/member-dadhboard/member-dadhboard.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'nav-member',
    children: [
      {
        path: 'dashboard',
        component: MemberDadhboardComponent,
      },
    ],
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'manage',
    component: ManageComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'trainer',
    component: TrainerComponent
  },
  {
    path: 'managetrainer',
    component: ManagetrainerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
