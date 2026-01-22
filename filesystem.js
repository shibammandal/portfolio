/* ============================================
   Virtual Filesystem for CLI Terminal
   ============================================ */

class VirtualFS {
    constructor() {
        this.currentPath = '/home/shibam';
        this.env = {
            USER: 'shibam',
            HOME: '/home/shibam',
            PWD: '/home/shibam',
            SHELL: '/bin/bash',
            TERM: 'xterm-256color',
            LANG: 'en_US.UTF-8',
            PATH: '/usr/local/bin:/usr/bin:/bin'
        };

        // Initialize filesystem structure
        this.fs = {
            '/': {
                type: 'dir',
                children: {
                    'home': {
                        type: 'dir',
                        children: {
                            'shibam': {
                                type: 'dir',
                                children: {
                                    'about.txt': { type: 'file', content: this.getAboutContent() },
                                    'skills.txt': { type: 'file', content: this.getSkillsContent() },
                                    'projects.txt': { type: 'file', content: this.getProjectsContent() },
                                    'education.txt': { type: 'file', content: this.getEducationContent() },
                                    'experience.txt': { type: 'file', content: this.getExperienceContent() },
                                    'contact.txt': { type: 'file', content: this.getContactContent() },
                                    'CV.pdf': { type: 'file', content: '[Binary file - use "resume" command to download]' },
                                    'README.md': { type: 'file', content: '# Shibam Mandal Portfolio\n\nWelcome! Type `help` for commands.' },
                                    '.bashrc': { type: 'file', content: '# ~/.bashrc\nexport PS1="\\u@\\h:\\w$ "' },
                                    '.profile': { type: 'file', content: '# ~/.profile\necho "Welcome back, shibam!"' }
                                }
                            }
                        }
                    },
                    'etc': {
                        type: 'dir',
                        children: {
                            'motd': { type: 'file', content: 'Welcome to Shibam Portfolio OS v2026\nType "help" for available commands.' },
                            'hostname': { type: 'file', content: 'shibam-portfolio' },
                            'passwd': { type: 'file', content: 'shibam:x:1000:1000:Shibam Mandal:/home/shibam:/bin/bash' },
                            'os-release': { type: 'file', content: 'NAME="Portfolio OS"\nVERSION="2026.01"\nID=portfolio\nPRETTY_NAME="Shibam Portfolio OS"' }
                        }
                    },
                    'var': {
                        type: 'dir',
                        children: {
                            'log': {
                                type: 'dir',
                                children: {
                                    'syslog': { type: 'file', content: 'Jan 19 21:00:00 portfolio kernel: System initialized\nJan 19 21:00:01 portfolio init: Starting services...' }
                                }
                            }
                        }
                    },
                    'tmp': {
                        type: 'dir',
                        children: {}
                    },
                    'usr': {
                        type: 'dir',
                        children: {
                            'bin': { type: 'dir', children: {} },
                            'share': {
                                type: 'dir',
                                children: {
                                    'man': { type: 'dir', children: {} }
                                }
                            }
                        }
                    },
                    'bin': {
                        type: 'dir',
                        children: {
                            'bash': { type: 'file', content: '[executable]' },
                            'ls': { type: 'file', content: '[executable]' },
                            'cat': { type: 'file', content: '[executable]' }
                        }
                    }
                }
            }
        };
    }

    // Content getters for portfolio files
    getAboutContent() {
        return `About Me
────────
Hi! I'm Shibam Mandal, a developer and AI/ML enthusiast.

I love building things that live on the internet and exploring
artificial intelligence and machine learning.

Current Focus:
  - Deep Learning & Computer Vision
  - Full-Stack Web Development
  - Robotics & Automation
  - Open Source Contributions`;
    }

    getSkillsContent() {
        return `Technical Skills
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

Web Technologies:
  React/Next.js  ██████████████████░░░░ 85%
  Node.js        ████████████████░░░░░░ 75%
  HTML/CSS       ████████████████████░░ 90%`;
    }

    getProjectsContent() {
        return `Featured Projects
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
    Autonomous robots for international competition.`;
    }

