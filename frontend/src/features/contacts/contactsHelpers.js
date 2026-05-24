const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export function formatBirthDate(value) {
  if (!value) {
    return 'Не указан'
  }

  return dateFormatter.format(new Date(`${value}T00:00:00`))
}

export function getInitialFormValues(contact) {
  return {
    name: contact?.name ?? '',
    mobilePhone: contact?.mobilePhone ?? '',
    jobTitle: contact?.jobTitle ?? '',
    birthDate: contact?.birthDate ?? '',
  }
}

export function buildContactPayload(values) {
  return {
    name: values.name.trim(),
    mobilePhone: values.mobilePhone.trim(),
    jobTitle: values.jobTitle.trim(),
    birthDate: values.birthDate === '' ? null : values.birthDate,
  }
}
