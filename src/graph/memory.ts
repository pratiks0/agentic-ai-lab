let prefs = { diet: "vegetarian", proteinFocus: true };

export function getPrefs() {
  return prefs;
}

export function setPrefs(p: Partial<typeof prefs>) {
  prefs = { ...prefs, ...p };
}
