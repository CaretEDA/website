import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { BlogListComponent } from '../blog/blog-list.component';
import { NewsComponent } from '../news/news.component';
import { TeamComponent } from '../team/team.component';
import { IFAQComponent } from '../ifaq/ifaq.component';
import { StartupProgramComponent } from '../startup-program/startup-program.component';
import { CareersComponent } from '../careers/careers.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AboutComponent, BlogListComponent, NewsComponent,
    TeamComponent, IFAQComponent, StartupProgramComponent, CareersComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
