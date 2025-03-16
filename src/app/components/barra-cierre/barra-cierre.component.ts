import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-barra-cierre',
  standalone: false,

  templateUrl: './barra-cierre.component.html',
  styleUrl: './barra-cierre.component.css'
})
export class BarraCierreComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    this.router.navigateByUrl('/')
  }
}
