import { TransLint } from '../index'

describe('TransLint', () => {
    it('should detect missing translations', () => {
        const languages = {
            en: {
                welcome: 'Welcome',
                messages: {
                    hello: 'Hello',
                    goodbye: 'Goodbye',
                },
            },
            tr: {
                welcome: 'Hoşgeldiniz',
                messages: {
                    hello: 'Merhaba',
                    // goodbye eksik
                },
            },
            es: {
                welcome: 'Bienvenido',
                messages: {
                    hello: 'Hola',
                    goodbye: 'Adiós',
                },
            },
        }

        const result = TransLint(languages)
        
        expect(result.status).toBe(false)
        expect(result.result).toEqual([
            {
                language: 'tr',
                keys: ['messages.goodbye'],
            },
        ])
    })

    it('should return success when all translations are present', () => {
        const languages = {
            en: {
                welcome: 'Welcome',
                messages: {
                    hello: 'Hello',
                },
            },
            tr: {
                welcome: 'Hoşgeldiniz',
                messages: {
                    hello: 'Merhaba',
                },
            },
        }

        const result = TransLint(languages)
        
        expect(result.status).toBe(true)
        expect(result.result).toBeNull()
    })
}) 