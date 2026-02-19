from playwright.sync_api import sync_playwright
import time


def run_bot(task_data=None):
    logs = []

    def log(message):
        print(message)
        logs.append(message)

    log("🚀 Starting Automation Agent...")

    with sync_playwright() as p:
        log("🌐 Launching browser...")
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        log("➡ Navigating to example.com...")
        page.goto("https://dev.uniadmire.com/applications")

        time.sleep(1)

        log("📄 Extracting page title...")
        title = page.title()
        log(f"✅ Page title detected: {title}")

        time.sleep(1)

        log("🧠 Simulating document validation...")
        time.sleep(1)
        log("✔ High School Document Verified")
        log("✔ Passport Document Verified")

        time.sleep(1)

        log("📤 Simulating form submission...")
        time.sleep(1)
        log("🎉 Application Submitted Successfully!")

        log("🛑 Closing browser...")
        browser.close()

    log("🤖 Automation Agent Finished.")

    return logs
