import { Component, OnInit } from '@angular/core';
import { axisBottom, axisLeft, csv, format, max, scaleLinear, select } from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  constructor() { }

  // private data = [
  //   {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
  //   {"Framework": "React", "Stars": "150793", "Released": "2013"},
  //   {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
  //   {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
  //   {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  // ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawPlot(data: any[]): void {
  // Add X axis
  const x = scaleLinear()
  .domain([0, 10])
  .range([ 0, this.width]);
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(axisBottom(x));

  // Add Y axis
  const y = scaleLinear()
  .domain([0, 100])
  .range([ this.height, 0]);
  this.svg.append("g")
  .call(axisLeft(y));

  // Add dots
  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d:any) => x(d.POS))
  .attr("cy", (d:any) => y(d.HS))
  .attr("r", 5)
  .style("opacity", .5)
  .style("fill", "#69b3a2");

  // Add labels
  dots.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text((d:any) => d.Player)
  .attr("x", (d:any) => x(d.POS))
  .attr("y", (d:any) => y(d.HS))
  .style('font-size', '10px')
}


  ngOnInit(): void {
    this.createSvg();
    // this.drawPlot()

    csv('./assets/data.csv')
     .then(data => {
          const top10 = data.filter((player:any) => player.POS < 11);
          console.log(top10);
          this.drawPlot(top10);
     });

  }

}
