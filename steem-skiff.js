#!/usr/bin/env node

const current_version = require('./package.json').version;
const skiff = require('commander');

skiff
  .command('check <mode> <user> [credential]')
  .alias('ck')
  .option(
    '-t, --type <type>',
    'type of wif; can be posting, active, or owner',
    /^(posting|active|owner)$/i,
    'posting'
  )
  .description('Check if a credential is legit')
  .on('--help', () =>
    console.log(`
  Remarks:
       
  <mode> can be either password or wif
       `)
  )
  .action(require('./check'));

skiff
  .command('get-posts <tag> <limit> [properties...]')
  .alias('gp')
  .description('Gets the most recent <limit> posts for <tag>')
  .option(
    '-f, --format <format>',
    'specify output as plain, stringified, or csv',
    /^(plain|stringified|csv)$/i,
    'plain'
  )
  .option('-s, --space <space>', 'passed as [space] to JSON.stringify()', null)
  .action(require('./getPosts'));

skiff
  .command('get-key <user> [password]')
  .alias('gk')
  .description("Gets a key given user's password")
  .option(
    '-t, type <type>',
    'type of key; can be posting, active, or owner',
    /^(posting|active|owner)$/i,
    'posting'
  )
  .action(require('./getKey'));

skiff
  .command('list-post-properties [limit]')
  .alias('lpp')
  .description('List properties based on [limit] recent posts')
  .action(require('./listPostProperties'));

skiff
  .command('make-test-account <user> [password]')
  .alias('mta')
  .description('Make a test account on https://testnet.steem.vc')
  .action(require('./makeTestAccount'));

skiff.version(current_version, '-v, --version').parse(process.argv);

if (skiff.args.length === 0) skiff.help();
