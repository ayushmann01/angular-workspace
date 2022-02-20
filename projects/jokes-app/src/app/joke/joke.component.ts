import { Component, OnInit } from '@angular/core';
import { JokesService } from "../services/jokes-service.service";

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {

  //myjokes db
  jokes: Array<JokeModel> = [];
  jokeJson: any;


  constructor(private jokeService: JokesService) {
    
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

  
    this.jokeService.getJokes()
                    // .toPromise()
                    // .then(res => {
                    //   console.log(res);
                    // })
                    // .catch(error => console.error(error));

    
    // .subscribe(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => console.log(error)
    //   );

    this.jokeService.getJokes().subscribe(
          (response) => {
            // console.log(response);
            // this.jokeJson = response.jokes;
            this.jokeJson = response;
            this.jokes = this.jokeJson.jokes.map((joke: JokeJson)  => {
                return new JokeModel(joke.setup, joke.delivery);
            });
          },
          (error) => console.log(error)
      );

     setTimeout(() => console.log(this.jokeJson),1000); 
    console.log(this.jokeJson);

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
