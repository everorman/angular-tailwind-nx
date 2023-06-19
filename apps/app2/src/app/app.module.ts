import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Lib1Module } from '@angular-nx-tailwind/lib1';
import { Lib2Module } from '@angular-nx-tailwind/lib2';
import { TestComponent } from './test/test.component';
import { AppRoutingModule } from './app-routing.module';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    TestComponent,
    ExampleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, Lib1Module, Lib2Module],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
