import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JokesService } from "../services/jokes-service.service";

class MyService {}

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
  providers: [MyService]
})
export class JokeComponent implements OnInit {

  //myjokes db
  jokes: Array<JokeModel> = [];
  // private jokes: Observable<JokeModel[]> = [];
  jokeJson: any;
  loading: boolean = false;


  constructor(private jokeService: JokesService,@Inject(MyService) private myService: MyService) {
    
  }

  ngOnInit(): void {
    // this.jokes = [
    //   new JokeModel("my title-1", 'my punchline-1'),
    //   new JokeModel("my title-2", 'my punchline-2'),
    //   new JokeModel("my title-3", 'my punchline-3'),
    //   new JokeModel("my title-4", 'my punchline-4'),
    //   new JokeModel("my title-5", 'my punchline-5'),
    //   new JokeModel("my title-6", 'my punchline-6'),
    //   new JokeModel("my title-7", 'my punchline-7'),
    //   new JokeModel("my title-8", 'my punchline-8'),
    // ];

  
    // this.jokeService.getJokes()
                    // .toPromise()
                    // .then(res => {
                    //   console.log(res);
                    // })
                    // .catch(error => console.error(error));

    // this.jokeService.getJokes()
    //                 .subscribe(
    //                     (response) => {
    //                       console.log(response);
    //                     },
    //                     (error) => console.log(error)
    //                   );

    this.loading = true;
    this.jokeService.getJokes().subscribe(
          (response: any) => {
            // console.log(response);
            this.jokeJson = response.jokes;
            // this.jokeJson = response;
            this.jokes = this.jokeJson.map((joke: JokeJson)  => {
                return new JokeModel(joke.setup, joke.delivery);
            });
            this.loading = false;
          },
          (error: HttpErrorResponse) => console.log(error.message)
      );

    //  setTimeout(() => console.log(this.jokeJson),1000); 
    // console.log(this.jokeJson);
  }



  onClick(joke: JokeModel) {
    joke.togglePunchline();
  }

}

interface JokeJson {
  setup: string;
  delivery: string;
}

class JokeModel {
  viewPunchline: boolean = false;
  constructor(private title: string, private punchline: string) { }

  getTitle() {
    return this.title;
  }

  togglePunchline() {
    this.viewPunchline = !this.viewPunchline;
  }

  getPunchline() {
    return this.punchline;
  }
}
