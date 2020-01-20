import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostformComponent } from './components/postform/postform.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth-service.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { BlogpageComponent } from './components/blogpage/blogpage.component';
import { MarkdownModule } from 'ngx-markdown';
import { TagHighlightDirective } from './directive/tag-highlight.directive';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SynthboardComponent } from './features/synthboard/synthboard.component';
import { StoriesComponent } from './components/stories/stories.component';
import { TranslationHighlightComponent } from './features/translation-highlight/translation-highlight.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostformComponent,
LoginComponent,
NavComponent,
HomeComponent,
BlogpageComponent,
TagHighlightDirective,
AboutComponent,
ProjectsComponent,
SynthboardComponent,
StoriesComponent,
TranslationHighlightComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
