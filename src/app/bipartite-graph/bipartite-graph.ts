import Node from './node';
import Edge from './edge';
import Config from './config';

const NODE_WIDTH = 100;
const NODE_HEIGHT = 50;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;
const MARGIN = 10;
const TEXT_WIDTH = 100;
const TEXT_HEIGHT = 30;
const CONTAINER = 'container';

export default class BipariteGraph {
  private capacityNodes: Node[];
  private demandNodes: Node[];
  private deliveries: Edge[];
  private config: Config;

  public constructor (capacities: number[], demands: number[], deliveries: number[][], config?: Config) {
    this.setConfig(config);
    this.capacityNodes = [];
    this.demandNodes = [];
    this.deliveries = [];

    capacities
      .forEach((el: number, idx: number, arr: number[]) => {
        this.capacityNodes.push(new Node({ x: this.config.margin + this.config.nodeWidth / 2, y: this.config.margin + this.config.nodeHeight / 2 + idx * (this.config.canvasHeight - 2 * this.config.margin - this.config.nodeHeight) / (arr.length - 1)}, idx, el, { nodeWidth: this.config.nodeWidth, nodeHeight: this.config.nodeHeight}));
      });

    demands
      .forEach((el: number, idx: number, arr: number[]) => {
        this.demandNodes.push(new Node({ x: this.config.canvasWidth - this.config.margin - this.config.textWidth / 2, y: this.config.margin + this.config.nodeHeight / 2 + idx * (this.config.canvasHeight - 2 * this.config.margin - this.config.nodeHeight) / (arr.length - 1)}, idx, el, { nodeWidth: this.config.nodeWidth, nodeHeight: this.config.nodeHeight}));
      });

    deliveries
      .forEach((el: number[], idxCapacity: number) => {
        el.forEach((cost: number, idxDemand: number) => {
          this.deliveries.push(new Edge(this.capacityNodes[idxCapacity], this.demandNodes[idxDemand], cost, { textWidth: this.config.textWidth, textHeight: this.config.textHeight}));
        })
      });
  }

  public setAmount(capacityNode: number, demandNode: number, amount: number) {
    this.deliveries[(capacityNode-1)*this.demandNodes.length+(demandNode-1)].setAmount(amount);
  }

  public getAmount(capacityNode: number, demandNode: number) {
    return this.deliveries[(capacityNode-1)*this.demandNodes.length+(demandNode-1)].getAmount();
  }

  public getCapacity(idx: number) {
    return this.capacityNodes[idx-1].getValue();
  }

  public setCapacity(idx: number, value: number) {
    this.capacityNodes[idx-1].setValue(value);
  }

  public getDemand(idx: number) {
    return this.demandNodes[idx-1].getValue();
  }

  public setDemand(idx: number, value: number) {
    this.demandNodes[idx-1].setValue(value);
  }

  public draw() {
    let container = document.getElementById(this.config.container);
    let canvas = document.createElement('canvas');
    canvas.width = this.config.canvasWidth;
    canvas.height = this.config.canvasHeight;
    container.appendChild(canvas);
    let context = canvas.getContext('2d');
    this.capacityNodes.forEach((node: Node) => {
      node.draw(context);
    });

    this.demandNodes.forEach((node: Node) => {
      node.draw(context);
    });

    this.deliveries.forEach((delivery: Edge) => {
      delivery.draw(context);
    });
  }

  private setConfig(config: Config) {
    this.config = {};
    this.config.nodeWidth = config && config.nodeWidth || 100;
    this.config.nodeHeight = config && config.nodeHeight || 50;
    this.config.canvasWidth = config && config.canvasWidth || 1000;
    this.config.canvasHeight = config && config.canvasHeight || 500;
    this.config.margin = config && config.margin || 10;
    this.config.textWidth = config && config.textWidth || 100;
    this.config.textHeight = config && config.textHeight || 30;
    this.config.container = config && config.container || 'container';
  }
}
