document.getElementById("submitBtn").addEventListener("click", async () => {
  const repoUrl = document.getElementById("repoUrl").value.trim();
  const newCode = document.getElementById("newCode").value.trim();
  const loading = document.getElementById("loading");
  const output = document.getElementById("output");
  const feedbackText = document.getElementById("feedbackText");

  if (!repoUrl || !newCode) {
    alert("Please enter both repo URL and code!");
    return;
  }

  loading.classList.remove("hidden");
  output.classList.add("hidden");

  try {
    const response = await fetch("/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_url: repoUrl, new_code: newCode }),
    });

    const data = await response.json();
    loading.classList.add("hidden");

    if (response.ok) {
      feedbackText.textContent = data.feedback || "No feedback received.";
      output.classList.remove("hidden");
    } else {
      alert("Error: " + (data.error || "Something went wrong."));
    }
  } catch (error) {
    loading.classList.add("hidden");
    alert("Request failed: " + error.message);
  }
});
