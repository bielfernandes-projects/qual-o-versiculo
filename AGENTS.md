<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:background-processes -->
# Background Processes

Always start long-running processes (dev servers, builds, etc.) in the background using `Start-Process` or `&` so the terminal stays available for other commands. Never block the session waiting for a process to finish. Use a timeout appropriate to the task and check output asynchronously.
<!-- END:background-processes -->
