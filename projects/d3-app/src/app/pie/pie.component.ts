import { Component, OnInit } from '@angular/core';
import { scaleOrdinal, select, pie, arc, csv } from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  constructor() { }

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];

  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors : any;

  private createSvg() {
    this.svg = select("figure#pie")
    .append('svg')
    .attr("width", this.width)
    .attr("height", this.height)
    .append('g')
    .attr("transform", `translate(${this.width/2}, ${this.height/2})`);
  }

  public createColors(data: any[]) {
    this.colors = scaleOrdinal()
    .domain(data.map(d => d.SR.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(data:  any[]) {
    const myPie = pie<any>().value((d: any) => Number(d.SR));
    
    this.svg
    .selectAll('pieces')
    .data(myPie(data))
    .enter()
    .append('path')
    .attr('d', arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr('stroke', '#121926')
    .style('stroke-width', '1px');

    // Add labels
    const labelLocation = arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg.selectAll('pieces')
    .data(myPie(data))
    .enter()
    .append('text')
    .text((d: any) => d.data.Player)
    .attr("transform", (d:any) => `translate(${labelLocation.centroid(d)})`)
    .style('text-anchor', 'middle')
    .style('font-size', 15)
  }

  ngOnInit(): void {
    this.createSvg();
    // this.createColors(this.data);
    // this.drawChart();

    csv('./assets/data.csv')
    .then(data => {
      //  console.log(data);
      const top10 = data.filter((player:any) => player.POS < 11);
      console.log(top10);
      this.createColors(top10);
      this.drawChart(top10);
    });

  }

}
