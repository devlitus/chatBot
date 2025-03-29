import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpiar automáticamente después de cada prueba
afterEach(() => {
  cleanup()
})
