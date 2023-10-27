function removeAfterSemicolon(str: string): string {
  if (!str) {
    return undefined;
  }
  const index = str.indexOf(';');
  if (index !== -1) {
    return str.substring(0, index);
  }
  return str;
}

export { removeAfterSemicolon };
