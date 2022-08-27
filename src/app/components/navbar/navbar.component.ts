import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    console.log(this.translate.currentLang);
  }

  seleccionarLenguaje(event: any): void {
    console.log(event.target.value);
    this.translate.use(event.target.value);
  }

}
