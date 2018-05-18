const conjunctions = {
  AND: {
    label:      'And',
    formatConj: (children) => {
      return children.size > 1
        ? '(' + children.join(` and `) + ')'
        : children.first()
    }
  },
  OR: {
    label:      'Or',
    formatConj: (children) => {
      return children.size > 1
        ? '(' + children.join(` or `) + ')'
        : children.first()
    }
  }
}

export default conjunctions
