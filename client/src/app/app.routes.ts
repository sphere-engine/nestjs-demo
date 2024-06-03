import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompilerComponent } from './compiler/compiler.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'compilers',
    component: CompilerComponent,
  },
  {
    path: 'problems',
    // TODO ZMIENIC
    component: HomeComponent,
  },
  {
    path: 'containers',
    // TODO ZMIENIC
    component: HomeComponent,
  },
];
