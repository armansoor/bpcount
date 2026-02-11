# BLACKPINK | DEADLINE

A dynamic, fan-made countdown site for BLACKPINK's comeback. Designed with a cyberpunk/glassmorphism aesthetic.

## How to Run
This site is designed to be hosted on a web server (e.g., GitHub Pages).
1. Push the code to a GitHub repository.
2. Enable GitHub Pages in the repository settings.
3. The site will be live.

## Configuration
The site is dynamic. You can update the release date, text, and concepts without editing the HTML/JS code.

Edit the file `assets/data/config.json`:

```json
{
    "releaseDate": "2026-02-27T00:00:00-05:00",
    "pageTitle": "BLACKPINK | DEADLINE",
    ...
}
```

- **releaseDate**: ISO 8601 format (e.g., `YYYY-MM-DDTHH:mm:ss`).
- **concepts**: An array of objects for each member/concept.

## Features
- **Dynamic Content**: Powered by a JSON configuration file.
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.
- **Animations**: Glitch effects, floating animations, and smooth transitions.
