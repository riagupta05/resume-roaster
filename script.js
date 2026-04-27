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

  function addIssue(severity, title, why, fix, example) {
    const penaltyMap = {
      high: 30,
      medium: 18,
      low: 8
    };

    let penalty = penaltyMap[severity] || 10;

    // 🔥 compounding penalty logic (important upgrade)
    score -= penalty;

    issues.push({ severity, title, why, fix, example });
  }

  if (text.length < 350) {
    addIssue(
      "high",
      "Resume is extremely short",
      "Too little content means no real evaluation is possible.",
      "Add structured sections: skills, projects, experience, education.",
      "Built an ML model predicting X with 91% accuracy using Python"
    );
  } else if (text.length > 2200) {
    addIssue(
      "medium",
      "Resume is too long",
      "Recruiters will not read everything.",
      "Cut filler text, keep only impact-driven bullets.",
      "Convert paragraphs → bullet points"
    );
  }

  if (!/(python|java|c\+\+|javascript|rust|go)/.test(text)) {
    addIssue(
      "high",
      "Weak or missing technical skills",
      "ATS filters depend heavily on skills.",
      "Add categorized skills: Languages, Tools, Frameworks.",
      "Python | Java | Git | Docker | TensorFlow"
    );
  }

  const hasProject = /(project|built|developed|created|designed)/.test(text);
  if (!hasProject) {
    addIssue(
      "high",
      "No meaningful projects detected",
      "Projects are the strongest proof of ability.",
      "Add 2–3 projects with: problem → solution → tech → result",
      "Built a resume parser using NLP to extract skills automatically"
    );
  }

  const hasImpact = /\d+%|\d+\+|\d+\s*(users|students|clients|downloads|improvement)/.test(text);
  if (!hasImpact) {
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, achievements are not credible.",
      "Add metrics like %, scale, users, or performance gain.",
      "Improved accuracy from 82% → 91% using feature engineering"
    );
  }

  if (!text.includes("education")) {
    addIssue(
      "medium",
      "Missing education section",
      "Education gives context for recruiters.",
      "Add degree, university, duration, CGPA.",
      "BTech Computer Science, XYZ University (2023–2027)"
    );
  }

  if (!/(intern|experience|worked|trainee)/.test(text)) {
    addIssue(
      "medium",
      "No experience or internships",
      "Experience improves credibility significantly.",
      "Add internships, freelance, or research work.",
      "Software Intern at ABC Tech (built automation tools in Python)"
    );
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  // 🔥 smarter verdict system (more strict now)
  let verdict =
    score >= 85 ? "Strong resume" :
    score >= 70 ? "Good but missing polish" :
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