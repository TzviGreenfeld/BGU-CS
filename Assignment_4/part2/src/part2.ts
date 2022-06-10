export const MISSING_KEY = '___MISSING_KEY___'
export const MISSING_TABLE_SERVICE = '___MISSING_TABLE_SERVICE___'

export type Table<T> = Readonly<Record<string, Readonly<T>>>
type readWriteTable<T> = Record<string, Readonly<T>>

export type TableService<T> = {
    get(key: string): Promise<T>;
    set(key: string, val: T): Promise<void>;
    delete(key: string): Promise<void>;
}

const toReadWrite = <T>(oldTable: Table<T>): readWriteTable<T> => Object.assign({}, oldTable);



// Q 2.1 (a)
export function makeTableService<T>(sync: (table?: Table<T>) => Promise<Table<T>>): TableService<T> {
    return {
        get(key: string): Promise<T> {
            /*
                table is immutable,
                the sync promise is our way to get the table
                or replace the table with a new one when updating.
            */
            return sync().then(
                (table: Table<T>) => new Promise<T>(
                    function (resolve, reject) {
                        for (const [keyEntry, valueEntry] of Object.entries(table)) {
                            if (keyEntry === key) {
                                resolve(valueEntry);
                            }
                        }
                        reject(MISSING_KEY);
                    }
                )
            )
        },
        set(key: string, val: T): Promise<void> {
            /*
                make new table that can be changed, 
                update current table with sync
                return void promise
            */
            return sync().then(
                (table: Table<T>) => sync(Object.assign(toReadWrite(table), { [key]: val }))
            )
                .then((t: Table<T>) =>
                    new Promise<void>(
                        function (resolve, reject) {
                            resolve();
                        }
                    )
                )
        },
        delete(key: string): Promise<void> {
            return sync().then(
                (table: Table<T>) => new Promise<Table<T>>(
                    function (resolve, reject) {
                        const currTable = toReadWrite(table);
                        // if (Object.keys(currTable).includes(key)) { // ??
                        if (key in currTable) {
                            delete currTable[key];
                        }
                        else {
                            reject(MISSING_KEY)
                        }
                        return currTable;
                    }
                )
            ).then((table: Table<T>) => sync(table))
                .then((p: Table<T>) => new Promise<void>(
                    function (resolve, reject) {
                        resolve();
                    }
                ))
        }
    }
}



// Q 2.1 (b)
export function getAll<T>(store: TableService<T>, keys: string[]): Promise<T[]> {
    return Promise.all(keys.map((key) => store.get(key)))
}


// Q 2.2
export type Reference = { table: string, key: string }

export type TableServiceTable = Table<TableService<object>>

export function isReference<T>(obj: T | Reference): obj is Reference {
    // thats all you need?
    return typeof (obj) === 'object' && 'table' in obj;
}
/*
Before returning the resulting object, do the following recursively:
    Go over the values of the object (you can use ‘Object.entries’ and ‘Object.fromEntries’) and, if a value
    contains the ’table’ property (use “ ‘table’ in obj ”), assume this value is reference and search for the key in
    the appropriate table. Continue, this process until all references are replaced by their value.
*/
export async function constructObjectFromTables(tables: TableServiceTable, ref: Reference) {
    /*
        we get a table of tables and reference which may contain refrence as value
        we need to construct an objec tby getting the keys and value of the reference
        
    */

    async function deref(ref: Reference) {
        const tableName: string = ref.table;
        const refKey: string = ref.key;

        if (!(tableName in tables)) {
            return Promise.reject(MISSING_TABLE_SERVICE);
        }

        // get table
        const table: TableService<object> = tables[tableName];

        // get the key given in reference from the table
        var currObj = await table.get(refKey);


        // looping over the table entries.
        // for every Refernce value we need a recursive call
        if (typeof (currObj) === 'object') { // is resolved
            for (const [key, val] of Object.entries(currObj)) {

                if (isReference(val)) {
                    const derefrenced = { [key]: await deref(val) };
                    Object.assign(currObj, derefrenced);
                }
            }
        }

        return currObj;
    }

    return deref(ref);
}

// Q 2.3

export function lazyProduct<T1, T2>(g1: () => Generator<T1>, g2: () => Generator<T2>): () => Generator<[T1, T2]> {
    return function* () {
        for (let item1 of g1()) {
            for (let item2 of g2()) {
                yield [item1, item2];
            }
        }
    }
}

export function lazyZip<T1, T2>(g1: () => Generator<T1>, g2: () => Generator<T2>): () => Generator<[T1, T2]> {
    return function* () {
        const generator1 = g1();
        const generator2 = g2();
        // g1, g2 will return the same number of elements
        for (let item1 of generator1) {
            yield [item1, generator2.next().value]
        }
    }
}

// Q 2.4
export type ReactiveTableService<T> = {
    get(key: string): T;
    set(key: string, val: T): Promise<void>;
    delete(key: string): Promise<void>;
    subscribe(observer: (table: Table<T>) => void): void
}

// notify observers
const notify = <T>(observers: ((table: Table<T>) => void)[], newTable: Table<T>): void =>
    observers.forEach((observer: (table: Table<T>) => void) => observer(newTable));

export async function makeReactiveTableService<T>(sync: (table?: Table<T>) => Promise<Table<T>>, optimistic: boolean): Promise<ReactiveTableService<T>> {
    // optional initialization code

    let _table: readWriteTable<T> = toReadWrite(await sync());
    let subscribers: ((table: Table<T>) => void)[] = [];


    const handleMutation = async (newTable: Table<T>) => {
        if (optimistic) {
            // call subscribers immediatly
            notify(subscribers, newTable);
        }

        // replace table with new
        _table = await sync(newTable)
            .catch(
                (error) => {
                    if (optimistic){
                        // revert update because mutation failed
                        notify(subscribers, _table);
                    }
                    throw (error);
                }
            );

        if (!optimistic) {
            notify(subscribers, newTable);
        }

    }

    return {
        get(key: string): T {
            if (key in _table) {
                return _table[key]
            } else {
                throw MISSING_KEY
            }
        },
        set(key: string, val: T): Promise<void> {
            return handleMutation(Object.assign(toReadWrite(_table), { [key]: val }))
        },
        delete(key: string): Promise<void> {
            let currTable = toReadWrite(_table);
            if (key in currTable) {
                delete currTable[key];
            }
            else {
                throw (MISSING_KEY);
            }
            return handleMutation(currTable);
        },

        subscribe(observer: (table: Table<T>) => void): void {
            // update subscribers
            subscribers.push(observer);
        }
    }
}