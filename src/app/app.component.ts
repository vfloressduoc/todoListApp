import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { fadeInOutAnimation } from 'src/app/animations'; 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeInOutAnimation], // animation
})
export class AppComponent {
  showMenu = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd | NavigationStart =>
        event instanceof NavigationEnd || event instanceof NavigationStart
      )
    ).subscribe((event: NavigationEnd | NavigationStart) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = this.shouldShowMenu(event.url);
      } else if (event instanceof NavigationStart) {
        // Optionally handle NavigationStart events if needed
      }
    });
  }

  private shouldShowMenu(url: string): boolean {
    const excludedRoutes = ['/login', '/signup', '/home'];
    return !excludedRoutes.includes(url);
  }

  prepareRoute() {
    return this.router.routerState.snapshot.root;
  }
}
