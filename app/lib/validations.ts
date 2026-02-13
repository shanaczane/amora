export function validateLetterContent(content: string): { valid: boolean; error?: string } {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Content is required' }
  }

  if (content.length > 5000) {
    return { valid: false, error: 'Content must be less than 5000 characters' }
  }

  return { valid: true }
}

export function validateLetterTitle(title?: string): { valid: boolean; error?: string } {
  if (title && title.length > 100) {
    return { valid: false, error: 'Title must be less than 100 characters' }
  }

  return { valid: true }
}

export function validateColor(color: string): boolean {
  // Validate hex color format
  return /^#[0-9A-F]{6}$/i.test(color)
}

export function sanitizeInput(input: string): string {
  // Basic XSS prevention - strip HTML tags
  return input.replace(/<[^>]*>/g, '')
}