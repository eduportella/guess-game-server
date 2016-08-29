export function setEntries(entries) {
  return {
    type: 'SET_ENTRIES',
    entries: entries
  };
}

export function next() {
  return {
    type: 'NEXT'
  }
}

export function reset() {
	return {
		type: 'RESET'
	}
}