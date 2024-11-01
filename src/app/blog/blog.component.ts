import { Component } from '@angular/core';
import { BlogMainComponent } from './blog-main/blog-main.component';
import { BlogBannerComponent } from './blog-banner/blog-banner.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogMainComponent, BlogBannerComponent],
  templateUrl: './blog.component.html',
})
export class BlogComponent {}
