SystemJS.config({
  packages: {
    app: {
      main: './app.js',
      defaultExtension: 'js'
    },
    'bipartite-graph': {
      main: './bipartite-graph.js',
      defaultExtension: 'js'
    }
  },
  map: {
    app: 'app',

    'bipartite-graph': 'app/bipartite-graph'
  }
});
