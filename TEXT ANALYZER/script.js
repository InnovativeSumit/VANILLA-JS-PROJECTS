document.getElementById("process-btn").addEventListener("click", () => {
  const text = document.getElementById("text-input").value;

  // Character count
  const charCount = text.length;

  // Word count (split by spaces, filter out empty strings)
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Sentence count (split by . ! ?)
  const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  // Spaces count
  const spaceCount = (text.match(/ /g) || []).length;

  // Punctuation count (common punctuation symbols)
  const punctuationCount = (text.match(/[.,!?;:]/g) || []).length;

  // Display results
  document.getElementById("char").textContent = charCount;
  document.getElementById("word").textContent = wordCount;
  document.getElementById("sentence").textContent = sentenceCount;
  document.getElementById("spaces").textContent = spaceCount;
  document.getElementById("punctuation").textContent = punctuationCount;
});
