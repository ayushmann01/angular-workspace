import { Component, OnInit } from '@angular/core';
import { axisBottom, axisLeft, csv, max, scaleBand, scaleLinear, select} from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }

  // private data = [
  //   { "Framework": "Vue", "Stars": "166443", "Released": "2014" },
  //   { "Framework": "React", "Stars": "150793", "Released": "2013" },
  //   { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
  //   { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
  //   { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
  // ];

  
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2 );
  
  private createSvg() {
    this.svg = select("figure#bar")
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2.5))
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`)
    }
    
    private drawBars(data: any[]) {
      // create the X-axis band scale
      const x = scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Player))
      .padding(0.2);
      
      // Draw the X-axis on the DOM
      this.svg.append('g')
      .attr("transform", `translate(0,${this.height})`)
      .call(axisBottom(x))
      .selectAll("text")
      .attr("transform", `translate(-10,0) rotate(-45)`)
      .style("text-anchor", "end")
      .style('font-size', '1.2em');
      
      // create the y-axis band scale
    const y = scaleLinear()
    .domain([0, max(data, d => d.Runs)])
    .range([this.height, 0]);
    
    // draw the y-axis on the DOM
    this.svg.append("g")
    .call(axisLeft(y));
    
    // create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d:any) => x(d.Player))
    .attr("y", (d: any) => y(d.Runs))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.Runs))
    .attr('fill', 'steelblue');

  }
  
  ngOnInit(): void {
    this.createSvg();
    // this.drawBars(this.data);
    // console.log(this.data);
    csv('./assets/data.csv')
    .then(data => {
      // console.log(data);
      const top10 = data.filter((player: any) => player['POS'] < 11 );
      this.drawBars(top10);
      // this.data = data;
    });
  }
  
}
