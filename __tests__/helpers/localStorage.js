import {
  loadLocalStorageItem,
  removeLocaleStorageItem,
  saveLocaleStorageItem,
} from 'helpers/localStorage'

describe('localStorage', () => {
  beforeEach(() => {
    const store = {}

    window.localStorage = {
      setItem(key, value) { store[key] = value },
      getItem(key) { return store[key] },
      removeItem(key) { store[key] = undefined },
    }
  })

  describe('loadLocalStorageItem', () => {
    it('should load a localStorage item saved as JSON', () => {
      localStorage.setItem('test', JSON.stringify('value'))
      expect(loadLocalStorageItem('test')).toEqual('value')
    })

    it('should return undefined if the item is null', () => {
      localStorage.setItem('test', null)
      expect(loadLocalStorageItem('test')).toEqual(undefined)
    })

    it('should return undefined if the item is not a JSON', () => {
      localStorage.setItem('test', 'value')
      expect(loadLocalStorageItem('test')).toEqual(undefined)
    })

    it('should return undefined if the item is not found', () => {
      expect(loadLocalStorageItem('test')).toBe(undefined)
    })
  })

  describe('removeLocaleStorageItem', () => {
    it('should remove a value from localStorage', () => {
      localStorage.setItem('test', 'value')
      expect(localStorage.getItem('test')).toEqual('value')

      removeLocaleStorageItem('test')
      expect(localStorage.getItem('test')).toEqual(undefined)
    })
  })

  describe('saveLocaleStorageItem', () => {
    it('should save a localStorage item', () => {
      saveLocaleStorageItem('test', 'value')
      expect(JSON.parse(localStorage.getItem('test'))).toEqual('value')
    })
  })
})
