
/*
This is the file where all the components, providers, and modules are defined.
 Without defining them here, they can’t be used elsewhere in the code.
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";

// Component Source
import { IndexComponent } from './index/index.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { HeaderComponent } from './header/header.component';

// Angular Routes
const appRoutes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    data: { title: 'Index  Page' }
  },
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'book-details/:id',
    component: BookDetailComponent,
    data: { title: 'Book Details' }
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
    data: { title: 'Create Book' }
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    data: { title: 'Edit Book' }
  },
  { path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    IndexComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }