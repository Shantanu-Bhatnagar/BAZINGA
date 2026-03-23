# BAZINGA - AI Engineering Agent Dashboard

A dark-first developer dashboard for BAZINGA, an AI-powered code generation agent with human-in-the-loop approval workflow.

## Features

- **Project Configuration**: Input project name, description, language, and framework
- **AI Code Generation**: Calls FastAPI backend to generate complete project structure
- **Collapsible File Viewer**: Browse and review generated code files
- **Human-in-the-Loop Approval**: Mandatory review checkbox before execution
- **Dark Theme**: Developer-friendly dark UI with light mode toggle
- **Single-Page App**: No authentication or database required (v1)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: Pure CSS components (no shadcn dependencies)

## Prerequisites

Before running this project, ensure you have:

- Node.js 18.x or higher installed
- npm, yarn, or pnpm package manager
- A FastAPI backend running on `http://localhost:8000` with `/generate-project` endpoint

## Setup Instructions

### 1. Download and Extract

Download the ZIP file from v0 and extract it to your desired location.

### 2. Open in VS Code

```bash
cd path/to/extracted/folder
code .
```

### 3. Install Dependencies

Open the integrated terminal in VS Code (`` Ctrl+` `` or `Cmd+` on Mac) and run:

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

Or if you prefer pnpm:

```bash
pnpm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Or with pnpm:

```bash
pnpm dev
```

### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

The dashboard will load in dark mode by default.

## Backend API Requirements

The frontend expects a FastAPI backend running on `http://localhost:8000` with the following endpoint:

### POST /generate-project

**Request Body:**
```json
{
  "project_name": "my-awesome-project",
  "description": "A detailed description of what to build",
  "language": "python",
  "framework": "fastapi"
}
```

**Response Format:**
```json
{
  "project_name": "my-awesome-project",
  "description": "A detailed description of what to build",
  "language": "python",
  "framework": "fastapi",
  "files": [
    {
      "path": "README.md",
      "content": "# Project README content..."
    },
    {
      "path": "main.py",
      "content": "from fastapi import FastAPI\n\napp = FastAPI()"
    }
  ],
  "metadata": {
    "created_at": "2024-01-20T10:30:00Z",
    "estimated_lines": 150
  }
}
```

**Note**: If the backend is not running, you'll see an error message in the UI when trying to generate a project.

## Project Structure

```
.
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles and theme
├── components/
│   ├── Navbar.tsx            # Top navigation with theme toggle
│   ├── Sidebar.tsx           # Left sidebar (project history placeholder)
│   ├── ProfilePanel.tsx      # Guest user info panel
│   ├── ProjectForm.tsx       # Project configuration form
│   ├── GeneratedProjectPanel.tsx  # Display generated files
│   └── ApprovalPanel.tsx     # Human approval checkbox and execution button
├── public/                   # Static assets
├── package.json              # Dependencies
└── README.md                 # This file
```

## Usage

1. **Configure Project**: Fill in the project name, select language and framework, and provide a detailed description
2. **Generate**: Click "Generate Project" to send request to backend
3. **Review**: Expand files in the generated project panel to review code
4. **Approve**: Check "I have reviewed the generated content and approve execution"
5. **Execute**: Click "Push to GitHub (Coming Soon)" button (placeholder for v2)

## Customization

### Change Theme Colors

Edit `app/globals.css` and modify the CSS custom properties in `:root` (light mode) and `.dark` (dark mode).

### Update API Endpoint

Edit `app/page.tsx` and change the fetch URL:

```typescript
const response = await fetch("http://your-backend-url/generate-project", {
  // ...
})
```

### Add More Languages/Frameworks

Edit `components/ProjectForm.tsx` and add options to the select dropdowns.

## Build for Production

```bash
npm run build
npm start
```

This will create an optimized production build and start the production server.

## Troubleshooting

**Port 3000 already in use?**
```bash
npx kill-port 3000
```

Then run `npm run dev` again.

**Backend connection errors?**
- Ensure your FastAPI backend is running on port 8000
- Check CORS settings in your FastAPI app
- Verify the `/generate-project` endpoint exists

**Styling issues?**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Future Features (v2)

- GitHub integration for pushing generated code
- Project history with persistence
- User authentication
- Multi-project management
- Code diff viewer
- Direct file editing

## License

MIT
