import {renderHook, act} from '@testing-library/react-hooks';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useLocalStorage from '.';

const localStorageMock = (() => {
    let store: {[key: string]: string} = {};

    return {
        getItem: (key:string) => store[key] || null,
        setItem: (key:string, value:string) => store[key] = value || '',
        removeItem: (key:string) => delete store[key],
        clear: () => store = {}
    }
})();

Object.defineProperties(window, {
    localStorage: {
        value: localStorageMock,
    }
});

describe('useLocalStorage', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should initialize with default value', () => {
        const {result} = renderHook(() => useLocalStorage('test', 'default'));
        expect(result.current.storedValue).toBe('default');
    })

    it('should initialize with value from localStorage', () => {
        window.localStorage.setItem('test', JSON.stringify('stored'));
        const {result} = renderHook(() => useLocalStorage('test', 'default'));

        act(() => {
            result.current.setValue('new value');
        })

        expect(result.current.storedValue).toBe('new value');
        expect(window.localStorage.getItem('test')).toBe(JSON.stringify('new value'));
    });

    it('should support functional value', () => {
        const {result} = renderHook(() => useLocalStorage<number>('test', 0));
        act(() => {
            result.current.setValue(prev => prev + 1);
        })
        expect(result.current.storedValue).toBe(1);
        expect(window.localStorage.getItem('test')).toBe(JSON.stringify(1));
    });

    it('should handle errors gracefully', () => {
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        window.localStorage.setItem('test', 'invalid');
        const {result} = renderHook(() => useLocalStorage('test', 0));

        expect(result.current.storedValue).toBe(0);
        expect(errorSpy).toHaveBeenCalled();

        errorSpy.mockRestore();
    })

})