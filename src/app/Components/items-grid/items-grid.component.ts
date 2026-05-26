import { Component, AfterViewInit, ElementRef, inject, NgZone, signal, viewChild } from '@angular/core';
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
  // Signal-based view query
  sentinel = viewChild<ElementRef>('sentinel');

  // Signal-based reactive state
  items = signal<any[]>([]);
  loading = signal(false);
  currentPage = signal(0);
  limit = signal(10);
  hasMore = signal(true);

  itemsService = inject(ItemsService);
  private ngZone = inject(NgZone);
  private observer!: IntersectionObserver;

  // Set up Intersection Observer after the view initializes
  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  // Set up Intersection Observer to load more items when the sentinel is in view
  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading() && this.hasMore()) {
          this.ngZone.run(() => this.loadMoreItems());
        }
      });
    }, options);

    const sentinelEl = this.sentinel()?.nativeElement;
    if (sentinelEl) {
      this.observer.observe(sentinelEl);
    }
  }

  // Load more items when the sentinel is intersecting
  private loadMoreItems() {
    this.loading.set(true);
    const offset = this.currentPage() * this.limit();

    this.itemsService.getAS(offset, this.limit()).subscribe((data: any[]) => {
      // Update items by spreading the previous state
      this.items.update(prev => [...prev, ...data]);
      this.currentPage.update(p => p + 1);
      this.loading.set(false);

      if (data.length < this.limit()) {
        this.hasMore.set(false);
      }
    });
  }
}
