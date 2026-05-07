# Convert Stitch Design to React Frontend

This plan outlines the steps to convert the provided Google Stitch HTML/CSS exported design into a fully functional, responsive React web application while preserving the exact layout, colors, and components.

## User Review Required

> [!IMPORTANT]
> The plan proposes setting up the project in the root directory using Vite with React + TailwindCSS. Should I clear the design files (like the zip and the extracted `design` directory) after the implementation is complete?

> [!NOTE]
> We will use `react-router-dom` for navigation between the Home and Detection pages.

## Proposed Changes

### Setup and Configuration
- Initialize a React project using Vite in the root directory (`.`): `npx -y create-vite@latest ./ --template react`
- Install and configure TailwindCSS: `npm install -D tailwindcss postcss autoprefixer react-router-dom` and `npx tailwindcss init -p`
- Port the complex Tailwind config and custom font/color themes from the HTML scripts into `tailwind.config.js`.
- Move the raw global CSS into `src/index.css`.

### Shared Components
Create a set of reusable UI components in `src/components/`:
- **NavBar**: Main navigation header allowing switching between Home and Detect pages.
- **Footer**: Common bottom section of the application.
- **UploadBox**: The drag-and-drop file upload interactive area.
- **Layout**: A layout wrapper providing the NavBar and Footer consistently across pages.

### Application Pages
Create individual views in `src/pages/`:
- **Home**: The main landing page with a hero text gradient, upload hook, 'The Process' steps, and 'Uncompromising Precision' feature cards.
- **Detection**: The dashboard-like workspace for scanning deepfakes, incorporating the `UploadBox`, a recent file list, and a live HUD visualization preview section.

## Verification Plan

### Automated/Build Verification
- Confirm that `npm run build` succeeds without issues.

### Manual Verification
1. Start the Vite development server using `npm run dev`.
2. Browse the application using the browser subagent if available, or ask the user to view.
3. Validate that the UI matches the original design, checking layout constraints and colors for both the **Home** and **Detection** capabilities.
4. Test responsiveness (desktop and mobile container behaviors) through responsive Tailwind prefixes.
5. Verify basic interactions such as route changes between Home and Detection, and structural hover effects in components.
