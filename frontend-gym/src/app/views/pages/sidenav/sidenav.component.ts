import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from './nav-data';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {NavigationStart, Router} from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [trigger('rotate', [transition(':enter', [animate('1000ms', keyframes([style({
    transform: 'rotate(0deg)',
    offset: '0'
  }), style({transform: 'rotate(2turn)', offset: '1'})]))])])]
})

export class SidenavComponent implements OnInit {
  showNav: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showNav = !event.url.includes('/login');
      }
    });

  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if (sessionStorage.getItem('user_role') == 'ROLE_MEMBER') {
      this.navData = [
        {
          routeLink: 'nav-member/dashboard',
          icon: 'fal fa-home',
          label: 'Dashboard'
        }

      ];
    }else {
      this.navData=navbarData;
    }
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }



  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {

    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }


}
