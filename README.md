# Typed vinyl-fs
[![Build Status](https://travis-ci.org/types/npm-vinyl-fs.svg?branch=master)](https://travis-ci.org/types/npm-vinyl-fs)

Typescript Typings for [vinyl-fs](https://www.npmjs.com/package/vinyl-fs).

## Installation
```sh
typings install --save vinyl-fs
```

## Usage

```ts
import * as vfs from 'vinyl-fs';

vfs.src(['./js/**/*.js', '!./js/vendor/*.js'])
  .pipe(vfs.dest('./output'));
```

[More examples](./test)


## Contributing
You can run them the tests with `npm run build` and `npm run test`.

--------------------------------

_Based on typings by [vvakame](https://github.com/vvakame/)_
