function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first.</p>`;
    return;
  }

  let score = 0;
  let maxScore = 100;
  let issues = [];

  // ---------------- HELPERS ----------------
  function addIssue(severity, title, why, fix, example) {
    issues.push({ severity, title, why, fix, example });
  }

  function clamp(val) {
    return Math.max(0, Math.min(maxScore, val));
  }

  // ---------------- SECTION DETECTION ----------------

  const sections = {
    skills: /(skills|python|java|c\+\+|javascript|rust|go)/,
    projects: /(project|built|developed|created|designed)/,
    impact: /\d+%|\d+\+|\d+\s*(users|students|clients|downloads)/,
    experience: /(intern|experience|worked|trainee)/,
    education: /education/
  };

  // ---------------- SCORE SYSTEM (REALISTIC MODEL) ----------------
  let skillScore = 0;
  let projectScore = 0;
  let impactScore = 0;
  let experienceScore = 0;
  let educationScore = 0;

  // Skills scoring
  if (sections.skills.test(text)) skillScore = 20;
  else {
    addIssue(
      "high",
      "Weak or missing skills",
      "No clear technical stack = low employability signal.",
      "Add structured skills grouped by category.",
      "Python | Java | Git | Docker"
    );
  }

  // Project scoring
  if (sections.projects.test(text)) projectScore = 25;
  else {
    addIssue(
      "high",
      "No meaningful projects",
      "Projects prove real-world ability.",
      "Add 2–4 projects with problem → solution → result.",
      "Built a resume parser using NLP"
    );
  }

  // Impact scoring
  if (sections.impact.test(text)) impactScore = 25;
  else {
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, achievements are not credible.",
      "Add metrics: %, users, improvement.",
      "Improved accuracy from 82% → 91%"
    );
  }

  // Experience scoring
  if (sections.experience.test(text)) experienceScore = 15;
  else {
    addIssue(
      "medium",
      "No experience or internships",
      "Experience increases trust and credibility.",
      "Add internships or freelance work.",
      "Software Intern at ABC Tech"
    );
  }

  // Education scoring
  if (sections.education.test(text)) educationScore = 15;
  else {
    addIssue(
      "medium",
      "Missing education section",
      "Education provides baseline validation.",
      "Add degree, university, CGPA.",
      "BTech Computer Science, XYZ University"
    );
  }

  // ---------------- FINAL SCORE ----------------
  score =
    skillScore +
    projectScore +
    impactScore +
    experienceScore +
    educationScore;

  score = clamp(score);

  // ---------------- VERDICT ----------------
  let verdict =
    score >= 85 ? "Strong resume" :
    score >= 70 ? "Good resume" :
    score >= 50 ? "Average resume" :
    score >= 30 ? "Weak resume" :
    "Very poor resume";

  // ---------------- OUTPUT ----------------
  output.innerHTML = `
    <div class="score-box">
      <h2>Resume Score: ${Math.round(score)}/100</h2>
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