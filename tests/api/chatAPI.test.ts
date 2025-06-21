import { describe, it, expect, vi } from 'vitest'
import { POST } from '../../src/pages/api/chat'

const mockGenerateContent = vi.fn()
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(() => ({
    models: {
      generateContent: mockGenerateContent,
    },
  })),
}))

describe('POST /api/chat', () => {
  it('should return a 200 OK response with a message', async () => {
    mockGenerateContent.mockResolvedValue({
      text: 'Hello, world!',
    })

    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Hello' }),
    })

    const response = await POST({ request })

    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
    const text = await response.text()
    expect(text).toBe('Hello, world!')
  })

  it('should return a 500 Internal Server Error when no response is generated', async () => {
    mockGenerateContent.mockResolvedValue({
      text: '',
    })

    const request = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Hello' }),
    })

    const response = await POST({ request })

    expect(response.status).toBe(500)
    expect(response.statusText).toBe('Internal Server Error')
    const text = await response.text()
    expect(text).toBe('No response')
  })
})
