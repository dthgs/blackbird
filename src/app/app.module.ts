import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

/*--- COMPONENTS ---*/

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HomeComponent } from './components/home/home.component';


// Meeting place for everything in the app

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalculatorComponent
  ],
  imports: [ // Modules
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [], // Services
  bootstrap: [AppComponent] // Main app component
})
export class AppModule { }
