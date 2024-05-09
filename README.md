# GenDiff
[![Actions Status](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-87/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-87/actions) [![Actions Status](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-87/actions/workflows/ci.yml/badge.svg)](https://github.com/EkaterinaMavliutova/qa-auto-engineer-javascript-project-87/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/c1eba3f6ce2951129527/maintainability)](https://codeclimate.com/github/EkaterinaMavliutova/qa-auto-engineer-javascript-project-87/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c1eba3f6ce2951129527/test_coverage)](https://codeclimate.com/github/EkaterinaMavliutova/qa-auto-engineer-javascript-project-87/test_coverage)

**GenDiff** is a CLI tool that compares two configuration files and shows a difference

## Installation
>note: the current version of GenDiff requires Node.js v20.11.1 or higher
* clone this repository
* to install required dependencies:
```
make install
```
* to install GenDiff globally:
```
npm link
```

## How to use
```
Usage: gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
```

## GenDiff recordings on asciinema.org
### compare 2 JSON:
<a href="https://asciinema.org/a/Vqn2b8iGwkvu1kkZSZFQlBgdP" target="_blank"><img src="https://asciinema.org/a/Vqn2b8iGwkvu1kkZSZFQlBgdP.svg" width="50%" height="50%"/></a>

### compare 2 YAML:
<a href="https://asciinema.org/a/uf9MSIbHg6AnOzPCcQYYKmYqK" target="_blank"><img src="https://asciinema.org/a/uf9MSIbHg6AnOzPCcQYYKmYqK.svg" width="50%" height="50%"/></a>