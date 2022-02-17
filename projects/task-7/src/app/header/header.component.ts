import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


var hamburger: HTMLDivElement;  
var navMenu: HTMLUListElement;
var navLinks:   NodeListOf<HTMLAnchorElement>;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  

  constructor(private activatedRoute: ActivatedRoute) {
    // this.hamburger = <HTMLDivElement>document.querySelector(".hamburger");
  }

  onHamburgerClick() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  onLinkClick() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }

  ngOnInit(): void {

    hamburger = <HTMLDivElement>document.getElementById("hamburger");
    navMenu = <HTMLUListElement>document.querySelector(".nav-menu");
    navLinks = <NodeListOf<HTMLAnchorElement>>document.querySelectorAll(".nav-link");

    console.log(hamburger, navMenu, navLinks);

    // this.jumpTo('menu');
    this.activatedRoute.fragment.subscribe(res => {
      // console.log(res);
      this.jumpTo(res);
    });

  }

  jumpTo(section: any) {
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
    });
  }

}
