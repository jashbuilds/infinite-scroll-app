// import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, QueryList, viewChildren, ViewChildren } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { AirlinesService } from '../../Services/items/items.service';
// import { CommonModule, CurrencyPipe } from '@angular/common';

// @Component({
//   selector: 'app-items-grid',
//   imports: [CommonModule, CurrencyPipe],
//   templateUrl: './items-grid.component.html',
//   styleUrl: './items-grid.component.css'
// })
// export class ItemsGridComponent implements AfterViewInit {

//   itemSub: Subscription = new Subscription();
//   itemsService = inject(AirlinesService);
//   currentPage: number = 1
//   totalItems: number = 0
//   observer: any
//   items: any[] = []

//   // theLastCard = viewChildren<ElementRef<HTMLDivElement>>('theLastCard')
//   @ViewChildren('theLastCard') theLastCard!: QueryList<ElementRef>

//   constructor() {
//     effect(() => {
//       this.getItems();
//     })

//   }

//   ngAfterViewInit(): void {
//     this.theLastCard.changes.subscribe((d) => {

//       if (d.last) {
//         // this.observer.observe(d.last.nativeElement);
//       }
//     });

//   }

//   getItems() {
//     this.itemSub = this.itemsService.getAS(this.currentPage).subscribe((data) => {
//       this.items = data
//       this.totalItems = data.length;
//     });
//   }

//   intersectionObserver() {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.5
//     }

//     this.observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         if (this.currentPage < this.totalItems) {
//           this.currentPage++;
//           this.getItems();
//         }

//       }
//     }, options);
//   }


// }


import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../Services/items/items.service';

@Component({
  selector: 'app-items-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items-grid.component.html',
  styleUrls: ['./items-grid.component.css']
})
export class ItemsGridComponent implements AfterViewInit {
  @ViewChild('sentinel') sentinel!: ElementRef;

  items: any[] = [];
  loading = false;
  page = 1;

  currentPage: number = 1
  totalItems: number = 0
  limit: number = 10

  itemsService: ItemsService = inject(ItemsService);

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading) {
          this.loadMoreItems();
        }
      });
    }, options);

    observer.observe(this.sentinel.nativeElement);
  }

  // private loadInitialPosts() {
  //   this.generatePosts(10);
  // }

  getItems() {
    this.itemsService.getAS(this.currentPage, this.limit).subscribe((data: any[]) => {
      this.items = data
      this.totalItems = data.length;
    });
  }

  private loadMoreItems() {
    this.loading = true;
    this.currentPage++;
    this.limit += 10;
    
    this.getItems()
    
  }

  // private generatePosts(count: number) {
  //   const newPosts = Array.from({ length: count }, (_, i) => ({
  //     id: this.posts.length + i + 1,
  //     title: `Post ${this.posts.length + i + 1}`,
  //     content: `This is the content for post ${this.posts.length + i + 1}. It demonstrates infinite scrolling using the Intersection Observer API.`
  //   }));

  //   this.posts = [...this.posts, ...newPosts];
  // }
} 