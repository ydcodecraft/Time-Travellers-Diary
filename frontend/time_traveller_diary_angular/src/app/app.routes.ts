import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './pages/home/home/home.component';
import { DiaryComponent } from './pages/diary/diary.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'diary-dashboard', component: DiaryComponent, canActivate: [AuthGuard]}
];


