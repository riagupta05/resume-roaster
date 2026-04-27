function roastResume() {
  const input = document.getElementById("resumeInput").value;
  const text = input.toLowerCase();
  const output = document.getElementById("output");

  if (text.trim() === "") {
    output.innerHTML = "<p>You didn’t even paste a resume. That’s your first problem.</p>";
    return;
  }

  let sections = [];

  // 📏 LENGTH ANALYSIS
  let lengthFeedback = [];
  if (text.length < 200) {
    lengthFeedback.push("Too short. This looks incomplete.");
    lengthFeedback.push("👉 Add more details about projects, skills, and achievements.");
  } else if (text.length > 1500) {
    lengthFeedback.push("Too long. Recruiters won’t read all this.");
    lengthFeedback.push("👉 Keep it concise (1 page ideal).");
  } else {
    lengthFeedback.push("Length is decent.");
  }
  sections.push({ title: "📏 Length Analysis", content: lengthFeedback });

  // 🛠 SKILLS
  let skillsFeedback = [];
  if (!text.includes("python") && !text.includes("java") && !text.includes("c++")) {
    skillsFeedback.push("No strong technical skills mentioned.");
    skillsFeedback.push("👉 Add a dedicated 'Skills' section.");
  } else {
    skillsFeedback.push("Skills detected, but make sure they are relevant.");
    skillsFeedback.push("👉 Group them (Languages, Tools, Frameworks).");
  }
  sections.push({ title: "🛠 Skills", content: skillsFeedback });

  // 💻 PROJECTS
  let projectFeedback = [];
  if (!text.includes("project")) {
    projectFeedback.push("No projects mentioned. That’s a major weakness.");
    projectFeedback.push("👉 Add 2–3 projects with clear descriptions.");
  } else {
    projectFeedback.push("Projects are mentioned.");
    projectFeedback.push("👉 Add impact: what problem you solved, what tech you used.");
  }
  sections.push({ title: "💻 Projects", content: projectFeedback });

  // 📊 IMPACT / NUMBERS
  let impactFeedback = [];
  if (!/\d/.test(text)) {
    impactFeedback.push("No measurable impact found.");
    impactFeedback.push("👉 Add numbers (e.g., improved X by 30%, built for 100+ users).");
  } else {
    impactFeedback.push("Some measurable impact detected.");
  }
  sections.push({ title: "📊 Impact", content: impactFeedback });

  // 📄 STRUCTURE
  let structureFeedback = [];
  if (!text.includes("education")) {
    structureFeedback.push("Missing Education section.");
  }
  if (!text.includes("experience") && !text.includes("intern")) {
    structureFeedback.push("No experience/internship section.");
  }
  if (structureFeedback.length === 0) {
    structureFeedback.push("Basic structure looks okay.");
  } else {
    structureFeedback.push("👉 Add missing sections for completeness.");
  }
  sections.push({ title: "📄 Structure", content: structureFeedback });

  // 🔥 OVERALL ROAST
  let overall = [];
  overall.push("This resume is not terrible—but it’s not strong either.");
  overall.push("👉 Focus on clarity, impact, and proof of skills.");
  sections.push({ title: "🔥 Final Verdict", content: overall });

  // 🖥 Render nicely
  output.innerHTML = sections.map(section => `
    <div style="margin-bottom:20px;">
      <h3>${section.title}</h3>
      ${section.content.map(line => `<p>${line}</p>`).join("")}
    </div>
  `).join("");
}