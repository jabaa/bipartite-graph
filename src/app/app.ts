import BipariteGraph from 'bipartite-graph';

let bg = new BipariteGraph([35, 50, 40], [45, 20, 30, 30], [[8, 6, 10, 9], [9, 12, 13, 7], [14, 9, 16, 5]]);

const n = 3, m = 4;

let i = 1, j = 1;
while (i <= n && j <= m) {
  bg.setAmount(i, j, Math.min(bg.getCapacity(i), bg.getDemand(j)));
  bg.setCapacity(i, bg.getCapacity(i) - bg.getAmount(i, j)); bg.setDemand(j, bg.getDemand(j) - bg.getAmount(i, j));
  if (bg.getCapacity(i) === 0) {
    i = i + 1;
  } else {
    j = j + 1;
  }
}

bg.draw();