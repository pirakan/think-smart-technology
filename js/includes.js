/* Shared static-site components */
document.addEventListener("DOMContentLoaded", async () => {
    const placeholders = document.querySelectorAll("[data-include]");
    const jobs = Array.from(placeholders).map(async (placeholder) => {
        const file = placeholder.getAttribute("data-include");
        try {
            const response = await fetch(file, { cache: "no-cache" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            placeholder.outerHTML = await response.text();
        } catch (error) {
            console.error(`Could not load ${file}:`, error);
        }
    });

    await Promise.all(jobs);

    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-navigation .nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === current);
    });

    document.dispatchEvent(new CustomEvent("site:includes-ready"));
});
