function roastResume() {
  const input = document.getElementById("resumeInput").value.toLowerCase();
  const output = document.getElementById("output");

  if (input.trim() === "") {
    output.innerText = "You didn’t even paste a resume. That’s your first problem.";
    return;
  }

  let feedback = [];

  // 🔥 Roast + Improve based on length
  if (input.length < 100) {
    feedback.push("This resume is way too short. It looks like you gave up halfway.");
    feedback.push("👉 Add more details about your projects, skills, and experience.");
  }

  // 🔥 Check for skills
  if (!input.includes("python") && !input.includes("java") && !input.includes("html")) {
    feedback.push("You didn’t mention any technical skills. What exactly can you do?");
    feedback.push("👉 Add a clear 'Skills' section with technologies you know.");
  }

  // 🔥 Check for projects
  if (!input.includes("project")) {
    feedback.push("No projects mentioned. That’s a huge red flag.");
    feedback.push("👉 Add at least 2–3 solid projects with descriptions.");
  }

  // 🔥 Check for experience/internship
  if (!input.includes("intern") && !input.includes("experience")) {
    feedback.push("No experience section? Recruiters won’t take this seriously.");
    feedback.push("👉 Add internships, training, or any practical work.");
  }

  // 🔥 Default roast if decent
  if (feedback.length === 0) {
    feedback.push("Okay, this is not terrible… but it’s still average.");
    feedback.push("👉 Improve impact: use numbers, achievements, and measurable results.");
  }

  output.innerText = feedback.join("\n\n");
}