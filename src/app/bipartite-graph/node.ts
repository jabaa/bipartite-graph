export default class Node {
  private config: { nodeWidth: number, nodeHeight: number };
  private position: {x: number, y: number};
  private idx: number;
  private value: number;
  private initValue: number;

  public constructor(position: {x: number, y: number}, idx: number, value: number, config: { nodeWidth: number, nodeHeight: number }) {
    this.position = position;
    this.idx = idx;
    this.value = value;
    this.initValue = value;
    this.config = config;
  }

  public get in(): {x: number, y: number} {
    return {x: this.position.x - this.config.nodeWidth / 2, y: this.position.y};
  }

  public get out(): {x: number, y: number} {
    return {x: this.position.x + this.config.nodeWidth / 2, y: this.position.y};
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: number) {
    this.value = value;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.strokeRect(this.position.x - this.config.nodeWidth / 2, this.position.y - this.config.nodeHeight / 2, this.config.nodeWidth, this.config.nodeHeight);

    context.font = "30px Arial";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(`${this.initValue} / ${this.idx + 1}`, this.position.x, this.position.y);
  }
}
