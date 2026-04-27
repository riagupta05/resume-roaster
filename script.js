function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first.</p>`;
    return;
  }

  let issues = [];

  // ---------------- HELPERS ----------------
  function addIssue(severity, title, why, fix, example) {
    issues.push({ severity, title, why, fix, example });
  }

  function detect(regex) {
    return regex.test(text);
  }

  // ---------------- QUALITY SCORING (NOT BINARY) ----------------

  let score = 0;

  // ---------------- SKILLS QUALITY ----------------
  let skillLevel = 0;
  if (detect(/python|java|c\+\+|javascript|rust|go/)) {
    skillLevel = text.includes("tensorflow") || text.includes("docker") ? 20 : 15;
  } else {
    addIssue(
      "high",
      "Weak or missing technical skills",
      "No clear technical stack reduces employability.",
      "Add structured skills: Languages + Tools + Frameworks.",
      "Python | Java | Git | Docker | TensorFlow"
    );
    skillLevel = 5;
  }

  // ---------------- PROJECT QUALITY ----------------
  let projectLevel = 0;
  if (detect(/project|built|developed|created|designed/)) {
    const hasTech = detect(/api|ml|ai|database|react|node|flask|django/);
    projectLevel = hasTech ? 25 : 18;
  } else {
    addIssue(
      "high",
      "No meaningful projects",
      "Projects are key proof of execution ability.",
      "Add 2–4 projects with tech + outcome.",
      "Built NLP resume parser extracting skills automatically"
    );
    projectLevel = 0;
  }

  // ---------------- IMPACT QUALITY (CRITICAL FACTOR) ----------------
  let impactLevel = 0;
  const hasImpact = /\d+%|\d+\+|\d+\s*(users|students|clients|downloads)/.test(text);

  if (hasImpact) {
    impactLevel = 25;
  } else {
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, achievements lack credibility.",
      "Add metrics: %, users, performance improvement.",
      "Improved model accuracy from 82% → 91%"
    );
    impactLevel = 8; // NOT zero, but heavily reduced credibility
  }

  // ---------------- EXPERIENCE ----------------
  let expLevel = detect(/intern|experience|worked|trainee/) ? 15 : 0;

  if (expLevel === 0) {
    addIssue(
      "medium",
      "No experience or internships",
      "Experience improves trust and hiring confidence.",
      "Add internships, freelance, or research exposure.",
      "Software Intern at ABC Tech"
    );
  }

  // ---------------- EDUCATION ----------------
  let eduLevel = detect(/education|btech|bachelor|degree/) ? 15 : 5;

  if (eduLevel === 5) {
    addIssue(
      "medium",
      "Missing education section",
      "Education provides baseline qualification.",
      "Add degree, university, duration.",
      "BTech Computer Science, XYZ University"
    );
  }

  // ---------------- FINAL SCORE ----------------
  score = skillLevel + projectLevel + impactLevel + expLevel + eduLevel;

  if (score > 100) score = 100;
  if (score < 0) score = 0;

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