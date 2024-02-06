import CryptoJS from 'crypto-js'

export function getLocalStorageItem(key: string): any {
  const storaged = localStorage.getItem(key)

  if (storaged) {
    const bytes = CryptoJS.AES.decrypt(storaged, 'Bilgi@tech')
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return data
  }

  return ''
}

export function setLocalStorageItem(
  key: string,
  value: Record<string, any> | any[] | number | string | boolean
): void {
  const encrypt = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    'Bilgi@tech'
  ).toString()

  localStorage.setItem(key, encrypt)
}

export function removeLocalStorageItem(key: string): void {
  localStorage.removeItem(key)
}

export function encrypt(
  value: Record<string, any> | any[] | number | string | boolean
) {
  const encrypt = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    CryptoJS.enc.Hex.parse('Bilgi@tech')
  ).toString()

  return encrypt
}
