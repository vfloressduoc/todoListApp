import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    data: { animation: 'home' },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    data: { animation: 'login' },
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
    data: { animation: 'signup' },
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('./pages/todo/todo.module').then((m) => m.TodoPageModule),
    data: { animation: 'todo' },
  },
  {
    path: 'archive',
    loadChildren: () =>
      import('./pages/archive/archive.module').then((m) => m.ArchivePageModule),
    data: { animation: 'archive' },
  },
  {
    path: 'today',
    loadChildren: () =>
      import('./pages/today/today.module').then((m) => m.TodayPageModule),
    data: { animation: 'today' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
