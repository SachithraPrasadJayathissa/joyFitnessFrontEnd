import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {MemberNavbarData} from "./nav-data";
interface SideNavMemToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-nav-member',
  templateUrl: './nav-member.component.html',
  styleUrls: ['./nav-member.component.css']
})
export class NavMemberComponent  implements OnInit {
  showNav: boolean = true;
  constructor( private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showNav = !event.url.includes('/login');
      }
    });

  }

  @Output() onToggleSideNav: EventEmitter<SideNavMemToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = MemberNavbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
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
