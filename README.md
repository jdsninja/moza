# Moza [![Build Status](https://travis-ci.org/jeromeds/moza.svg)](https://travis-ci.org/jeromeds/moza)

Moza is, first of all, generating a grid. And then, it will fill this grid with tiles of different size.


## Getting Started
Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

1. Include Moza on your site.
```
<link rel="stylesheet" href="./dist/css/master.css">
<script src="dist/js/moza.js"></script>
```

2. Add the markup to your HTML.
```
<div id="myStage" class="moza"></div>
```

3. Initialize Moza.
```
<script>
  var moza = new Moza();
  moza.build({el: 'myStage', col:7, row:7});
</script>
```


> They don't know it yet but special thanks to: [@masyl](https://github.com/masyl),
[@thoughtram](https://github.com/thoughtram/es6-browserify-boilerplate) &
[@cferdinandi](https://github.com/cferdinandi)
