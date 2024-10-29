import { Component } from '@angular/core';
import { BlogMainComponent } from './blog-main/blog-main.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogMainComponent],
  templateUrl: './blog.component.html',
})
export class BlogComponent {}
