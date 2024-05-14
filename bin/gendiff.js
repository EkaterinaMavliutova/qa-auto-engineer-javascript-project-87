#! /usr/bin/env node

// import { program } from 'commander';
import { Command } from 'commander';
import { genDiff } from '../src/gendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, option) => {
    genDiff(filepath1, filepath2, option.format);
  });

program.parse();
