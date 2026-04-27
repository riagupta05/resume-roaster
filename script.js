function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const output = document.getElementById("output");

  if (input.trim() === "") {
    output.innerText = "You didn’t even paste a resume. That already tells me enough.";
    return;
  }

  const roasts = [
    "This resume screams 'I watched one tutorial and now I'm a developer.'",
    "Too many buzzwords, not enough actual skills.",
    "Your resume has more fluff than substance.",
    "This looks like copy-paste from LinkedIn trends.",
    "You listed skills like Pokémon cards—do you actually know them?",
    "Your experience section feels like creative writing.",
    "Recruiters would stop reading after the first section.",
    "Formatting is clean, content is not.",
    "This resume needs more proof, less talk.",
    "You’re trying too hard to sound impressive."
  ];

  const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

  output.innerText = randomRoast;
}