/* ============================================
   ASCII Art for CLI Terminal Portfolio
   ============================================ */

// Large ASCII Art Title - "SHIBAM MANDAL"
const ASCII_TITLE = `
<span class="ascii-title">
███████╗██╗  ██╗██╗██████╗  █████╗ ███╗   ███╗
██╔════╝██║  ██║██║██╔══██╗██╔══██╗████╗ ████║
███████╗███████║██║██████╔╝███████║██╔████╔██║
╚════██║██╔══██║██║██╔══██╗██╔══██║██║╚██╔╝██║
███████║██║  ██║██║██████╔╝██║  ██║██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
                                              
███╗   ███╗ █████╗ ███╗   ██╗██████╗  █████╗ ██╗     
████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔══██╗██║     
██╔████╔██║███████║██╔██╗ ██║██║  ██║███████║██║     
██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║██╔══██║██║     
██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝██║  ██║███████╗
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚══════╝
</span>`;

// Portrait removed for minimalistic design
const ASCII_PORTRAIT = '';
const ASCII_PORTRAIT_SMALL = '';

// Neofetch-style system info - Minimalistic
const NEOFETCH_INFO = `
shibam@portfolio
────────────────────
OS      : Developer v2026
Host    : B.Tech Student
Kernel  : AI/ML Enthusiast
Uptime  : 4+ years coding
Shell   : Python, JavaScript, C++
Terminal: web-portfolio v1.0
`;

// Welcome message
const WELCOME_MESSAGE = `
Welcome to my interactive terminal portfolio!
Type 'help' to see available commands.
`;

// Help command output - TTY Style
const HELP_TEXT = `
Available Commands
══════════════════

Navigation & Files
  cd [path]     - Change directory
  ls [-la]      - List directory contents
  pwd           - Print working directory
  cat [file]    - View file contents
  tree          - Show directory tree

File Management
  mkdir [dir]   - Create directory
  touch [file]  - Create empty file
  rm [file]     - Remove file
  rmdir [dir]   - Remove directory
  cp [src] [dst]- Copy file
  mv [src] [dst]- Move/rename file
  nano [file]   - Text editor

System Info
  neofetch      - System information
  top           - Process viewer
  ps            - Process list
  df            - Disk usage
  free          - Memory usage
  uname [-a]    - System name
  uptime        - System uptime
  cal           - Calendar
  date          - Current date/time

Portfolio
  about         - About me
  skills        - Technical skills
  projects      - Featured projects
  education     - Education
  experience    - Experience
  contact       - Contact info
  resume        - Download CV

Utilities
  history       - Command history
  clear         - Clear screen
  echo [text]   - Print text
  env           - Environment vars
  man [cmd]     - Manual pages
  grep [pat] [f]- Search in file

Shortcuts: Tab (autocomplete), ↑↓ (history), Ctrl+L (clear)
`;

// About section - Minimalistic
const ABOUT_TEXT = `
About Me
────────
Hi! I'm Shibam Mandal, a developer and AI/ML enthusiast.

I love building things that live on the internet and exploring
artificial intelligence and machine learning.

Current Focus:
  - Deep Learning & Computer Vision
  - Full-Stack Web Development
  - Robotics & Automation
  - Open Source Contributions

Run 'skills' to see my technical expertise.
`;

// Skills section - Minimalistic
const SKILLS_TEXT = `
Technical Skills
────────────────
Programming Languages:
  Python         ████████████████████░░ 90%
  JavaScript     ██████████████████░░░░ 85%
  C/C++          ████████████████░░░░░░ 75%
  TypeScript     ██████████████░░░░░░░░ 70%

AI/ML & Data Science:
  PyTorch        ████████████████████░░ 90%
  TensorFlow     ██████████████████░░░░ 85%
  Computer Vision ███████████████████░░░ 88%
  NLP            ████████████████░░░░░░ 75%

Web Technologies:
  React/Next.js  ██████████████████░░░░ 85%
  Node.js        ████████████████░░░░░░ 75%
  HTML/CSS       ████████████████████░░ 90%

Tools:
  Git/GitHub     ████████████████████░░ 90%
  Docker         ██████████████░░░░░░░░ 70%
  Linux          ██████████████████░░░░ 85%

Run 'projects' to see these skills in action.
`;

// Projects section - Minimalistic
const PROJECTS_TEXT = `
Featured Projects
─────────────────

[1] LLM Neuro-Symbolic Planner
    Python | PyTorch | PDDL | Gazebo
    AI system that translates natural language to robot actions.

[2] Snake Detection System
    YOLOv9 | Computer Vision | Python
    Real-time camouflaged snake detection for edge deployment.

[3] Gesture Control Gaming
    OpenCV | MediaPipe | JavaScript
    Control games using hand gestures via webcam.

[4] WhatsApp Calendar Agent
    Chrome Extension | Google Calendar API
    Auto-extract meetings from WhatsApp to Google Calendar.

[5] ABU Robocon 2026
    ROS | Arduino | Computer Vision
    Autonomous robots for international competition.

More projects on GitHub.
`;

// Education section - Minimalistic
const EDUCATION_TEXT = `
Education
─────────
Bachelor of Technology (B.Tech)
Computer Science & Engineering
Currently Pursuing | Expected Graduation: 2026

Relevant Coursework:
  - Data Structures & Algorithms
  - Machine Learning & Deep Learning
  - Computer Vision & Image Processing
  - Natural Language Processing
  - Database Management Systems

Certifications:
  - Deep Learning Specialization - DeepLearning.AI
  - Machine Learning - Stanford Online
  - Full Stack Web Development

Run 'experience' to see my work experience.
`;

// Experience section - Minimalistic
const EXPERIENCE_TEXT = `
Experience & Achievements
─────────────────────────
Competitions:
  - ABU Robocon 2026 - Team Member
  - Various Hackathons - Winner/Top Finisher

Projects:
  - 10+ ML/AI Projects
  - 5+ Full-Stack Web Applications
  - Open Source Contributions

Community:
  - Technical Blog Writer
  - Open Source Contributor
  - Peer Mentor

Run 'contact' to get in touch.
`;

// Contact section - Minimalistic
const CONTACT_TEXT = `
Contact Me
──────────
Email     : shibammandalfy@gmail.com
GitHub    : github.com/mandalfy
LinkedIn  : linkedin.com/in/shibam-mandal
Twitter/X : @mandalfy
Location  : India

Feel free to reach out for collaborations or opportunities.
`;

// Easter eggs - Minimalistic
const SUDO_RESPONSE = `
[sudo] password for visitor: 
Sorry, visitor is not in the sudoers file.
This incident will be reported.

(Just kidding. Try 'sudo hire shibam')
`;

const SUDO_HIRE_RESPONSE = `
Request accepted!
Shibam Mandal has been hired!

(Just kidding... but you can make it happen.)
Contact: shibammandalfy@gmail.com
`;

// Export all ASCII art and text content
window.ASCII_ART = {
  title: ASCII_TITLE,
  portrait: ASCII_PORTRAIT,
  portraitSmall: ASCII_PORTRAIT_SMALL,
  neofetchInfo: NEOFETCH_INFO,
  welcome: WELCOME_MESSAGE,
  help: HELP_TEXT,
  about: ABOUT_TEXT,
  skills: SKILLS_TEXT,
  projects: PROJECTS_TEXT,
  education: EDUCATION_TEXT,
  experience: EXPERIENCE_TEXT,
  contact: CONTACT_TEXT,
  sudo: SUDO_RESPONSE,
  sudoHire: SUDO_HIRE_RESPONSE
};
