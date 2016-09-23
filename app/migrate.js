const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const db = require('app/db');
const {QueryFile} = require('pg-promise');

module.exports = opts => migrate.bind({
    base: './migrations/',

    sql(name) {
        return /\.sql$/.test(name);
    },

    full(name) {
        return /\//.test(name);
    },

    getPath(name) {
        return this.full(name) && this.sql(name)
            ? name
            : this.full(name)
                ? name + '.sql'
                : this.sql(name)
                    ? this.base + name
                    : this.base + name + '.sql'
    }
})(opts);

function migrate(opts) {
    if (!opts.name) throw new Error('Filename required');
    const {
        name,
        verbose = false
    } = opts;

    const file = path.resolve(this.getPath(name));
    console.log(chalk.yellow.underline(`Migration file path: ${file}`));

    const sql = new QueryFile(file, {
        compress: true,
        minify: true,

    });

    db.none(sql)
        .then(data => {
            console.log(chalk.cyan(`Result ${data}`))
        })
        .catch(err => {
            console.error(verbose
                ? chalk.red(err.stack)
                : chalk.red.bold(err.message)
            );

            process.exit(1);
        });

    /*fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        console.log(chalk.blue('Migrating...'));
        db.query(data)
            .then(data => {
                console.log(`Result: ${data}`);
            })
            .catch((err) => {
                console.error(verbose
                    ? chalk.red(err.stack)
                    : chalk.red.bold(err.message)
                );

                process.exit(1);
            });
    });*/

}
