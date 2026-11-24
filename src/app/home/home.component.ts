import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { BlogListComponent } from '../blog/blog-list.component';
import { NewsComponent } from '../news/news.component';
import { TeamComponent } from '../team/team.component';
import { IFAQComponent } from '../ifaq/ifaq.component';
import { StartupProgramComponent } from '../startup-program/startup-program.component';
import { CareersComponent } from '../careers/careers.component';
import { NEWS_ITEMS } from '../news/news-items';
import { BLOG_POSTS } from '../blog/blog-posts';
import { PRESS_FEATURE } from './press';

@Component({
  selector: 'app-home',
  imports: [RouterLink, AboutComponent, BlogListComponent, NewsComponent,
    TeamComponent, IFAQComponent, StartupProgramComponent, CareersComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  /** The hero's briefing rail always shows the newest item of each list. */
  readonly latestNews = NEWS_ITEMS[0];
  readonly latestPost = BLOG_POSTS[0];
  readonly press = PRESS_FEATURE;
}
