/* ============================================
   Shibam Mandal - Minimal Linux Terminal Portfolio
   Theme: Flat Blue
   ============================================ */

const user = 'shibam';
const host = 'portfolio';
const root = '~';
let cwd = root;

// Virtual File System
const fileSystem = {
    '~': {
        type: 'dir',
        files: {
            'about.txt': `Name: Shibam Mandal
Role: Developer & AI/ML Enthusiast
Focus: Deep Learning, Computer Vision, Full-Stack Web Dev

I build things that live on the internet and explore AI/ML.
`,
            'skills.md': `# Technical Skills

## Languages
- Python (90%)
- JavaScript (85%)
- C/C++ (75%)

## AI/ML
- PyTorch
- TensorFlow
- Computer Vision (OpenCV)
- NLP

## Web
- React / Next.js
- Node.js
- HTML/CSS
`,
            'education.txt': `# Education

B.Tech in Computer Science & Engineering
Expected Graduation: 2026

Coursework:
- Data Structures & Algorithms
- Machine Learning
- Operating Systems
`,
            'contact.txt': `Email:    shibammandalfy@gmail.com
GitHub:   https://github.com/shibammandal
LinkedIn: https://linkedin.com/in/shibammandalfy
Location: India
`,
            'projects.txt': `Oh-oh too many to show here, visit the github: https://github.com/shibammandal`,
            'resume': { type: 'exec', exec: function () { window.open('CV.pdf', '_blank'); return 'Opening CV...'; } },
            'github': { type: 'exec', exec: function () { window.open('https://github.com/shibammandal', '_blank'); return 'Opening GitHub...'; } },
            'linkedin': { type: 'exec', exec: function () { window.open('https://linkedin.com/in/shibammandalfy', '_blank'); return 'Opening LinkedIn...'; } }
        }
    }
};

function getDir(path) {
    // Simple implementation for single level depth as we only have ~
    if (path === '~' || path === '/home/shibam') return fileSystem['~'];
    return null;
}

const commands = {
    help: function () {
        this.echo(`
[[b;#33b5e5;]GNU bash, version 5.0.17(1)-release (custom)]
These shell commands are defined internally. Type [[b;#ffffff;]help] to see this list.

  [[b;#33b5e5;]ls] [dir]        List directory contents
  [[b;#33b5e5;]cat] [file]      Concatenate and print files
  [[b;#33b5e5;]clear]           Clear terminal screen
  [[b;#33b5e5;]neofetch]        Display system info
  [[b;#33b5e5;]whoami]          Print effective userid
  [[b;#33b5e5;]projects]        View projects
  
  [[i;#888888;]Try 'ls' to see available files.]
`);
    },

    ls: function () {
        const dir = getDir(cwd);
        if (dir) {
            const files = Object.keys(dir.files).map(f => {
                const item = dir.files[f];
                if (typeof item === 'object' && item.type === 'exec') {
                    return `[[b;#00ff00;]${f}*]`;
                }
                return f;
            });
            this.echo(files.join('  '));
        }
    },

    cat: function (filename) {
        const dir = getDir(cwd);
        if (dir && dir.files[filename]) {
            const content = dir.files[filename];
            if (typeof content === 'string') {
                this.echo(content);
            } else {
                this.error(`cat: ${filename}: Is a directory or executable`);
            }
        } else {
            this.error(`cat: ${filename}: No such file or directory`);
        }
    },

    // Explicit project command as requested shortcut
    projects: function () {
        this.echo("Oh-oh too many to show here, visit the github: https://github.com/shibammandal");
    },

    whoami: function () {
        this.echo(user);
    },

    neofetch: function () {
        this.echo(`
[[b;#33b5e5;]       .---.      ]  [[b;#33b5e5;]${user}][[;#ffffff;]@]${host}
[[b;#33b5e5;]      /     \\     ]  ------------------
[[b;#33b5e5;]      |  O  |     ]  [[b;#33b5e5;]OS][[;#ffffff;]: Portfolio Linux x86_64]
[[b;#33b5e5;]      |  |  |     ]  [[b;#33b5e5;]Host][[;#ffffff;]: Web Browser]
[[b;#33b5e5;]   .--|  |  |--.  ]  [[b;#33b5e5;]Kernel][[;#ffffff;]: 5.10.0-portfolio]
[[b;#33b5e5;]  /   |  |  |   \\ ]  [[b;#33b5e5;]Uptime][[;#ffffff;]: 4 years]
[[b;#33b5e5;] |    |  |  |    |]  [[b;#33b5e5;]Shell][[;#ffffff;]: bash 5.0.17]
[[b;#33b5e5;] '.__.'--'--'.__.' ]  [[b;#33b5e5;]Resolution][[;#ffffff;]: 1920x1080]
                            [[b;#33b5e5;]Theme][[;#ffffff;]: Flat Blue]
                            [[b;#33b5e5;]Icons][[;#ffffff;]: Nerd Fonts]
`);
    },

    // Executables
    resume: function () { fileSystem['~'].files['resume'].exec(); },
    github: function () { fileSystem['~'].files['github'].exec(); },
    linkedin: function () { fileSystem['~'].files['linkedin'].exec(); }
};

const banner = `
[[b;#33b5e5;]
   _____ _     _ _                       
  / ____| |   (_) |                      
 | (___ | |__  _| |__   __ _ _ __ ___    
  \\___ \\| '_ \\| | '_ \\ / _\` | '_ \` _ \\   
  ____) | | | | | |_) | (_| | | | | | |  
 |_____/|_| |_|_|_.__/ \\__,_|_| |_| |_|  
                                         
]
Welcome to Shibam's Portfolio. 
Type [[b;#ffffff;]help] to see available commands.
Type [[b;#ffffff;]ls] to see files.
`;

jQuery(document).ready(function ($) {
    $('body').terminal(commands, {
        greetings: banner,
        prompt: `[[b;#33b5e5;]${user}@${host}][[;#ffffff;]:][[b;#5f87ff;]~][[;#ffffff;]$ ]`,
        checkArity: false,
        completion: function (string, callback) {
            const base = Object.keys(commands);
            const files = Object.keys(fileSystem['~'].files);
            callback(base.concat(files));
        }
    });
});
