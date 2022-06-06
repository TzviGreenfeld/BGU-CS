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
                        if (Object.keys(currTable).includes(key)) { // ??
                            delete currTable.key;
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
    return typeof obj === 'object' && 'table' in obj
}
/*
Before returning the resulting object, do the following recursively:
    Go over the values of the object (you can use ‘Object.entries’ and ‘Object.fromEntries’) and, if a value
    contains the ’table’ property (use “ ‘table’ in obj ”), assume this value is reference and search for the key in
    the appropriate table. Continue, this process until all references are replaced by their value.
*/
export async function constructObjectFromTables(tables: TableServiceTable, ref: Reference) {
    async function deref(ref: Reference) {
        // if (isReference(ref)) {
        //     if(ref.key in Object.keys(ref.table)){
        //         const table =  await ref.table.
        //     }
        // }
        return Promise.reject('not implemented')
    }

    return deref(ref)
}

// Q 2.3

export function lazyProduct<T1, T2>(g1: () => Generator<T1>, g2: () => Generator<T2>): () => Generator<[T1, T2]> {
    return function* () {
        const generator1 = g1();
        const generator2 = g2();
        // g1, g2 will return the same number of elements
        for (var item1 of generator1) {
            for (var item2 of generator2) {
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
        for (var item1 of generator1) {
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

export async function makeReactiveTableService<T>(sync: (table?: Table<T>) => Promise<Table<T>>, optimistic: boolean): Promise<ReactiveTableService<T>> {
    // optional initialization code

    let _table: Table<T> = await sync()

    const handleMutation = async (newTable: Table<T>) => {
        // TODO implement!
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
            return handleMutation(null as any /* TODO */)
        },
        delete(key: string): Promise<void> {
            return handleMutation(null as any /* TODO */)
        },

        subscribe(observer: (table: Table<T>) => void): void {
            // TODO implement!
        }
    }
}