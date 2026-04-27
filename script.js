function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first.</p>`;
    return;
  }

  let baseScore = 100;
  let issues = [];

  // ---------------- DETECTORS ----------------
  let hasSkills = /(python|java|c\+\+|javascript|rust|go)/.test(text);
  let hasProjects = /(project|built|developed|created|designed)/.test(text);
  let hasImpact = /\d+%|\d+\+|\d+\s*(users|students|clients|downloads|improvement)/.test(text);
  let hasExperience = /(intern|experience|worked|trainee)/.test(text);
  let hasEducation = text.includes("education");

  // ---------------- CORE WEIGHT SYSTEM ----------------
  let weights = {
    skills: 20,
    projects: 30,
    impact: 30,
    experience: 15,
    education: 10
  };

  let penalty = 0;

  function addIssue(severity, title, why, fix, example) {
    issues.push({ severity, title, why, fix, example });
  }

  // ---------------- CRITICAL EVALUATION ----------------

  if (!hasSkills) {
    penalty += weights.skills;
    addIssue(
      "high",
      "Weak or missing technical skills",
      "Recruiters cannot evaluate your technical capability without clear skills.",
      "Add grouped skills: Languages, Tools, Frameworks.",
      "Python | Java | Git | Docker | TensorFlow"
    );
  }

  if (!hasProjects) {
    penalty += weights.projects;
    addIssue(
      "high",
      "No meaningful projects",
      "Projects are your strongest proof of ability.",
      "Add 2–4 projects with problem → solution → tech → result.",
      "Built a resume parser that extracts skills using NLP"
    );
  }

  if (!hasImpact) {
    penalty += weights.impact;
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, your achievements are not credible.",
      "Add metrics: %, users, scale, performance improvement.",
      "Improved model accuracy from 82% → 91%"
    );
  }

  if (!hasExperience) {
    penalty += weights.experience;
    addIssue(
      "medium",
      "No experience or internships",
      "Experience significantly improves trust and employability.",
      "Add internships, freelance work, or research experience.",
      "Software Intern at ABC Tech (built automation tools)"
    );
  }

  if (!hasEducation) {
    penalty += weights.education;
    addIssue(
      "medium",
      "Missing education section",
      "Education provides baseline qualification context.",
      "Add degree, university, duration, CGPA.",
      "BTech Computer Science, XYZ University (2023–2027)"
    );
  }

  // ---------------- DEPENDENCY LOGIC (IMPORTANT UPGRADE) ----------------

  // If impact is missing → reduce overall confidence further
  if (!hasImpact) {
    baseScore *= 0.85;
  }

  // If BOTH projects + impact missing → strong penalty (real-world behavior)
  if (!hasProjects && !hasImpact) {
    baseScore *= 0.75;
  }

  // ---------------- FINAL SCORE ----------------
  let finalScore = baseScore - penalty;

  if (finalScore < 0) finalScore = 0;
  if (finalScore > 100) finalScore = 100;

  // ---------------- VERDICT ----------------
  let verdict =
    finalScore >= 85 ? "Strong resume" :
    finalScore >= 70 ? "Good but needs polish" :
    finalScore >= 50 ? "Average resume" :
    finalScore >= 30 ? "Weak resume" :
    "Very poor resume";

  // ---------------- OUTPUT ----------------
  output.innerHTML = `
    <div class="score-box">
      <h2>Resume Score: ${Math.round(finalScore)}/100</h2>
      <p><b>${verdict}</b></p>
    </div>

    ${issues.map(i => `
      <div class="issue ${i.severity}">
        <h3>${i.title} (${i.severity.toUpperCase()})</h3>
        <p><b>Why this matters:</b> ${i.why}</p>
        <p><b>Fix:</b> ${i.fix}</p>
        <p><b>Example:</b> ${i.example}</p>
      </div>
    `).join("")}
  `;
}