    getEducationContent() {
        return `Education
─────────
Bachelor of Technology (B.Tech)
Computer Science & Engineering
Currently Pursuing | Expected Graduation: 2026

Relevant Coursework:
  - Data Structures & Algorithms
  - Machine Learning & Deep Learning
  - Computer Vision & Image Processing
  - Natural Language Processing

Certifications:
  - Deep Learning Specialization - DeepLearning.AI
  - Machine Learning - Stanford Online`;
    }

    getExperienceContent() {
        return `Experience & Achievements
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
  - Peer Mentor`;
    }

    getContactContent() {
        return `Contact Me
──────────
Email     : shibammandalfy@gmail.com
GitHub    : github.com/mandalfy
LinkedIn  : linkedin.com/in/shibam-mandal
Twitter/X : @mandalfy
Location  : India

Feel free to reach out for collaborations or opportunities.`;
    }

    // Resolve path to absolute
    resolvePath(path) {
        if (!path) return this.currentPath;

        // Handle home shortcut
        if (path === '~') return '/home/shibam';
        if (path.startsWith('~/')) path = '/home/shibam' + path.slice(1);

        // Handle absolute path
        if (path.startsWith('/')) {
            return this.normalizePath(path);
        }

        // Handle relative path
        return this.normalizePath(this.currentPath + '/' + path);
    }

    // Normalize path (resolve . and ..)
    normalizePath(path) {
        const parts = path.split('/').filter(p => p && p !== '.');
        const result = [];

        for (const part of parts) {
            if (part === '..') {
                result.pop();
            } else {
                result.push(part);
            }
        }

        return '/' + result.join('/');
    }

