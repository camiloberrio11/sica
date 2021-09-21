import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./feature/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'select-construction',
    loadChildren: () => import('./feature/auth/select-construction/select-construction.module').then( m => m.SelectConstructionPageModule)
  },
  {
    path: 'select-flow',
    loadChildren: () => import('./feature/auth/select-flow/select-flow.module').then( m => m.SelectFlowPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
