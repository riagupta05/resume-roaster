function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first. Empty input = no evaluation possible.</p>`;
    return;
  }

  let score = 100;
  let issues = [];

  function addIssue(severity, title, why, fix, example) {
    let penalty = severity === "high" ? 25 : severity === "medium" ? 15 : 8;
    score -= penalty;

    issues.push({
      severity,
      title,
      why,
      fix,
      example
    });
  }
  if (text.length < 300) {
    addIssue(
      "high",
      "Resume is too short",
      "Recruiters cannot evaluate skills without enough content.",
      "Add projects, skills, and academic or internship details.",
      "Example: Built a ML model that predicts X using Python and scikit-learn"
    );
  } else if (text.length > 2000) {
    addIssue(
      "medium",
      "Resume is too long",
      "Long resumes reduce readability and recruiter attention.",
      "Keep it concise (1 page ideal). Remove filler sentences.",
      "Replace paragraphs with bullet points"
    );
  }

  if (!text.match(/python|java|c\+\+|javascript|rust/)) {
    addIssue(
      "high",
      "No technical skills detected",
      "Skills section is one of the first things recruiters scan.",
      "Add a structured skills section: Languages, Tools, Frameworks.",
      "Languages: Python, Java | Tools: Git, Docker | ML: Scikit-learn"
    );
  }

  if (!text.includes("project") && !text.includes("built") && !text.includes("developed")) {
    addIssue(
      "high",
      "No projects found",
      "Projects are proof of ability, not just claims.",
      "Add 2–4 projects with clear problem + solution + tech stack.",
      "Built a resume parser using Python and NLP that extracts skills automatically"
    );
  }

  if (!/\d+%|\d+\+|\d+ users|\d+ students|\d+ improvement/.test(text)) {
    addIssue(
      "medium",
      "No measurable impact",
      "Without numbers, achievements look weak or unverified.",
      "Add metrics like %, users, performance gain, or scale.",
      "Improved model accuracy from 82% → 91%"
    );
  }

  if (!text.includes("education")) {
    addIssue(
      "medium",
      "Missing Education section",
      "Education is essential for context and eligibility screening.",
      "Add degree, college, duration, and CGPA if relevant.",
      "BTech in Informatics, XYZ University (2023–2027)"
    );
  }

  if (score < 0) score = 0;

  output.innerHTML = `
    <div class="score-box">
      <h2>Resume Score: ${score}/100</h2>
      <p>${score > 80 ? "Strong resume" : score > 60 ? "Average resume" : "Needs serious improvement"}</p>
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