import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
import { BlogpageComponent } from './components/blogpage/blogpage.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SynthboardComponent } from './features/synthboard/synthboard.component';
import { StoriesComponent } from'./components/stories/stories.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'post', component: PostComponent, canActivate: [AuthGuard]  },
  { path: 'blog', component: HomeComponent },
  { path: 'blogpost/:id', component: BlogpageComponent },
  { path: 'about', component: AboutComponent},
  { path: 'projects', component: ProjectsComponent },
  { path: 'synthboard', component: SynthboardComponent },
  { path: 'stories', component: StoriesComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