    // Get node at path
    getNode(path) {
        const resolved = this.resolvePath(path);
        if (resolved === '/') return this.fs['/'];

        const parts = resolved.split('/').filter(p => p);
        let current = this.fs['/'];

        for (const part of parts) {
            if (!current || current.type !== 'dir' || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }

        return current;
    }

    // Get parent directory
    getParent(path) {
        const resolved = this.resolvePath(path);
        const parts = resolved.split('/').filter(p => p);
        parts.pop();
        return '/' + parts.join('/');
    }

    // Get basename
    getBasename(path) {
        const parts = path.split('/').filter(p => p);
        return parts[parts.length - 1] || '';
    }

    // Change directory
    cd(path) {
        const resolved = this.resolvePath(path);
        const node = this.getNode(resolved);

        if (!node) {
            return { success: false, error: `cd: ${path}: No such file or directory` };
        }

        if (node.type !== 'dir') {
            return { success: false, error: `cd: ${path}: Not a directory` };
        }

        this.currentPath = resolved;
        this.env.PWD = resolved;
        return { success: true };
    }

    // List directory
    ls(path, flags = '') {
        const resolved = this.resolvePath(path || '.');
        const node = this.getNode(resolved);

        if (!node) {
            return { success: false, error: `ls: ${path || '.'}: No such file or directory` };
        }

        if (node.type !== 'dir') {
            return { success: true, output: this.getBasename(resolved) };
        }

        const showHidden = flags.includes('a');
        const longFormat = flags.includes('l');

        let entries = Object.keys(node.children);
        if (!showHidden) {
            entries = entries.filter(e => !e.startsWith('.'));
        }

        if (showHidden) {
            entries = ['.', '..', ...entries];
        }

        if (longFormat) {
            const lines = entries.map(name => {
                if (name === '.' || name === '..') {
                    return `drwxr-xr-x  ${name}`;
                }
                const entry = node.children[name];
                const type = entry.type === 'dir' ? 'd' : '-';
                const perms = entry.type === 'dir' ? 'rwxr-xr-x' : 'rw-r--r--';
                const size = entry.content ? entry.content.length : 0;
                return `${type}${perms}  ${size.toString().padStart(5)}  ${name}`;
            });
            return { success: true, output: lines.join('\n') };
        }

        return { success: true, output: entries.join('  ') };
    }

    // Read file
    cat(path) {
        const node = this.getNode(path);

        if (!node) {
            return { success: false, error: `cat: ${path}: No such file or directory` };
        }

        if (node.type === 'dir') {
            return { success: false, error: `cat: ${path}: Is a directory` };
        }

        return { success: true, output: node.content };
    }

    // Create directory
    mkdir(path) {
        const resolved = this.resolvePath(path);
        const parentPath = this.getParent(resolved);
        const name = this.getBasename(resolved);
        const parent = this.getNode(parentPath);

        if (!parent) {
            return { success: false, error: `mkdir: ${path}: No such file or directory` };
        }

        if (parent.type !== 'dir') {
            return { success: false, error: `mkdir: ${path}: Not a directory` };
        }

        if (parent.children[name]) {
            return { success: false, error: `mkdir: ${path}: File exists` };
        }

        parent.children[name] = { type: 'dir', children: {} };
        return { success: true };
    }

    // Create file
    touch(path) {
        const resolved = this.resolvePath(path);
        const parentPath = this.getParent(resolved);
        const name = this.getBasename(resolved);
        const parent = this.getNode(parentPath);

        if (!parent) {
            return { success: false, error: `touch: ${path}: No such file or directory` };
        }

        if (!parent.children[name]) {
            parent.children[name] = { type: 'file', content: '' };
        }

        return { success: true };
    }

    // Remove file
    rm(path) {
        const resolved = this.resolvePath(path);
        const parentPath = this.getParent(resolved);
        const name = this.getBasename(resolved);
        const parent = this.getNode(parentPath);
        const node = this.getNode(resolved);

        if (!node) {
            return { success: false, error: `rm: ${path}: No such file or directory` };
        }

        if (node.type === 'dir') {
            return { success: false, error: `rm: ${path}: Is a directory` };
        }

        delete parent.children[name];
        return { success: true };
    }

    // Remove directory
    rmdir(path) {
        const resolved = this.resolvePath(path);
        const parentPath = this.getParent(resolved);
        const name = this.getBasename(resolved);
        const parent = this.getNode(parentPath);
        const node = this.getNode(resolved);

        if (!node) {
            return { success: false, error: `rmdir: ${path}: No such file or directory` };
        }

        if (node.type !== 'dir') {
            return { success: false, error: `rmdir: ${path}: Not a directory` };
        }

        if (Object.keys(node.children).length > 0) {
            return { success: false, error: `rmdir: ${path}: Directory not empty` };
        }

        delete parent.children[name];
        return { success: true };
    }

    // Write to file
    writeFile(path, content) {
        const resolved = this.resolvePath(path);
        const node = this.getNode(resolved);

        if (!node) {
            // Create new file
            return this.touch(path).success ?
                this.writeFile(path, content) :
                { success: false, error: `Cannot write to ${path}` };
        }

        if (node.type === 'dir') {
            return { success: false, error: `Cannot write to directory` };
        }

        node.content = content;
        return { success: true };
    }

    // Copy file
    cp(src, dest) {
        const srcNode = this.getNode(src);
        if (!srcNode) {
            return { success: false, error: `cp: ${src}: No such file or directory` };
        }

        if (srcNode.type === 'dir') {
            return { success: false, error: `cp: ${src}: Is a directory (use -r for recursive)` };
        }

        const destResolved = this.resolvePath(dest);
        const destNode = this.getNode(dest);

        if (destNode && destNode.type === 'dir') {
            // Copy into directory
            const name = this.getBasename(src);
            destNode.children[name] = { type: 'file', content: srcNode.content };
        } else {
            // Copy to new path
            const parentPath = this.getParent(destResolved);
            const name = this.getBasename(destResolved);
            const parent = this.getNode(parentPath);

            if (!parent) {
                return { success: false, error: `cp: ${dest}: No such file or directory` };
            }

            parent.children[name] = { type: 'file', content: srcNode.content };
        }

        return { success: true };
    }

    // Move/rename
    mv(src, dest) {
        const result = this.cp(src, dest);
        if (result.success) {
            this.rm(src);
        }
        return result;
    }

    // Get current path
    pwd() {
        return this.currentPath;
    }

    // Get environment variable
    getEnv(name) {
        return this.env[name] || '';
    }

    // Set environment variable
    setEnv(name, value) {
        this.env[name] = value;
    }

    // Get all env vars
    getAllEnv() {
        return Object.entries(this.env)
            .map(([k, v]) => `${k}=${v}`)
            .join('\n');
    }
}

// Export for use in terminal
window.VirtualFS = VirtualFS;
