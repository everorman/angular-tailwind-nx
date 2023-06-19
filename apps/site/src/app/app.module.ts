import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Lib1Module } from '@angular-nx-tailwind/lib1';
import { Lib2Module } from '@angular-nx-tailwind/lib2';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    Lib1Module, 
    Lib2Module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
