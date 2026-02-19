if (!document.getElementById("ai-agent-panel")) {

    const panel = document.createElement("div");
    panel.id = "ai-agent-panel";
    panel.innerHTML = `
        <div id="ai-header">
            <div id="ai-title">🤖 AI Agent</div>
            <button id="theme-toggle" aria-label="Toggle theme">
                <span class="toggle-track" aria-hidden>
                    <span class="toggle-knob"></span>
                </span>
            </button>
        </div>
        <button id="start-btn">Start Automation</button>
        <div id="log-box">System Ready...</div>
    `;

    document.body.appendChild(panel);

    // Create toggle button
    const toggleBtn = document.createElement("div");
    toggleBtn.id = "ai-toggle-btn";
    toggleBtn.innerHTML = "❮";
    // append the toggle into the panel so it inherits panel-level CSS variables (e.g. hacker mode)
    panel.appendChild(toggleBtn);

    let attachedSide = "right";


    function updateTogglePosition() {
        const rect = panel.getBoundingClientRect();

        toggleBtn.style.top = rect.top + 40 + "px"; // follow panel vertically

        if (attachedSide === "left") {
            toggleBtn.style.left = rect.right + "px";
            toggleBtn.style.right = "auto";
        } else {
            toggleBtn.style.left = rect.left - toggleBtn.offsetWidth + "px";
            toggleBtn.style.right = "auto";
        }
    }

        // Initial position
    panel.style.left = (window.innerWidth - panel.offsetWidth) + "px";
    panel.style.top = "80px";
    attachedSide = "right";

    updateTogglePosition();


    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = chrome.runtime.getURL("panel.css");
    document.head.appendChild(style);

    const header = panel.querySelector("#ai-header");
    const startBtn = panel.querySelector("#start-btn");
    const logBox = panel.querySelector("#log-box");

    const themeToggle = panel.querySelector("#theme-toggle");

    // Load saved theme
    let currentTheme = localStorage.getItem("ai-theme") || "light";
    panel.classList.add(currentTheme);

    // Update toggle appearance based on current theme
    function updateThemeToggleAppearance() {
        if (!themeToggle) return;
        if (currentTheme === "hacker") {
            themeToggle.classList.add("on");
            themeToggle.setAttribute("aria-pressed", "true");
        } else {
            themeToggle.classList.remove("on");
            themeToggle.setAttribute("aria-pressed", "false");
        }
    }

    updateThemeToggleAppearance();

    themeToggle.addEventListener("click", () => {
        panel.classList.remove("light", "hacker");

        currentTheme = currentTheme === "light" ? "hacker" : "light";

        panel.classList.add(currentTheme);
        localStorage.setItem("ai-theme", currentTheme);

        updateThemeToggleAppearance();
    });


    let isDragging = false;
    let offsetX, offsetY;

    // DRAG START
    header.addEventListener("mousedown", (e) => {
        isDragging = true;

        const rect = panel.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.body.style.userSelect = "none";
    });

    // DRAG MOVE
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        panel.style.transition = "none";

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const panelWidth = panel.offsetWidth;
        const panelHeight = panel.offsetHeight;

        const maxX = window.innerWidth - panelWidth;
        const maxY = window.innerHeight - panelHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        panel.style.left = newX + "px";
        panel.style.top = newY + "px";
        panel.style.right = "auto";

        updateTogglePosition();
    });

    // DRAG END
    document.addEventListener("mouseup", () => {
        if (!isDragging) return;

        isDragging = false;
        document.body.style.userSelect = "auto";

        const rect = panel.getBoundingClientRect();

        // Add snap animation ONLY now
        if (rect.left < window.innerWidth / 2) {
            panel.style.left = "0px";
            attachedSide = "left";

        } else {
            panel.style.left = (window.innerWidth - panel.offsetWidth) + "px";
            attachedSide = "right";
        }
        updateTogglePosition();

        // Remove transition after animation completes
        setTimeout(() => {
            panel.style.transition = "none";
        }, 200);
    });


    // COLLAPSE
    let isCollapsed = false;

    toggleBtn.addEventListener("click", () => {
        if (!isCollapsed) {
            if (attachedSide === "left") {
                panel.style.left = "-" + panel.offsetWidth + "px";
                toggleBtn.style.left = "0px";
            } else {
                panel.style.left = window.innerWidth + "px";
                toggleBtn.style.right = "0px";
            }

            toggleBtn.innerHTML = attachedSide === "left" ? "❯" : "❮";
            isCollapsed = true;
        } else {
            if (attachedSide === "left") {
                panel.style.left = "0px";
                toggleBtn.style.left = panel.offsetWidth + "px";
            } else {
                panel.style.left = (window.innerWidth - panel.offsetWidth) + "px";
                toggleBtn.style.right = panel.offsetWidth + "px";
            }

            toggleBtn.innerHTML = attachedSide === "left" ? "❮" : "❯";
            isCollapsed = false;
        }

        updateTogglePosition();

    });


    // AUTOMATION
    startBtn.addEventListener("click", async () => {
        logBox.innerHTML = "🚀 Starting Automation...";

        try {
            const response = await fetch("http://127.0.0.1:5000/start");
            const data = await response.json();

            if (data.status === "success") {
                logBox.innerHTML = "";
                data.logs.forEach(log => {
                    const div = document.createElement("div");
                    div.textContent = log;
                    logBox.appendChild(div);
                });
            } else {
                logBox.innerHTML = "Error: " + data.message;
            }
        } catch (error) {
            logBox.innerHTML = "⚠ Backend not running!";
        }
    });
}
