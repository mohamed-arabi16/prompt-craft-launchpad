from playwright.sync_api import sync_playwright, Page

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    page.set_default_timeout(60000)

    try:
        # Arabic screenshots
        page.goto("http://localhost:8080/")
        page.screenshot(path="jules-scratch/verification/homepage_ar.png")
        page.goto("http://localhost:8080/auth")
        page.screenshot(path="jules-scratch/verification/auth_ar.png")
        page.goto("http://localhost:8080/contact")
        page.screenshot(path="jules-scratch/verification/contact_ar.png")
        page.goto("http://localhost:8080/enrollment")
        page.screenshot(path="jules-scratch/verification/enrollment_ar.png")

        # Switch to English using localStorage and reload
        page.evaluate("localStorage.setItem('language', 'en')")

        # English screenshots
        page.goto("about:blank")
        page.goto("http://localhost:8080/")
        page.screenshot(path="jules-scratch/verification/homepage_en.png")
        page.goto("about:blank")
        page.goto("http://localhost:8080/auth")
        page.screenshot(path="jules-scratch/verification/auth_en.png")
        page.goto("about:blank")
        page.goto("http://localhost:8080/contact")
        page.screenshot(path="jules-scratch/verification/contact_en.png")
        page.goto("about:blank")
        page.goto("http://localhost:8080/enrollment")
        page.screenshot(path="jules-scratch/verification/enrollment_en.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
