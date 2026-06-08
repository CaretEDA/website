import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DemosComponent } from './demos/demos.component';
import { BlogListComponent } from './blog/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail.component';
import { IFAQComponent } from './ifaq/ifaq.component';
import { CareersComponent } from './careers/careers.component';

export const routes: Routes = [
  { path: '',            component: HomeComponent },
  { path: 'about',       component: AboutComponent },
  { path: 'demos',       component: DemosComponent },
  { path: 'blogs',       component: BlogListComponent },
  { path: 'blogs/:slug', component: BlogDetailComponent },
  { path: 'ifaq',        component: IFAQComponent },
  { path: 'careers',     component: CareersComponent },
  { path: '**',          redirectTo: '' },
];
