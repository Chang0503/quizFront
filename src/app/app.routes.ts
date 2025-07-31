
import { Routes } from '@angular/router';
import{ Path1Component } from './path-1/path-1.component';
import{ChildAComponent} from './path-1/child-a/child-a.component';
import{ChildA1Component}from './path-1/child-a/child-a-1/child-a-1.component';
import{ChildBComponent} from './path-1/child-b/child-b.component';
import{Child3Component} from './path-1/child-c/child-3.component';
import{Dialog2PathComponent} from './dialog-2/dialog-2-path/dialog-2-path.component';
import{FoodComponent} from './food/food.component';
import{HomeComponent}from './home/home.component';
import{ParkingComponent}from './parking/parking.component';
import{HotelComponent}from './hotel/hotel.component';
import { ApitestComponent } from './apitest/apitest.component';
import { WritePathComponent } from './write-path/write-path.component';

export const routes: Routes = [
  { path: 'path1', component: Path1Component },
  {  path: 'childa/:id',component: ChildAComponent},
  {path:'childa_1', component: ChildA1Component},
  {path:'childb',component:ChildBComponent},
  {path:'childc',component:Child3Component},
  {path:'dialogpath2',component:Dialog2PathComponent},
  {path:'food',component:FoodComponent},
  {path:'home',component:HomeComponent},
  {path:'parking',component:ParkingComponent},
  {path:'hotel',component:HotelComponent},
  {path:'test',component:ApitestComponent},
  {path:'write/:id',component:WritePathComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },


];
