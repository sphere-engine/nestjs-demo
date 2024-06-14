import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompilerComponent } from './compiler/compiler.component';
import { ContainerComponent } from './container/container.component';
import { ProblemComponent } from './problem/problem.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'compilers',
    component: CompilerComponent,
  },
  {
    path: 'problems',
    component: ProblemComponent,
  },
  {
    path: 'containers',
    component: ContainerComponent,
  },
];
