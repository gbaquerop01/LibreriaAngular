import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  standalone: false,

  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent implements OnInit, OnDestroy {
  items: MenuItem[] = []
  home: MenuItem = {icon: 'pi pi-home', routerLink: '/'};
  private titleSUB$: Subscription;

  constructor(private router: Router) {
    this.titleSUB$=this.getDataRouter().subscribe(
      ({title}) => {
        this.items = []
        this.items.push({label: title})
      }
    )
  }

  ngOnInit(): void {

  }

  getDataRouter() {
    return this.router.events.pipe(
      filter((e:any) => e instanceof ActivationEnd),
      filter((e:ActivationEnd) => e.snapshot.firstChild === null),
      map((e:ActivationEnd) => e.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.titleSUB$.unsubscribe();
  }
}
