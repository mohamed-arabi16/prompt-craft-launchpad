import time
from playwright.sync_api import sync_playwright, Page, expect

def take_screenshots(page: Page):
    # Home page
    page.goto("http://127.0.0.1:5173/")
    time.sleep(2) # wait for animations
    page.screenshot(path="jules-scratch/verification/home-ar.png")

    # Switch to English
    page.get_by_role("button", name="العربية").click()
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/home-en.png")

    # Enrollment page
    page.goto("http://127.0.0.1:5173/enrollment")
    time.sleep(2)
    page.screenshot(path="jules-scratch/verification/enrollment-en.png")

    # Switch to Arabic
    page.get_by_role("button", name="English").click()
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/enrollment-ar.png")

    # Contact page
    page.goto("http://127.0.0.1:5173/contact")
    time.sleep(2)
    page.screenshot(path="jules-scratch/verification/contact-ar.png")

    # Switch to English
    page.get_by_role("button", name="العربية").click()
    time.sleep(1)
    page.screenshot(path="jules-scratch/verification/contact-en.png")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    take_screenshots(page)
    browser.close()
