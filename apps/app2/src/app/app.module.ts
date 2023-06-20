import { Lib1Module } from '@angular-nx-tailwind/lib1';
import { Lib2Module } from '@angular-nx-tailwind/lib2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  imports: [BrowserModule, AppRoutingModule, Lib1Module, Lib2Module],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
