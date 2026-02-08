/* ============================================
   Shibam Mandal - Minimal Linux Terminal Portfolio
   Theme: Flat Blue & White
   ============================================ */

const user = 'shibam';
const host = 'portfolio';
const root = '~';
let cwd = root;

// Color Configuration
const colors = {
    blue: '#33b5e5',
    white: '#ffffff',
    green: '#00ff00',
    gray: '#c0c0c0',
    dir: '#5f87ff'
};

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
    if (path === '~' || path === '/home/shibam') return fileSystem['~'];
    return null;
}

const commands = {
    help: function () {
        this.echo(`
[[b;${colors.blue};]GNU bash, version 5.0.17(1)-release (custom)]
These shell commands are defined internally. Type [[b;${colors.white};]help] to see this list.

  [[b;${colors.blue};]ls] [dir]        List directory contents
  [[b;${colors.blue};]cat] [file]      Concatenate and print files
  [[b;${colors.blue};]clear]           Clear terminal screen
  [[b;${colors.blue};]neofetch]        Display system info
  [[b;${colors.blue};]whoami]          Print effective userid
  [[b;${colors.blue};]projects]        View projects
  
  [[i;${colors.gray};]Try 'ls' to see available files.]
`);
    },

    ls: function () {
        const dir = getDir(cwd);
        if (dir) {
            const files = Object.keys(dir.files).map(f => {
                const item = dir.files[f];
                if (typeof item === 'object' && item.type === 'exec') {
                    return `[[b;${colors.green};]${f}*]`;
                }
                if (f.endsWith('.md') || f.endsWith('.txt')) {
                    return `[[b;${colors.white};]${f}]`;
                }
                return `[[b;${colors.white};]${f}]`;
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

    projects: function () {
        this.echo("Oh-oh too many to show here, visit the github: https://github.com/shibammandal");
    },

    whoami: function () {
        this.echo(user);
    },

    neofetch: function () {
        this.echo(`
[[b;${colors.blue};]       .---.      ]  [[b;${colors.blue};]${user}][[;${colors.white};]@]${host}
[[b;${colors.blue};]      /     \\     ]  ------------------
[[b;${colors.blue};]      |  O  |     ]  [[b;${colors.blue};]OS][[;${colors.white};]: Portfolio Linux x86_64]
[[b;${colors.blue};]      |  |  |     ]  [[b;${colors.blue};]Host][[;${colors.white};]: Web Browser]
[[b;${colors.blue};]   .--|  |  |--.  ]  [[b;${colors.blue};]Kernel][[;${colors.white};]: 5.10.0-portfolio]
[[b;${colors.blue};]  /   |  |  |   \\ ]  [[b;${colors.blue};]Uptime][[;${colors.white};]: 4 years]
[[b;${colors.blue};] |    |  |  |    |]  [[b;${colors.blue};]Shell][[;${colors.white};]: bash 5.0.17]
[[b;${colors.blue};] '.__.'--'--'.__.' ]  [[b;${colors.blue};]Resolution][[;${colors.white};]: 1920x1080]
                            [[b;${colors.blue};]Theme][[;${colors.white};]: Flat Blue]
                            [[b;${colors.blue};]Icons][[;${colors.white};]: Nerd Fonts]
`);
    },

    resume: function () { fileSystem['~'].files['resume'].exec(); },
    github: function () { fileSystem['~'].files['github'].exec(); },
    linkedin: function () { fileSystem['~'].files['linkedin'].exec(); }
};

const banner = `
[[b;${colors.blue};]
   _____ _     _ _                       
  / ____| |   (_) |                      
 | (___ | |__  _| |__   __ _ _ __ ___    
  \\___ \\| '_ \\| | '_ \\ / _\` | '_ \` _ \\   
  ____) | | | | | |_) | (_| | | | | | |  
 |_____/|_| |_|_|_.__/ \\__,_|_| |_| |_|  
                                         
]
Welcome to Shibam's Portfolio. 
Type [[b;${colors.white};]help] to see available commands.
Type [[b;${colors.white};]ls] to see files.
`;

jQuery(document).ready(function ($) {
    $('body').terminal(commands, {
        greetings: banner,
        prompt: `[[b;${colors.blue};]${user}@${host}][[;${colors.white};]:][[b;${colors.dir};]~][[;${colors.white};]$ ]`,
        checkArity: false,
        completion: function (string, callback) {
            const base = Object.keys(commands);
            const files = Object.keys(fileSystem['~'].files);
            callback(base.concat(files));
        }
    });
});
