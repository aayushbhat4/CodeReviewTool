document.getElementById("submitBtn").addEventListener("click", async () => {
    const repo_url = document.getElementById("repo_url").value.trim();
    const new_code = document.getElementById("new_code").value.trim();
    const feedbackBox = document.getElementById("feedback");

    if (!repo_url || !new_code) {
        feedbackBox.textContent = "Please enter both a GitHub URL and code snippet.";
        return;
    }

    feedbackBox.textContent = "⏳ Analyzing... please wait.";

    try {
        const response = await fetch("http://127.0.0.1:5000/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ repo_url, new_code })
        });

        const data = await response.json();

        if (response.ok) {
            feedbackBox.textContent = data.feedback;
        } else {
            feedbackBox.textContent = "⚠️ Error: " + (data.error || "Unknown error");
        }
    } catch (err) {
        feedbackBox.textContent = "❌ Request failed: " + err.message;
    }
});
