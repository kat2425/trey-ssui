const conjunctions = {
  AND: {
    label:      'And',
    formatConj: (children, conj, isForDisplay) => {
      return children.size > 1
        ? '(' + children.join(' ' + (isForDisplay ? 'and' : '&&') + ' ') + ')'
        : children.first()
    }
  },
  OR: {
    label:      'Or',
    formatConj: (children, conj, isForDisplay) => {
      return children.size > 1
        ? '(' + children.join(' ' + (isForDisplay ? 'or' : '||') + ' ') + ')'
        : children.first()
    }
  }
}

export default conjunctions
