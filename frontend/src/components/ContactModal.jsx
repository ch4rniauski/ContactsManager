import { useId, useMemo, useState } from 'react'
import { Dialog } from './Dialog'
import { validateContactField, validateContactForm } from '../lib/contactValidation'

const FIELD_ORDER = ['name', 'mobilePhone', 'jobTitle', 'birthDate']

export function ContactModal({
  isOpen,
  mode,
  initialValues,
  isSaving,
  errorMessage,
  onClose,
  onSubmit,
}) {
  const formId = useId()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const submitLabel = mode === 'edit' ? 'Сохранить изменения' : 'Создать контакт'

  const fieldErrors = useMemo(() => {
    return FIELD_ORDER.reduce((accumulator, field) => {
      accumulator[field] = errors[field] ?? ''
      return accumulator
    }, {})
  }, [errors])

  function updateField(field, value) {
    const nextValues = {
      ...values,
      [field]: value,
    }

    setValues(nextValues)

    if (touched[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateContactField(field, nextValues),
      }))
    }
  }

  function markTouched(field) {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [field]: true,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateContactField(field, values),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    setTouched({
      name: true,
      mobilePhone: true,
      jobTitle: true,
      birthDate: true,
    })

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    await onSubmit(values)
  }

  return (
    <Dialog
      isOpen={isOpen}
      title={mode === 'edit' ? 'Редактировать контакт' : 'Новый контакт'}
      description={
        mode === 'edit'
          ? 'Измените данные выбранного контакта и сохраните результат.'
          : 'Заполните карточку контакта и добавьте запись в базу.'
      }
      onClose={onClose}
      actions={
        <footer className="modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={isSaving}
          >
            Отмена
          </button>
          <button
            type="submit"
            form={formId}
            className="primary-button"
            disabled={isSaving}
          >
            {isSaving ? 'Сохранение...' : submitLabel}
          </button>
        </footer>
      }
    >
      <form id={formId} className="contact-form" onSubmit={handleSubmit}>
        {errorMessage.length > 0 ? (
          <div className="banner error">{errorMessage}</div>
        ) : null}

        <label className="field">
          <span>Имя *</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={values.name}
            onBlur={() => markTouched('name')}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Например, Анна Иванова"
          />
          {fieldErrors.name ? <small>{fieldErrors.name}</small> : null}
        </label>

        <label className="field">
          <span>Номер телефона *</span>
          <input
            type="tel"
            name="mobilePhone"
            autoComplete="tel"
            value={values.mobilePhone}
            onBlur={() => markTouched('mobilePhone')}
            onChange={(event) => updateField('mobilePhone', event.target.value)}
            placeholder="+375 (29) 123-45-67"
          />
          {fieldErrors.mobilePhone ? <small>{fieldErrors.mobilePhone}</small> : null}
        </label>

        <label className="field">
          <span>Должность</span>
          <input
            type="text"
            name="jobTitle"
            autoComplete="organization-title"
            value={values.jobTitle}
            onBlur={() => markTouched('jobTitle')}
            onChange={(event) => updateField('jobTitle', event.target.value)}
            placeholder="Например, Frontend Developer"
          />
          {fieldErrors.jobTitle ? <small>{fieldErrors.jobTitle}</small> : null}
        </label>

        <label className="field">
          <span>Дата рождения</span>
          <input
            type="date"
            name="birthDate"
            value={values.birthDate}
            onBlur={() => markTouched('birthDate')}
            onChange={(event) => updateField('birthDate', event.target.value)}
          />
          {fieldErrors.birthDate ? <small>{fieldErrors.birthDate}</small> : null}
        </label>
      </form>
    </Dialog>
  )
}
