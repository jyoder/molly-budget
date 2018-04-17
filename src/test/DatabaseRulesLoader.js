import { exec } from 'child_process';


const BOLT_COMMAND = 'node_modules/.bin/firebase-bolt';
const BOLT_RULES_FILE = 'database.rules.bolt';

export default class DatabaseRulesLoader {
    static loadRules() {
        return this._executeBoltCommand();
    }

    static _executeBoltCommand() {
        return this._execute(`${BOLT_COMMAND} < ${BOLT_RULES_FILE}`);
    }

    static _execute(script) {
        return new Promise((resolve, reject) => {
            exec(script, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                } else {
                    resolve(JSON.parse(stdout));
                }
            });
        });
    }
}
