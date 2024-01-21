function _addToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function _getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

export function addToLocalStorage(key, value) {
  try {
    const _value = JSON.stringify(value)
    _addToLocalStorage(key, _value);
  } catch (error) {
    _addToLocalStorage(key, value);
  }
}

export function getFromLocalStorage(key) {
  const _value= _getFromLocalStorage(key)
  try {
    return JSON.parse(_value);
  } catch (error) {
    return _value
  }
}