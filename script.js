function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first.</p>`;
    return;
  }

  let score = 100;
  let issues = [];

  let hasProjects = /(project|built|developed|created|designed)/.test(text);
  let hasImpact = /\d+%|\d+\+|\d+\s*(users|students|clients|downloads|improvement)/.test(text);
  let hasSkills = /(python|java|c\+\+|javascript|rust|go)/.test(text);
  let hasExperience = /(intern|experience|worked|trainee)/.test(text);
  let hasEducation = text.includes("education");

  function addIssue(severity, title, why, fix, example) {
    const penaltyMap = {
      high: 30,
      medium: 18,
      low: 8
    };

    score -= penaltyMap[severity] || 10;

    issues.push({ severity, title, why, fix, example });
  }

  // ---------------- LENGTH ----------------
  if (text.length < 350) {
    addIssue(
      "high",
      "Resume is too short",
      "Not enough content to evaluate skills or experience.",
      "Add structured sections: skills, projects, experience, education.",
      "Built a ML model predicting outcomes with 91% accuracy using Python"
    );
  } else if (text.length > 2200) {
    addIssue(
      "medium",
      "Resume is too long",
      "Recruiters scan resumes quickly; long ones lose attention.",
      "Remove filler content and keep only impact-based bullets.",
      "Use bullet points instead of paragraphs"
    );
  }

  // ---------------- SKILLS ----------------
  if (!hasSkills) {
    addIssue(
      "high",
      "Weak or missing technical skills",
      "Skills are required for ATS filtering.",
      "Add categorized skills: Languages, Tools, Frameworks.",
      "Python | Java | Git | Docker | TensorFlow"
    );
  }

  // ---------------- PROJECTS ----------------
  if (!hasProjects) {
    addIssue(
      "high",
      "No strong projects detected",
      "Projects are strongest proof of ability.",
      "Add 2–3 projects with problem → solution → tech → result.",
      "Built a resume parser using NLP"
    );
  }

  // ---------------- IMPACT ----------------
  if (!hasImpact) {
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, achievements feel weak.",
      "Add metrics like %, users, scale.",
      "Improved accuracy from 82% → 91%"
    );
  }

  // ---------------- EXPERIENCE ----------------
  if (!hasExperience) {
    addIssue(
      "medium",
      "No experience or internships",
      "Experience improves credibility.",
      "Add internships or freelance work.",
      "Software Intern at ABC Tech"
    );
  }

  // ---------------- EDUCATION ----------------
  if (!hasEducation) {
    addIssue(
      "medium",
      "Missing education section",
      "Education provides context.",
      "Add degree and university details.",
      "BTech Computer Science, XYZ University"
    );
  }

  // ---------------- FINAL SCORE ----------------
  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let verdict =
    score >= 85 ? "Strong resume" :
    score >= 70 ? "Good but needs polish" :
    score >= 50 ? "Average resume" :
    score >= 30 ? "Weak resume" :
    "Very poor resume";

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