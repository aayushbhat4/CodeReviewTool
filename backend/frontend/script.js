const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const loader = document.getElementById("loader");
const output = document.getElementById("output");
const feedbackText = document.getElementById("feedbackText");

submitBtn.addEventListener("click", async () => {
  const repoUrl = document.getElementById("repoUrl").value.trim();
  const newCode = document.getElementById("newCode").value.trim();

  if (!repoUrl || !newCode) {
    alert("⚠️ Please fill in both the repository URL and your code!");
    return;
  }

  // UI changes
  loader.classList.remove("hidden");
  btnText.textContent = "Reviewing...";
  submitBtn.disabled = true;
  output.classList.add("hidden");

  try {
    const response = await fetch("/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_url: repoUrl, new_code: newCode }),
    });

    const data = await response.json();

    if (response.ok) {
      feedbackText.innerHTML = marked.parse(data.feedback || "No feedback generated.");
      output.classList.remove("hidden");
      output.scrollIntoView({ behavior: "smooth" });
    } else {
      alert("❌ Error: " + (data.error || "Request failed."));
    }
  } catch (error) {
    alert("⚠️ Request failed: " + error.message);
  } finally {
    // Reset button state
    loader.classList.add("hidden");
    btnText.textContent = "🔍 Get Review";
    submitBtn.disabled = false;
  }
});
