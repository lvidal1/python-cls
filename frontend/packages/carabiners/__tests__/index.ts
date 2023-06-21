import { joinStr, createSearchObject, createSearchString } from '../src'

describe('carabiners', () => {
    describe('test joinStr()', () => {
        it('joins with a space without a config', () => {
            const colors = joinStr('red', 'blue', 'white')
            expect(colors).toBe('red blue white')
        })

        it('joins with a char set by config', () => {
            const colors = joinStr({char: ', '}, 'red', 'blue', 'white')
            expect(colors).toBe('red, blue, white')
        })

        it('joins and omits falsy values with a char set by config', () => {
            const colors = joinStr({char: ', '}, 'red', '', 'blue', null, 'white')
            expect(colors).toBe('red, blue, white')
        })
    });

    describe('test createSearchObject() and createSearchString()', () => {
        it('converts createSearchString() => createSearchObject()', () => {
        const searchString = '?one=fish&two=fish&red=fish&blue=fish'
        const searchObj = createSearchObject(searchString)
        const createdSearchString = createSearchString(searchObj)
        expect(searchString).toEqual(createdSearchString)
        })

        it('converts createSearchObject() => createSearchString()', () => {
        const searchObj = {
            one: 'fish',
            two: 'fish',
            red: 'fish',
            blue: 'fish',
        }
        const searchString = createSearchString(searchObj)
        const createdSearchObj = createSearchObject(searchString)
        expect(searchObj).toEqual(createdSearchObj)
        })
    })
});

