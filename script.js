function roastResume() {
  const text = document.getElementById("resumeInput").value.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first.</p>`;
    return;
  }

  let score = 0;
  let issues = [];

  function addIssue(severity, title, why, fix, example) {
    issues.push({ severity, title, why, fix, example });
  }

  // ---------------- REAL SIGNAL EXTRACTION ----------------

  // 1. Skill richness (not just presence)
  let skillCount =
    (text.match(/python|java|c\+\+|javascript|rust|go|sql|react|node|docker|tensorflow/g) || []).length;

  if (skillCount >= 6) score += 20;
  else if (skillCount >= 3) score += 12;
  else {
    score += 5;
    addIssue(
      "high",
      "Weak skill depth",
      "Few or vague skills reduce recruiter confidence.",
      "Add 6–10 relevant tools/technologies grouped properly.",
      "Python, Java, Docker, React, SQL, Git"
    );
  }

  // 2. Project depth (NOT just presence)
  let projectMentions = (text.match(/built|developed|created|designed|project/g) || []).length;

  if (projectMentions >= 5) score += 25;
  else if (projectMentions >= 2) score += 15;
  else {
    score += 5;
    addIssue(
      "high",
      "Weak project depth",
      "Projects are not detailed or missing.",
      "Add multiple projects with explanation + tech stack.",
      "Built ML classifier for spam detection using Python"
    );
  }

  // 3. Impact quality (strong signal, not boolean)
  let impactScore =
    (text.match(/\d+%|\d+\+|\d+\s*(users|students|clients|downloads)/g) || []).length;

  if (impactScore >= 2) score += 25;
  else if (impactScore === 1) score += 12;
  else {
    score += 3;
    addIssue(
      "high",
      "No measurable impact",
      "Your achievements lack credibility without numbers.",
      "Add metrics: %, scale, users, improvement.",
      "Improved accuracy from 82% → 91%"
    );
  }

  // 4. Experience quality
  if (/(intern|experience|trainee|worked)/.test(text)) {
    score += 15;
  } else {
    score += 5;
    addIssue(
      "medium",
      "No experience",
      "Experience improves trust and employability.",
      "Add internships or freelance work.",
      "Software Intern at ABC Tech"
    );
  }

  // 5. Education presence
  if (/education|btech|bachelor|degree/.test(text)) {
    score += 15;
  } else {
    score += 5;
    addIssue(
      "medium",
      "Missing education section",
      "Education provides baseline validation.",
      "Add degree, university, CGPA.",
      "BTech Computer Science, XYZ University"
    );
  }

  // ---------------- FINAL SCORE ----------------
  if (score > 100) score = 100;

  let verdict =
    score >= 85 ? "Strong resume" :
    score >= 70 ? "Good resume" :
    score >= 50 ? "Average resume" :
    score >= 30 ? "Weak resume" :
    "Very poor resume";

  output.innerHTML = `
    <div class="score-box">
      <h2>Resume Score: ${score}/100</h2>
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