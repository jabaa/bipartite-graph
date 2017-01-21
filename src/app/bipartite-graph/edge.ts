import Node from './node';

export default class Edge {
  private capacityNode: Node;
  private demandNode: Node;
  private cost: number;
  private amount: number;
  private config: { textWidth: number, textHeight: number };

  public constructor(capacityNode: Node, demandNode: Node, cost: number, config: { textWidth: number, textHeight: number}) {
    this.capacityNode = capacityNode;
    this.demandNode = demandNode;
    this.amount = 0;
    this.cost = cost;
    this.config = config;
  }

  public setAmount(amount: number) {
    this.amount = amount;
  }

  public getAmount() {
    return this.amount;
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.amount > 0) {
      context.beginPath();
      context.moveTo(this.capacityNode.out.x, this.capacityNode.out.y);
      context.lineTo(this.demandNode.in.x, this.demandNode.in.y);
      context.stroke();

      context.fillStyle="#FFF";
      context.fillRect(this.capacityNode.out.x / 2 + this.demandNode.in.x / 2 - this.config.textWidth / 2, this.capacityNode.out.y / 2 + this.demandNode.in.y / 2 - this.config.textHeight / 2, this.config.textWidth, this.config.textHeight);

      context.fillStyle="#000";
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(`${this.amount} / ${this.cost}`, this.capacityNode.out.x / 2 + this.demandNode.in.x / 2, this.capacityNode.out.y / 2 + this.demandNode.in.y / 2);
    }
  }
}
