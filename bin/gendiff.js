#! /usr/bin/env node

// import { program } from 'commander';
import { Command } from 'commander';
import { jsonGenDiff } from '../src/jsonGenDiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    jsonGenDiff(filepath1, filepath2);
  });

program.parse();
