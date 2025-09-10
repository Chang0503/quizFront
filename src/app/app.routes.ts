
import { Routes } from '@angular/router';
import { Path1Component } from './path-1/path-1.component';
import { ChildAComponent } from './path-1/child-a/child-a.component';
import { ChildA1Component } from './path-1/child-a/child-a-1/child-a-1.component';
import { ChildBComponent } from './path-1/child-b/child-b.component';
import { FoodComponent } from './food/food.component';
import { HomeComponent } from './home/home.component';
import { ParkingComponent } from './parking/parking.component';
import { HotelComponent } from './hotel/hotel.component';
import { WritePathComponent } from './write-path/write-path.component';
import { CarCreateComponent } from './car-create/car-create.component';

//守衛
import { login } from './guard/login';
import { fillin } from './guard/fillin';

export const routes: Routes = [
  { path: 'path1', component: Path1Component },
  { path: 'childa/:id', component: ChildAComponent, canActivate: [fillin] },
  { path: 'childa_1', component: ChildA1Component, canActivate: [fillin] },
  { path: 'childb', component: ChildBComponent, canActivate: [login] },
  { path: 'food', component: FoodComponent },
  { path: 'home', component: HomeComponent },
  { path: 'parking', component: ParkingComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'write/:id', component: WritePathComponent, canActivate: [fillin] },
  { path: 'carCreate', component: CarCreateComponent, canActivate: [login] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },


];
