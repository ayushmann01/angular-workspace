import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../../user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private httpService: UserAPIService) { }

  entries: any;

  ngOnInit(): void {
    this.httpService.getEntries().subscribe(
      (response) => {
        this.entries = response
      }, (error) => { console.log(error) }
    )
  }
}

