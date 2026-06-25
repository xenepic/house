import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_INPUT } from '../../domain/constants'
import { loadInputFromStorage, saveInputToStorage } from '../localStorageState'

describe('localStorageState', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('round-trips save -> load', () => {
    saveInputToStorage(DEFAULT_INPUT)
    expect(loadInputFromStorage()).toEqual(DEFAULT_INPUT)
  })

  it('returns null when nothing is stored', () => {
    expect(loadInputFromStorage()).toBeNull()
  })

  it('returns null when stored JSON is corrupted', () => {
    window.localStorage.setItem('house-rent-sim:input:v1', '{not valid json')
    expect(loadInputFromStorage()).toBeNull()
  })

  it('does not throw when localStorage.setItem fails (e.g. private mode)', () => {
    const spy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded')
    })
    expect(() => saveInputToStorage(DEFAULT_INPUT)).not.toThrow()
    spy.mockRestore()
  })
})
