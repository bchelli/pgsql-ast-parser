import 'mocha';
import 'chai';
import { checkUpdate } from './spec-utils';

describe('Update', () => {

    checkUpdate([`update test set a=1`, `UPDATE"test"SET"a"=1`], {
        type: 'update',
        table: { name: 'test' },
        sets: [{
            column: 'a',
            value: { type: 'integer', value: 1 }
        }]
    });

    checkUpdate([`update test set (a,b)=(1,2), c=3`], {
        type: 'update',
        table: { name: 'test' },
        sets: [{
            column: 'a',
            value: { type: 'integer', value: 1 }
        }, {
            column: 'b',
            value: { type: 'integer', value: 2 }
        }, {
            column: 'c',
            value: { type: 'integer', value: 3 }
        }]
    });

    checkUpdate([`update test set a=1, b=a where a>1`], {
        type: 'update',
        table: { name: 'test' },
        sets: [{
            column: 'a',
            value: { type: 'integer', value: 1 }
        }, {
            column: 'b',
            value: { type: 'ref', name: 'a' },
        }],
        where: {
            type: 'binary',
            op: '>',
            left: { type: 'ref', name: 'a' },
            right: { type: 'integer', value: 1 },
        }
    });
});