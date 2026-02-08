/* ============================================
   Shibam Mandal - Terminal Portfolio
   Built with jQuery Terminal
   ============================================ */

// Portfolio Data
const portfolioData = {
    name: 'Shibam Mandal',
    title: 'Developer & AI/ML Enthusiast',
    email: 'shibammandal603@gmail.com',
    github: 'github.com/shibammandal',
    linkedin: 'linkedin.com/in/shibammandalfy',
    location: 'India'
};

// ASCII Art Banner (pre-generated)
const asciiBanner = `
███████╗██╗  ██╗██╗██████╗  █████╗ ███╗   ███╗
██╔════╝██║  ██║██║██╔══██╗██╔══██╗████╗ ████║
███████╗███████║██║██████╔╝███████║██╔████╔██║
╚════██║██╔══██║██║██╔══██╗██╔══██║██║╚██╔╝██║
███████║██║  ██║██║██████╔╝██║  ██║██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝
`;

// Command definitions
const commands = {
    help: function () {
        return `
[[b;#00ffff;]Available Commands]
──────────────────────────────────

[[b;#ffff00;]Portfolio]
  [[;#00ff00;]about]       - About me
  [[;#00ff00;]skills]      - Technical skills
  [[;#00ff00;]projects]    - Featured projects
  [[;#00ff00;]education]   - Education background
  [[;#00ff00;]contact]     - Contact information
  [[;#00ff00;]resume]      - Download my CV

[[b;#ffff00;]System]
  [[;#00ff00;]neofetch]    - System information
  [[;#00ff00;]help]        - Show this help message
  [[;#00ff00;]clear]       - Clear the terminal
  [[;#00ff00;]banner]      - Display the banner

[[b;#ffff00;]Social]
  [[;#00ff00;]github]      - Open GitHub profile
  [[;#00ff00;]linkedin]    - Open LinkedIn profile
  [[;#00ff00;]email]       - Show email address
`;
    },

    about: function () {
        return `
[[b;#00ffff;]About Me]
────────────────────────────────

Hi! I'm [[b;#ffffff;]Shibam Mandal], a developer and AI/ML enthusiast.

I love building things that live on the internet and exploring
artificial intelligence and machine learning.

[[b;#ffff00;]Current Focus:]
  • Deep Learning & Computer Vision
  • Full-Stack Web Development
  • Robotics & Automation
  • Open Source Contributions

Type [[;#00ff00;]'skills'] to see my technical expertise.
`;
    },

    skills: function () {
        return `
[[b;#00ffff;]Technical Skills]
────────────────────────────────

[[b;#ffff00;]Programming Languages:]
  Python         [[;#00ff00;]████████████████████░░] 90%
  JavaScript     [[;#00ff00;]██████████████████░░░░] 85%
  C/C++          [[;#00ff00;]████████████████░░░░░░] 75%
  TypeScript     [[;#00ff00;]██████████████░░░░░░░░] 70%

[[b;#ffff00;]AI/ML & Data Science:]
  PyTorch        [[;#00ff00;]████████████████████░░] 90%
  TensorFlow     [[;#00ff00;]██████████████████░░░░] 85%
  Computer Vision [[;#00ff00;]███████████████████░░░] 88%
  NLP            [[;#00ff00;]████████████████░░░░░░] 75%

[[b;#ffff00;]Web Technologies:]
  React/Next.js  [[;#00ff00;]██████████████████░░░░] 85%
  Node.js        [[;#00ff00;]████████████████░░░░░░] 75%
  HTML/CSS       [[;#00ff00;]████████████████████░░] 90%

[[b;#ffff00;]Tools:]
  Git/GitHub     [[;#00ff00;]████████████████████░░] 90%
  Docker         [[;#00ff00;]██████████████░░░░░░░░] 70%
  Linux          [[;#00ff00;]██████████████████░░░░] 85%

Type [[;#00ff00;]'projects'] to see these skills in action.
`;
    },

    projects: function () {
        return `
[[b;#00ffff;]Featured Projects]
────────────────────────────────

[[b;#ffff00;][1] LLM Neuro-Symbolic Planner]
    [[;#888888;]Python | PyTorch | PDDL | Gazebo]
    AI system that translates natural language to robot actions.

[[b;#ffff00;][2] Snake Detection System]
    [[;#888888;]YOLOv9 | Computer Vision | Python]
    Real-time camouflaged snake detection for edge deployment.

[[b;#ffff00;][3] Gesture Control Gaming]
    [[;#888888;]OpenCV | MediaPipe | JavaScript]
    Control games using hand gestures via webcam.

[[b;#ffff00;][4] WhatsApp Calendar Agent]
    [[;#888888;]Chrome Extension | Google Calendar API]
    Auto-extract meetings from WhatsApp to Google Calendar.

[[b;#ffff00;][5] ABU Robocon 2026]
    [[;#888888;]ROS | Arduino | Computer Vision]
    Autonomous robots for international competition.

More projects on [[!;;;;https://github.com/shibammandal]GitHub].
`;
    },

    education: function () {
        return `
[[b;#00ffff;]Education]
────────────────────────────────

[[b;#ffffff;]Bachelor of Technology (B.Tech)]
[[;#888888;]Computer Science & Engineering]
[[;#888888;]Currently Pursuing | Expected Graduation: 2026]

[[b;#ffff00;]Relevant Coursework:]
  • Data Structures & Algorithms
  • Machine Learning & Deep Learning
  • Computer Vision & Image Processing
  • Natural Language Processing
  • Database Management Systems

[[b;#ffff00;]Certifications:]
  • Deep Learning Specialization - DeepLearning.AI
  • Machine Learning - Stanford Online
  • Full Stack Web Development
`;
    },

    contact: function () {
        return `
[[b;#00ffff;]Contact Me]
────────────────────────────────

  [[b;#ffff00;]Email]     : [[!;;;;mailto:shibammandal603@gmail.com]${portfolioData.email}]
  [[b;#ffff00;]GitHub]    : [[!;;;;https://github.com/shibammandal]${portfolioData.github}]
  [[b;#ffff00;]LinkedIn]  : [[!;;;;https://linkedin.com/in/shibammandalfy]${portfolioData.linkedin}]
  [[b;#ffff00;]Location]  : ${portfolioData.location}

Feel free to reach out for collaborations or opportunities!
`;
    },

    neofetch: function () {
        return `
[[b;#00ffff;]shibam][[;#ffffff;]@][[b;#ff00ff;]portfolio]
──────────────────────────────
[[b;#00ffff;]OS]        [[;#ffffff;]: Portfolio OS 2026.02]
[[b;#00ffff;]Host]      [[;#ffffff;]: B.Tech CSE Student]
[[b;#00ffff;]Kernel]    [[;#ffffff;]: AI/ML Enthusiast v3.0]
[[b;#00ffff;]Uptime]    [[;#ffffff;]: 4+ years coding]
[[b;#00ffff;]Packages]  [[;#ffffff;]: Python, JavaScript, C++, PyTorch]
[[b;#00ffff;]Shell]     [[;#ffffff;]: jquery-terminal 2.37.1]
[[b;#00ffff;]Terminal]  [[;#ffffff;]: Web Browser]
[[b;#00ffff;]CPU]       [[;#ffffff;]: JavaScript Engine]
[[b;#00ffff;]Memory]    [[;#ffffff;]: Creative × Infinite]

[[;#000000;#000000;]███][[;#ff0000;#ff0000;]███][[;#00ff00;#00ff00;]███][[;#ffff00;#ffff00;]███][[;#0000ff;#0000ff;]███][[;#ff00ff;#ff00ff;]███][[;#00ffff;#00ffff;]███][[;#ffffff;#ffffff;]███]
`;
    },

    resume: function () {
        this.echo('[[;#00ffff;]📄 Opening resume...]');
        window.open('CV.pdf', '_blank');
        return '[[;#00ff00;]✅ Resume opened in new tab!]';
    },

    github: function () {
        window.open('https://github.com/shibammandal', '_blank');
        return '[[;#00ff00;]Opening GitHub profile...]';
    },

    linkedin: function () {
        window.open('https://linkedin.com/in/shibammandalfy', '_blank');
        return '[[;#00ff00;]Opening LinkedIn profile...]';
    },

    email: function () {
        return `[[;#00ffff;]Email:] ${portfolioData.email}`;
    },

    banner: function () {
        return `[[b;#00ff00;]${asciiBanner}]`;
    },

    whoami: function () {
        return 'shibam';
    },

    date: function () {
        return new Date().toString();
    },

    echo: function (...args) {
        return args.join(' ');
    },

    // Easter eggs
    sudo: function (...args) {
        if (args.join(' ').toLowerCase().includes('hire')) {
            return `
[[b;#00ff00;]Request accepted!]
[[;#ffffff;]Shibam Mandal has been hired!]

[[;#888888;](Just kidding... but you can make it happen.)]
[[;#00ffff;]Contact:] ${portfolioData.email}
`;
        }
        return `
[[;#ff5555;][sudo] password for visitor:]
[[;#ff5555;]Sorry, visitor is not in the sudoers file.]
[[;#888888;]This incident will be reported.]

[[;#888888;](Just kidding. Try 'sudo hire shibam')]
`;
    },

    coffee: function () {
        return '[[;#ffff00;]☕ Brewing coffee... Done! Productivity +100%]';
    },

    matrix: function () {
        return '[[;#00ff00;]Wake up, Neo... The Matrix has you.]';
    },

    fortune: function () {
        const fortunes = [
            "A journey of a thousand miles begins with a single commit.",
            "Good code is its own best documentation.",
            "The best time to plant a tree was 20 years ago. The second best time is now.",
            "First, solve the problem. Then, write the code.",
            "Make it work, make it right, make it fast.",
            "Debugging is twice as hard as writing code.",
            "The only way to go fast is to go well.",
            "Code is like humor. When you have to explain it, it's bad.",
            "Simplicity is the soul of efficiency.",
            "Talk is cheap. Show me the code."
        ];
        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        return `\n[[;#ffff00;]"${fortune}"]\n`;
    }
};

// Welcome message
const welcomeMessage = `
[[b;#00ff00;]${asciiBanner}]

[[;#888888;]Welcome to my interactive terminal portfolio!]
[[;#888888;]Type] [[;#00ff00;]'help'] [[;#888888;]to see available commands.]
`;

// Initialize jQuery Terminal
$(function () {
    $('body').terminal(commands, {
        greetings: welcomeMessage,
        name: 'shibam_portfolio',
        prompt: '[[b;#00ff00;]visitor@shibam-portfolio][[;#ffffff;]:][[b;#00ffff;]~][[;#ffffff;]$ ]',
        checkArity: false,
        completion: Object.keys(commands),
        historySize: 100,
        outputLimit: 1000,
        onBlur: function () {
            return false; // Keep focus on terminal
        },
        execHash: true
    });
});
