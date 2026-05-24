const PHONE_PATTERN = /^[+]?([\d\s()-]){7,20}$/
const JOB_TITLE_PATTERN = /^[\p{L}\p{M}\d][\p{L}\p{M}\d.,&'’/\s-]{1,79}$/u

function isValidBirthDate(value) {
  if (value === '') {
    return true
  }

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return false
  }

  const today = new Date()
  const minimumDate = new Date('1900-01-01T00:00:00')

  return date >= minimumDate && date <= today
}

export function validateContactForm(values) {
  const errors = {}

  if (values.name.trim().length === 0) {
    errors.name = 'Имя обязательно'
  }

  if (values.mobilePhone.trim().length === 0) {
    errors.mobilePhone = 'Номер телефона обязателен'
  } else if (!PHONE_PATTERN.test(values.mobilePhone.trim())) {
    errors.mobilePhone = 'Используйте цифры, пробелы, скобки, дефисы или +'
  }

  if (values.jobTitle.trim().length > 0 && !JOB_TITLE_PATTERN.test(values.jobTitle.trim())) {
    errors.jobTitle = 'Введите корректное название должности'
  }

  if (!isValidBirthDate(values.birthDate)) {
    errors.birthDate = 'Дата рождения должна быть не раньше 1900 года и не позже сегодня'
  }

  return errors
}

export function validateContactField(field, values) {
  return validateContactForm(values)[field] ?? ''
}
