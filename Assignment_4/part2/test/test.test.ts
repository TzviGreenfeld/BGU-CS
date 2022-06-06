import { describe, expect, test } from '@jest/globals'
import {
    constructObjectFromTables,
    getAll, lazyProduct, lazyZip, makeReactiveTableService,
    makeTableService,
    MISSING_KEY,
    MISSING_TABLE_SERVICE, ReactiveTableService,
    Table,
    TableService,
    TableServiceTable
} from '../src/part2';

function timeout(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
function makeSimpleSync<T>() {
    let innerTable: Table<T> = null!
    return async (table?: Table<T>) => {
        await timeout(300)
        if (table != null) {
            innerTable = table
        }
        return innerTable
    }
}

const EXPECTED_FAILURE = '__EXPECTED_FAILURE__'
function makeFailingSync<T>(innerTable: Table<T>) {
    return async (table?: Table<T>) => {
        if (table != null) {
            await timeout(1000)
            throw EXPECTED_FAILURE
        }
        return innerTable
    }
}

describe('Assignment 4 Part 2', () => {
    describe('Q2.1 (11pts)', () => {
        type Book = {
            title: string,
            author: string,
        }

        const templateBookTable = Object.freeze({
            'A': {title: 'title_B', author: 'author_A'},
            'B': {title: 'title_B', author: 'author_B'}
        } as Table<Book>)

        const exampleBookSync = makeSimpleSync<Book>()
        let service: TableService<Book> = null!
        beforeEach(async () => {
            await exampleBookSync({...templateBookTable})
            service = makeTableService<Book>(exampleBookSync)
        })

        test('stores and retrieves value', async () => {
            const B = await service.get('B')
            expect(B).toEqual(templateBookTable['B'])
            await service.set('C', {title: 'title_C', author: 'author_C'})
            const C = await service.get('C')
            expect(C).toEqual({title: 'title_C', author: 'author_C'})

            expect(B).toEqual(templateBookTable['B'])
        })

        test('throws on missing key (get)', async () => {
            await expect(service.get('C')).rejects.toEqual(MISSING_KEY)
        })

        test('getAll retrieves an array', async () => {
            expect(await getAll(service, ['A', 'B'])).toEqual(Object.values(templateBookTable))
        })
        //
        test('getAll throws on missing value', async () => {
            await expect(getAll(service, ['A', 'C'])).rejects.toEqual(MISSING_KEY)
        })
    })

    describe('Q2.2 (12pts)', () => {
        type Author = {
            firstName: string,
            lastName: string,
        }
        type Book = {
            title: string,
            author: { table: 'authors', key: string },
        }


        const exampleAuthorSync = makeSimpleSync<Author>()
        const exampleBookSync = makeSimpleSync<Book>()
        let authorService: TableService<Author> = null!
        let bookService: TableService<Book> = null!
        let allServices: TableServiceTable = null!

        beforeEach(async () => {
            await exampleAuthorSync({
                'A': {firstName: 'f_a', lastName: 'l_a'},
                'B': {firstName: 'f_b', lastName: 'l_b'}
            })
            authorService = makeTableService<Author>(exampleAuthorSync)

            await exampleBookSync({
                'A': {title: 'title_A', author: {table: 'authors', key: 'A'}},
                'B': {title: 'title_B', author: {table: 'authors', key: 'B'}}
            })
            bookService = makeTableService<Book>(exampleBookSync)

            allServices = {
                'authors': authorService,
                'books': bookService,
            }
        })

        test('can reconstruct object', async () => {
            const obj = await constructObjectFromTables(allServices, {table: 'books', key: 'A'})
            expect(obj).toEqual({title: 'title_A', author: {firstName: 'f_a', lastName: 'l_a'}})
        })

        test('throws on missing table', async () => {
            await expect(constructObjectFromTables(allServices, {table: 'books2', key: 'A'})).rejects.toEqual(MISSING_TABLE_SERVICE)
        })
    })

    describe('Q2.3 (10pts)', () => {
        function countTo(n: number) {
            return function* (): Generator<number> {
                for (let i = 1; i <= n; i++) {
                    yield i
                }
            }
        }

        test('lazyProduct', () => {
            const gen = lazyProduct(countTo(2), countTo(3))()

            expect([...gen]).toEqual(
                [[1, 1], [1, 2], [1, 3],
                    [2, 1], [2, 2], [2, 3]])
        })

        test('lazyZip', () => {
            const gen = lazyZip(countTo(2), countTo(2))()

            expect([...gen]).toEqual([[1, 1], [2, 2]])
        })
    })

    describe('Q2.4 (14pts)', () => {
        type Book = {
            title: string,
            author: string,
        }

        const templateBookTable = Object.freeze({
            'A': {title: 'title_B', author: 'author_A'},
            'B': {title: 'title_B', author: 'author_B'}
        } as Table<Book>)

        const exampleBookSync = makeSimpleSync<Book>()
        const exampleBookFailingSync = makeFailingSync<Book>(templateBookTable)
        let service: ReactiveTableService<Book> = null!
        let optService: ReactiveTableService<Book> = null!
        let failOptService: ReactiveTableService<Book> = null!
        beforeEach(async () => {
            await exampleBookSync({...templateBookTable})
            service = await makeReactiveTableService<Book>(exampleBookSync, false)

            optService = await makeReactiveTableService<Book>(exampleBookSync, true)
            failOptService = await makeReactiveTableService<Book>(exampleBookFailingSync, true)
        })

        test('observers get updates', async () => {
            const mockFn = jest.fn()
            optService.subscribe(mockFn)

            const bookC = {title: 'title_C', author: 'author_C'}
            await optService.set('C', bookC)
            expect(mockFn).toHaveBeenCalledTimes(1)
            expect(mockFn).toHaveBeenNthCalledWith(1, {...templateBookTable, 'C': bookC})
            mockFn.mockReset()
            await optService.delete('B')
            expect(mockFn).toHaveBeenCalledTimes(1)
            expect(mockFn).toHaveBeenNthCalledWith(1, {'A': templateBookTable['A'], 'C': bookC})
        })

        test('optimistic observers get updates', async () => {
            const mockFn = jest.fn()
            optService.subscribe(mockFn)

            const bookC = {title: 'title_C', author: 'author_C'}
            await optService.set('C', bookC)
            expect(mockFn).toHaveBeenCalledTimes(1)
            expect(mockFn).toHaveBeenNthCalledWith(1, {...templateBookTable, 'C': bookC})
            mockFn.mockReset()
            await optService.delete('B')
            expect(mockFn).toHaveBeenCalledTimes(1)
            expect(mockFn).toHaveBeenNthCalledWith(1, {'A': templateBookTable['A'], 'C': bookC})
        })

        test('optimistic observers get optimistic updates an revert', async () => {
            const mockFn = jest.fn()
            failOptService.subscribe(mockFn)

            const bookC = {title: 'title_C', author: 'author_C'}
            await expect(failOptService.set('C', bookC)).rejects.toEqual(EXPECTED_FAILURE)
            expect(mockFn).toHaveBeenCalledTimes(2)
            expect(mockFn).toHaveBeenNthCalledWith(1, {...templateBookTable, 'C': bookC})
            expect(mockFn).toHaveBeenNthCalledWith(2, templateBookTable)
            mockFn.mockReset()
            await expect(failOptService.delete('B')).rejects.toEqual(EXPECTED_FAILURE)
            expect(mockFn).toHaveBeenCalledTimes(2)
            expect(mockFn).toHaveBeenNthCalledWith(1, {'A': templateBookTable['A']})
            expect(mockFn).toHaveBeenNthCalledWith(2, templateBookTable)
        })
    })
})