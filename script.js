function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase().trim();
  const output = document.getElementById("output");

  if (!text) {
    output.innerHTML = `<p class="bad">Paste a resume first. Empty input = nothing to analyze.</p>`;
    return;
  }

  let score = 100;
  let issues = [];

  function addIssue(severity, title, why, fix, example) {
    const penaltyMap = {
      high: 25,
      medium: 15,
      low: 8
    };

    score -= penaltyMap[severity] || 10;

    issues.push({ severity, title, why, fix, example });
  }

  if (text.length < 350) {
    addIssue(
      "high",
      "Resume is too short",
      "This is not enough information for recruiters to evaluate you.",
      "Add detailed projects, skills, and achievements with descriptions.",
      "Built a machine learning model that predicts X with 91% accuracy using Python and scikit-learn"
    );
  } else if (text.length > 2200) {
    addIssue(
      "medium",
      "Resume is too long",
      "Recruiters typically skim resumes in under 10 seconds.",
      "Remove filler content and keep only relevant achievements.",
      "Convert paragraphs into bullet points"
    );
  }

  if (!/(python|java|c\+\+|javascript|rust|go)/.test(text)) {
    addIssue(
      "high",
      "Weak or missing technical skills",
      "Skills section is critical for ATS and recruiter filtering.",
      "Add categorized skills: Languages, Tools, Frameworks, Libraries.",
      "Languages: Python, Java | Tools: Git, Docker | ML: TensorFlow, Scikit-learn"
    );
  }

  if (!/(project|built|developed|designed|created)/.test(text)) {
    addIssue(
      "high",
      "No strong projects detected",
      "Projects are the strongest proof of your ability.",
      "Add 2–4 real projects with problem → solution → tech stack → result.",
      "Built a resume parser using NLP that extracts skills and experience automatically"
    );
  }

  if (!/\d+%|\d+\+|\d+\s*(users|students|clients|downloads|improvement)/.test(text)) {
    addIssue(
      "high",
      "No measurable impact",
      "Without numbers, achievements feel vague and unconvincing.",
      "Add measurable results like %, scale, users, performance gain.",
      "Improved model accuracy from 82% → 91% using feature engineering"
    );
  }

  if (!text.includes("education")) {
    addIssue(
      "medium",
      "Missing education section",
      "Education provides context for recruiters and eligibility filtering.",
      "Add degree, institution, duration, and CGPA (if decent).",
      "BTech in Computer Science, XYZ University (2023–2027)"
    );
  }

  if (!/(intern|experience|worked|trainee)/.test(text)) {
    addIssue(
      "medium",
      "No experience or internships",
      "Even small internships improve credibility significantly.",
      "Add internships, freelance work, or research exposure.",
      "Software Intern at ABC Tech (Built internal automation tools using Python)"
    );
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let verdict =
    score >= 80 ? "Strong resume" :
    score >= 60 ? "Decent but needs improvement" :
    score >= 40 ? "Weak resume" :
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