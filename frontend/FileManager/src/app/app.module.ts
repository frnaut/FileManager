import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HomeComponent } from './components/FileUpload/home/home.component';
import { SearchFileComponent } from './components/SearchFile/search-file/search-file.component';
import { TablePersonalDocComponent } from './components/tables/table-personal-doc/table-personal-doc.component';
import { ProfileComponent } from './components/FileUpload/profile/profile.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { EmptyComponent } from './components/shared/empty/empty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, NavBarComponent, HomeComponent, SearchFileComponent,
    TablePersonalDocComponent, ProfileComponent, LoginComponent, RegisterComponent, 
    LoadingComponent, EmptyComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule,
    HttpClientModule, BrowserAnimationsModule, NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
