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
      "Skills are required for ATS filtering and recruiter screening.",
      "Add categorized skills: Languages, Tools, Frameworks.",
      "Python | Java | Git | Docker | TensorFlow"
    );
  }

  // ---------------- PROJECTS ----------------
  if (!hasProjects) {
    addIssue(
      "high",
      "No strong projects detected",
      "Projects are the strongest proof of technical ability.",
      "Add 2–3 projects with problem → solution → tech → result.",
      "Built a resume parser using NLP to extract skills automatically"
    );
  }

  // ---------------- IMPACT ----------------
  if (!hasImpact) {
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, achievements feel unconvincing.",
      "Add metrics like %, users, scale, or improvement.",
      "Improved accuracy from 82% → 91% using feature engineering"
    );
  }

  // ---------------- EXPERIENCE ----------------
  if (!hasExperience) {
    addIssue(
      "medium",
      "No experience or internships",
      "Experience increases credibility significantly.",
      "Add internships, freelance work, or research exposure.",
      "Software Intern at ABC Tech (built automation tools using Python)"
    );
  }

  // ---------------- EDUCATION ----------------
  if (!hasEducation) {
    addIssue(
      "medium",
      "Missing education section",
      "Education provides context for eligibility and background.",
      "Add degree, university, duration, CGPA.",
      "BTech Computer Science, XYZ University (2023–2027)"
    );
  }

  // ---------------- FINAL SCORE LOGIC (IMPORTANT UPGRADE) ----------------

  // 🔥 penalty amplification (fixes inflated scoring issue)
  let penaltyMultiplier = 1;

  if (!hasProjects) penaltyMultiplier -= 0.25;
  if (!hasImpact) penaltyMultiplier -= 0.25;
  if (!hasSkills) penaltyMultiplier -= 0.2;
  if (!hasExperience) penaltyMultiplier -= 0.15;

  score = score * penaltyMultiplier;

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  // ---------------- VERDICT ----------------
  let verdict =
    score >= 85 ? "Strong resume" :
    score >= 70 ? "Good but needs polish" :
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