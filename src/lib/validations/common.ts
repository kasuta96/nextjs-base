export const phoneRegex = new RegExp(
  /^(?:\+?(\d(?:[-. ]?\d)+)?(?:\([\d-.\s]+\))?[\d](?:[-. ]?\d){6,13})?$/
)
// Case exp:
// 123-456-7890
// 123.4567890
// +1 (23) 456-7890

export const zipCode = new RegExp(/^(\d{3}-?\d{2,4}|\d{5}-?\d{2,3})?$/)
