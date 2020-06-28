'use strict';

module.exports = {
    require: [
        'ts-node/register'
    ],
    diff: true,
    extension: ['ts'],
    opts: false,
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    'watch-files': [
        'src/**/*.ts',
        'test/**/*.ts'
    ],
    spec: [
        'test/**/*.spec.ts'
    ],
    'watch-ignore': ['node_modules']
};