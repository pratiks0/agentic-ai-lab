// returns tiny canned results so you can learn the flow without APIs
export async function webSearch(query: string) {
  const examples = [
    {
      title: "Chickpea Veggie Stir-Fry",
      ingredients: ["chickpeas", "bell peppers", "soy sauce", "garlic", "oil"],
      timeMinutes: 20,
      url: "web:stirfry"
    },
    {
      title: "Paneer Bhurji Quick",
      ingredients: ["paneer", "onion", "tomato", "turmeric", "chili", "oil"],
      timeMinutes: 22,
      url: "web:bhurji"
    }
  ];
  return examples;
}
