/* ============================================
   Terminal Controller for CLI Portfolio
   ============================================ */

class Terminal {
    constructor() {
        this.output = document.getElementById('output');
        this.input = document.getElementById('command-input');
        this.terminalBody = document.getElementById('terminal-body');
        this.promptElement = document.querySelector('#input-line .prompt');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isTyping = false;

        // Initialize virtual filesystem
        this.fs = new VirtualFS();

        // Nano editor state
        this.nanoEditor = document.getElementById('nano-editor');
        this.nanoContent = document.getElementById('nano-content');
        this.nanoFilename = document.getElementById('nano-filename');
        this.currentNanoFile = null;

        this.init();
    }

    init() {
        // Event listeners
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.addEventListener('input', () => this.updateCursor());

        // Focus input on click anywhere in terminal
        document.getElementById('terminal').addEventListener('click', () => {
            this.input.focus();
        });

        // Nano editor keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleNanoKeys(e));

        // Update prompt
        this.updatePrompt();

        // Initial display
        this.showBanner();
    }

    // Update prompt to show current directory
    updatePrompt() {
        const cwd = this.fs.pwd();
        const displayPath = cwd === '/home/shibam' ? '~' :
            cwd.startsWith('/home/shibam/') ? '~' + cwd.slice(12) : cwd;
        this.promptElement.textContent = `shibam@portfolio:${displayPath}$ `;

        // Update terminal title
        const titleEl = document.querySelector('.terminal-title');
        if (titleEl) {
            titleEl.textContent = `shibam@portfolio: ${displayPath}`;
        }
    }

    // Get current prompt text
    getPrompt() {
        const cwd = this.fs.pwd();
        const displayPath = cwd === '/home/shibam' ? '~' :
            cwd.startsWith('/home/shibam/') ? '~' + cwd.slice(12) : cwd;
        return `<span class="prompt">shibam@portfolio:${displayPath}$ </span>`;
    }

    async showBanner() {
        // Display ASCII title banner
        await this.typeOutput(window.ASCII_ART.title, 0);
        await this.delay(300);

        // Display welcome message
        await this.typeOutput(window.ASCII_ART.welcome, 10);

        // Auto-run neofetch on load
        await this.delay(500);
        this.print(`<span class="prompt">visitor@shibam-portfolio:~$</span> neofetch`);
        await this.delay(300);
        this.runNeofetch();
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                this.executeCommand();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                e.preventDefault();
                this.autoComplete();
                break;
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.clearTerminal();
                }
                break;
            case 'c':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.input.value = '';
                    this.print(`${this.getPrompt()}^C`);
                }
                break;
        }
    }

    executeCommand() {
        const rawCommand = this.input.value.trim();
        const command = rawCommand.toLowerCase();

        // Print the command with current prompt
        this.print(`${this.getPrompt()}${this.escapeHtml(this.input.value)}`);

        // Add to history (preserve original case)
        if (rawCommand && this.commandHistory[this.commandHistory.length - 1] !== rawCommand) {
            this.commandHistory.push(rawCommand);
        }
        this.historyIndex = this.commandHistory.length;

        // Clear input
        this.input.value = '';

        // Process command
        if (command) {
            this.processCommand(rawCommand);
        }

        this.scrollToBottom();
    }

    processCommand(cmd) {
        const parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
        const command = parts[0]?.toLowerCase();
        const args = parts.slice(1).map(a => a.replace(/"/g, ''));

        // Filesystem commands
        switch (command) {
            case 'cd':
                this.cmdCd(args[0]);
                return;
            case 'ls':
                this.cmdLs(args);
                return;
            case 'pwd':
                this.print(this.fs.pwd());
                return;
            case 'cat':
                this.cmdCat(args[0]);
                return;
            case 'mkdir':
                this.cmdMkdir(args[0]);
                return;
            case 'touch':
                this.cmdTouch(args[0]);
                return;
            case 'rm':
                this.cmdRm(args[0]);
                return;
            case 'rmdir':
                this.cmdRmdir(args[0]);
                return;
            case 'cp':
                this.cmdCp(args[0], args[1]);
                return;
            case 'mv':
                this.cmdMv(args[0], args[1]);
                return;
            case 'nano':
                this.openNano(args[0]);
                return;
            case 'head':
                this.cmdHead(args[0]);
                return;
            case 'tail':
                this.cmdTail(args[0]);
                return;
            case 'echo':
                this.cmdEcho(args);
                return;
            case 'env':
                this.print(this.fs.getAllEnv());
                return;
            case 'export':
                this.cmdExport(args[0]);
                return;
        }

        // Other commands
        const commands = {
            'help': () => this.print(window.ASCII_ART.help),
            'neofetch': () => this.runNeofetch(),
            'about': () => this.print(window.ASCII_ART.about),
            'skills': () => this.print(window.ASCII_ART.skills),
            'projects': () => this.print(window.ASCII_ART.projects),
            'education': () => this.print(window.ASCII_ART.education),
            'experience': () => this.print(window.ASCII_ART.experience),
            'contact': () => this.print(window.ASCII_ART.contact),
            'resume': () => this.downloadResume(),
            'cv': () => this.downloadResume(),
            'banner': () => this.print(window.ASCII_ART.title),
            'clear': () => this.clearTerminal(),
            'date': () => this.showDate(),
            'time': () => this.showDate(),
            'whoami': () => this.print('shibam'),
            'id': () => this.print('uid=1000(shibam) gid=1000(shibam) groups=1000(shibam),27(sudo)'),
            'sudo': () => this.handleSudo(args),
            'exit': () => this.print('logout'),
            'logout': () => this.print('logout'),
            'vim': () => this.print('vim: command not found (try nano instead)'),
            'vi': () => this.print('vi: command not found (try nano instead)'),
            'emacs': () => this.print('emacs: let\'s not start that debate here...'),
            'man': () => this.cmdMan(args[0]),
            'history': () => this.showHistory(),
            'uptime': () => this.cmdUptime(),
            'uname': () => this.cmdUname(args),
            'hostname': () => this.print('shibam-portfolio'),
            'ping': () => this.runPing(args[0]),
            'curl': () => this.print('curl: Try visiting my GitHub instead -> github.com/mandalfy'),
            'wget': () => this.print('wget: Try visiting my GitHub instead -> github.com/mandalfy'),
            'git': () => this.print('git: Check out my repos at github.com/mandalfy'),
            'python': () => this.cmdPython(),
            'python3': () => this.cmdPython(),
            'node': () => this.print('Welcome to Node.js v20.0.0.\\n> console.log("Hello!")\\nHello!'),
            'cowsay': () => this.cowsay(args.join(' ') || 'Hire Shibam!'),
            'matrix': () => this.print('Wake up, Neo... The Matrix has you.'),

            'coffee': () => this.print('Brewing coffee... Done! Productivity +100%'),
            '42': () => this.print('The Answer to the Ultimate Question of Life, The Universe, and Everything.'),
            'hello': () => this.print('Hello there! Type "help" to explore!'),
            'hi': () => this.print('Hey! Welcome to my portfolio!'),
            'thanks': () => this.print('You\'re welcome! Feel free to explore more!'),
            'bye': () => this.print('Goodbye! Thanks for visiting!'),
            'theme': () => this.print('Theme: Blue & White (Minimalistic)'),
            'version': () => this.print('Portfolio OS v2026.01 - Built with vanilla JS'),
            'github': () => this.openLink('https://github.com/mandalfy'),
            'linkedin': () => this.openLink('https://linkedin.com/in/shibam-mandal'),
            'email': () => this.print('Email: shibammandalfy@gmail.com'),
            'tree': () => this.cmdTree(),
            'fortune': () => this.showFortune(),
            'cal': () => this.cmdCal(),
            'top': () => this.cmdTop(),
            'htop': () => this.cmdTop(),
            'ps': () => this.cmdPs(),
            'df': () => this.cmdDf(),
            'free': () => this.cmdFree(),
            'which': () => this.cmdWhich(args[0]),
            'type': () => this.cmdWhich(args[0]),
            'grep': () => this.cmdGrep(args),
            'find': () => this.cmdFind(args),
            'wc': () => this.cmdWc(args[0]),
            'ssh': () => this.print('ssh: Connection refused (try visiting my portfolio instead!)'),
            'su': () => this.print('su: Authentication failure'),
            'apt': () => this.print('apt: Permission denied. This is a read-only system.'),
            'apt-get': () => this.print('apt-get: Permission denied. This is a read-only system.'),
            'reboot': () => { this.print('Rebooting...'); setTimeout(() => location.reload(), 1000); },
            'shutdown': () => this.print('shutdown: Need to be root'),
            'poweroff': () => this.print('poweroff: Need to be root'),
            'screenfetch': () => this.runNeofetch(),
            'fastfetch': () => this.runNeofetch(),
        };

        if (commands[command]) {
            commands[command]();
        } else if (command) {
            this.print(`${command}: command not found`);
        }
    }

    // ============================================
    // Filesystem Commands
    // ============================================

    cmdCd(path) {
        if (!path) {
            this.fs.cd('/home/shibam');
        } else {
            const result = this.fs.cd(path);
            if (!result.success) {
                this.print(result.error);
            }
        }
        this.updatePrompt();
    }

    cmdLs(args) {
        let flags = '';
        let path = '';

        for (const arg of args) {
            if (arg.startsWith('-')) {
                flags += arg.slice(1);
            } else {
                path = arg;
            }
        }

        const result = this.fs.ls(path || '.', flags);
        if (result.success) {
            this.print(result.output || '');
        } else {
            this.print(result.error);
        }
    }

    cmdCat(path) {
        if (!path) {
            this.print('cat: missing operand');
            return;
        }
        const result = this.fs.cat(path);
        if (result.success) {
            this.print(result.output);
        } else {
            this.print(result.error);
        }
    }

    cmdMkdir(path) {
        if (!path) {
            this.print('mkdir: missing operand');
            return;
        }
        const result = this.fs.mkdir(path);
        if (!result.success) {
            this.print(result.error);
        }
    }

    cmdTouch(path) {
        if (!path) {
            this.print('touch: missing operand');
            return;
        }
        const result = this.fs.touch(path);
        if (!result.success) {
            this.print(result.error);
        }
    }

    cmdRm(path) {
        if (!path) {
            this.print('rm: missing operand');
            return;
        }
        const result = this.fs.rm(path);
        if (!result.success) {
            this.print(result.error);
        }
    }

    cmdRmdir(path) {
        if (!path) {
            this.print('rmdir: missing operand');
            return;
        }
        const result = this.fs.rmdir(path);
        if (!result.success) {
            this.print(result.error);
        }
    }

    cmdCp(src, dest) {
        if (!src || !dest) {
            this.print('cp: missing operand');
            return;
        }
        const result = this.fs.cp(src, dest);
        if (!result.success) {
            this.print(result.error);
        }
    }

    cmdMv(src, dest) {
        if (!src || !dest) {
            this.print('mv: missing operand');
            return;
        }
        const result = this.fs.mv(src, dest);
        if (!result.success) {
            this.print(result.error);
        }
    }

    cmdHead(path) {
        if (!path) {
            this.print('head: missing operand');
            return;
        }
        const result = this.fs.cat(path);
        if (result.success) {
            const lines = result.output.split('\n').slice(0, 10);
            this.print(lines.join('\n'));
        } else {
            this.print(result.error);
        }
    }

    cmdTail(path) {
        if (!path) {
            this.print('tail: missing operand');
            return;
        }
        const result = this.fs.cat(path);
        if (result.success) {
            const lines = result.output.split('\n').slice(-10);
            this.print(lines.join('\n'));
        } else {
            this.print(result.error);
        }
    }

    cmdEcho(args) {
        // Handle environment variable expansion
        const output = args.map(arg => {
            if (arg.startsWith('$')) {
                return this.fs.getEnv(arg.slice(1)) || '';
            }
            return arg;
        }).join(' ');
        this.print(output);
    }

    cmdExport(assignment) {
        if (!assignment || !assignment.includes('=')) {
            this.print(this.fs.getAllEnv());
            return;
        }
        const [name, ...valueParts] = assignment.split('=');
        this.fs.setEnv(name, valueParts.join('='));
    }

    cmdTree() {
        const buildTree = (node, prefix = '', isLast = true) => {
            let result = '';
            const entries = Object.keys(node.children || {});
            entries.forEach((name, i) => {
                const isLastEntry = i === entries.length - 1;
                const connector = isLastEntry ? '└── ' : '├── ';
                const child = node.children[name];
                result += prefix + connector + name + '\n';
                if (child.type === 'dir') {
                    const newPrefix = prefix + (isLastEntry ? '    ' : '│   ');
                    result += buildTree(child, newPrefix, isLastEntry);
                }
            });
            return result;
        };

        const cwd = this.fs.pwd();
        const node = this.fs.getNode(cwd);
        let output = cwd + '\n';
        output += buildTree(node);
        this.print(output);
    }

    // ============================================
    // System Commands
    // ============================================

    cmdUptime() {
        const start = window.portfolioStartTime || Date.now();
        const diff = Date.now() - start;
        const hours = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const now = new Date().toLocaleTimeString('en-US', { hour12: false });
        this.print(` ${now} up ${hours}:${mins.toString().padStart(2, '0')}, 1 user, load average: 0.00, 0.01, 0.05`);
    }

    cmdUname(args) {
        const flags = args.join('');
        if (flags.includes('a') || flags === '') {
            this.print('PortfolioOS shibam-portfolio 2026.01 #1 SMP JavaScript x86_64 Web/Browser');
        } else if (flags.includes('r')) {
            this.print('2026.01');
        } else if (flags.includes('s')) {
            this.print('PortfolioOS');
        }
    }

    cmdMan(cmd) {
        const manPages = {
            'ls': 'ls - list directory contents\n\nUsage: ls [-la] [path]\n  -l  long format\n  -a  show hidden files',
            'cd': 'cd - change directory\n\nUsage: cd [path]\n  cd ..  - parent directory\n  cd ~   - home directory',
            'cat': 'cat - concatenate and display files\n\nUsage: cat [file]',
            'mkdir': 'mkdir - make directories\n\nUsage: mkdir [directory]',
            'touch': 'touch - create empty file\n\nUsage: touch [file]',
            'rm': 'rm - remove files\n\nUsage: rm [file]',
            'rmdir': 'rmdir - remove empty directories\n\nUsage: rmdir [directory]',
            'nano': 'nano - simple text editor\n\nUsage: nano [file]\n  Ctrl+X - exit\n  Ctrl+O - save',
        };

        if (!cmd) {
            this.print('What manual page do you want?\nFor example, try \'man ls\'');
        } else if (manPages[cmd]) {
            this.print(manPages[cmd]);
        } else {
            this.print(`No manual entry for ${cmd}`);
        }
    }

    cmdPython() {
        this.print('Python 3.11.0 (default, Jan 2026)\n>>> print("Hello from Shibam\'s portfolio!")\nHello from Shibam\'s portfolio!\n>>> exit()');
    }

    cmdCal() {
        const now = new Date();
        const month = now.toLocaleString('en-US', { month: 'long' });
        const year = now.getFullYear();
        const firstDay = new Date(year, now.getMonth(), 1).getDay();
        const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
        const today = now.getDate();

        let cal = `     ${month} ${year}\nSu Mo Tu We Th Fr Sa\n`;
        let line = '   '.repeat(firstDay);

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = day === today ? `[${day.toString().padStart(2)}]` : day.toString().padStart(2) + ' ';
            line += dayStr;
            if ((firstDay + day) % 7 === 0) {
                cal += line.trimEnd() + '\n';
                line = '';
            }
        }
        if (line) cal += line;

        this.print(cal);
    }

    cmdTop() {
        const now = new Date().toLocaleTimeString('en-US', { hour12: false });
        const output = `top - ${now} up 0:${Math.floor((Date.now() - window.portfolioStartTime) / 60000)}:00, 1 user
Tasks:   5 total,   1 running,   4 sleeping
%Cpu(s):  2.3 us,  1.0 sy,  0.0 ni, 96.7 id
MiB Mem :  16384.0 total,  8192.0 free,  4096.0 used
MiB Swap:   2048.0 total,  2048.0 free,     0.0 used

  PID USER      PR  NI    VIRT    RES  COMMAND
    1 shibam    20   0   64000  32000  terminal.js
    2 shibam    20   0   32000  16000  filesystem.js
    3 shibam    20   0   16000   8000  ascii-art.js
    4 shibam    20   0    8000   4000  style.css
    5 shibam    20   0    4000   2000  cmatrix`;
        this.print(output);
    }

    cmdPs() {
        this.print(`  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
    2 pts/0    00:00:00 terminal.js
    3 pts/0    00:00:00 ps`);
    }

    cmdDf() {
        this.print(`Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/browser      102400   25600     76800  25% /
devtmpfs           65536       0     65536   0% /dev
tmpfs              65536    1024     64512   2% /tmp`);
    }

    cmdFree() {
        this.print(`              total        used        free      shared  buff/cache   available
Mem:       16777216     4194304    10485760      524288     2097152    12582912
Swap:       2097152           0     2097152`);
    }

    cmdWhich(cmd) {
        if (!cmd) {
            this.print('which: missing operand');
            return;
        }
        const builtins = ['cd', 'echo', 'export', 'help', 'history'];
        if (builtins.includes(cmd)) {
            this.print(`${cmd}: shell built-in command`);
        } else {
            this.print(`/usr/bin/${cmd}`);
        }
    }

    cmdGrep(args) {
        if (args.length < 2) {
            this.print('Usage: grep PATTERN FILE');
            return;
        }
        const pattern = args[0];
        const file = args[1];
        const result = this.fs.cat(file);

        if (!result.success) {
            this.print(result.error);
            return;
        }

        const lines = result.output.split('\n');
        const matches = lines.filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
        if (matches.length > 0) {
            this.print(matches.join('\n'));
        }
    }

    cmdFind(args) {
        // Simple find implementation
        this.print(`./about.txt
./skills.txt
./projects.txt
./education.txt
./experience.txt
./contact.txt
./CV.pdf
./README.md`);
    }

    cmdWc(file) {
        if (!file) {
            this.print('wc: missing operand');
            return;
        }
        const result = this.fs.cat(file);
        if (!result.success) {
            this.print(result.error);
            return;
        }
        const lines = result.output.split('\n').length;
        const words = result.output.split(/\s+/).filter(w => w).length;
        const chars = result.output.length;
        this.print(`  ${lines}   ${words}  ${chars} ${file}`);
    }

    // ============================================
    // Nano Editor
    // ============================================

    openNano(path) {
        if (!path) {
            this.print('Usage: nano [filename]');
            return;
        }

        this.currentNanoFile = this.fs.resolvePath(path);
        const node = this.fs.getNode(path);

        this.nanoFilename.textContent = path;
        this.nanoContent.value = node ? node.content || '' : '';
        this.nanoEditor.classList.remove('nano-hidden');
        this.nanoContent.focus();
    }

    closeNano(save = false) {
        if (save && this.currentNanoFile) {
            this.fs.writeFile(this.currentNanoFile, this.nanoContent.value);
            this.print(`Wrote ${this.nanoContent.value.length} bytes to ${this.currentNanoFile}`);
        }
        this.nanoEditor.classList.add('nano-hidden');
        this.currentNanoFile = null;
        this.input.focus();
    }

    handleNanoKeys(e) {
        if (this.nanoEditor.classList.contains('nano-hidden')) return;

        if (e.ctrlKey) {
            switch (e.key.toLowerCase()) {
                case 'x':
                    e.preventDefault();
                    this.closeNano(false);
                    break;
                case 'o':
                    e.preventDefault();
                    this.closeNano(true);
                    break;
            }
        }
    }

    // ============================================
    // Original Commands
    // ============================================

    runNeofetch() {
        // Minimalistic neofetch - text only, no portrait
        this.print(window.ASCII_ART.neofetchInfo);
    }

    downloadResume() {
        this.print('<span class="output-info">📄 Opening resume...</span>');

        // Create download link
        const link = document.createElement('a');
        link.href = 'CV.pdf';
        link.download = 'Shibam_Mandal_CV.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.print('<span class="output-success">✅ Resume download started!</span>');
    }

    listFiles() {
        this.print(`
drwxr-xr-x  about.txt
drwxr-xr-x  skills.txt
drwxr-xr-x  projects.txt
drwxr-xr-x  education.txt
drwxr-xr-x  experience.txt
drwxr-xr-x  contact.txt
-rw-r--r--  CV.pdf
-rw-r--r--  README.md
`);
    }

    catFile(filename) {
        if (!filename) {
            this.print('<span class="output-error">Usage: cat [filename]</span>');
            return;
        }

        const files = {
            'about.txt': window.ASCII_ART.about,
            'about': window.ASCII_ART.about,
            'skills.txt': window.ASCII_ART.skills,
            'skills': window.ASCII_ART.skills,
            'projects.txt': window.ASCII_ART.projects,
            'projects': window.ASCII_ART.projects,
            'education.txt': window.ASCII_ART.education,
            'education': window.ASCII_ART.education,
            'experience.txt': window.ASCII_ART.experience,
            'experience': window.ASCII_ART.experience,
            'contact.txt': window.ASCII_ART.contact,
            'contact': window.ASCII_ART.contact,
            'readme.md': '# Shibam Mandal\'s Portfolio\n\nWelcome! Type `help` for commands.',
            'readme': '# Shibam Mandal\'s Portfolio\n\nWelcome! Type `help` for commands.',
        };

        const content = files[filename.toLowerCase()];
        if (content) {
            this.print(content);
        } else {
            this.print(`cat: ${this.escapeHtml(filename)}: No such file or directory`);
        }
    }

    handleSudo(args) {
        if (args.length > 0 && args.join(' ').includes('hire')) {
            this.print(window.ASCII_ART.sudoHire);
        } else {
            this.print(window.ASCII_ART.sudo);
        }
    }

    showDate() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        this.print(now.toLocaleDateString('en-US', options));
    }

    showHistory() {
        if (this.commandHistory.length === 0) {
            this.print('No commands in history');
            return;
        }

        let output = '';
        this.commandHistory.forEach((cmd, i) => {
            output += `  ${i + 1}  ${cmd}\n`;
        });
        this.print(output);
    }

    getUptime() {
        const start = window.portfolioStartTime || Date.now();
        const diff = Date.now() - start;
        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / 60000) % 60;
        const hours = Math.floor(diff / 3600000);

        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    runPing(host) {
        if (!host) {
            this.print('Usage: ping [hostname]');
            return;
        }

        this.print(`PING ${this.escapeHtml(host)} (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.041 ms
--- ${this.escapeHtml(host)} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss`);
    }

    cowsay(message) {
        const msgLen = message.length;
        const border = '_'.repeat(msgLen + 2);
        const borderBottom = '-'.repeat(msgLen + 2);

        this.print(` ${border}
< ${message} >
 ${borderBottom}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`);
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
            return;
        }

        this.input.value = this.commandHistory[this.historyIndex] || '';
    }

    autoComplete() {
        const current = this.input.value.toLowerCase();
        const commands = [
            // Navigation & Files
            'cd', 'ls', 'pwd', 'cat', 'tree', 'head', 'tail',
            // File Management
            'mkdir', 'touch', 'rm', 'rmdir', 'cp', 'mv', 'nano',
            // System Info
            'neofetch', 'top', 'htop', 'ps', 'df', 'free', 'uname', 'uptime', 'cal', 'date',
            // Portfolio
            'about', 'skills', 'projects', 'education', 'experience', 'contact', 'resume',
            // Utilities
            'help', 'history', 'clear', 'echo', 'env', 'export', 'man', 'grep', 'find', 'wc', 'which',
            // Fun
            'matrix', 'cowsay', 'fortune', 'coffee',
            // Social
            'github', 'linkedin', 'email',
            // Other
            'whoami', 'id', 'hostname', 'ping', 'version', 'banner', 'reboot'
        ];

        const matches = commands.filter(cmd => cmd.startsWith(current));

        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.print(`${this.getPrompt()}${current}`);
            this.print(matches.join('  '));
        }
    }

    print(html) {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = html;
        this.output.appendChild(line);
        this.scrollToBottom();
    }

    async typeOutput(html, delay = 5) {
        if (delay === 0) {
            this.print(html);
            return;
        }

        const line = document.createElement('div');
        line.className = 'line ascii-art';
        this.output.appendChild(line);

        // Parse HTML to extract text content
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Just add the full HTML (typing effect for ASCII art looks janky)
        line.innerHTML = html;
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }

    updateCursor() {
        // Cursor position update if needed
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // New feature: Open external links
    openLink(url) {
        this.print(`Opening ${url}...`);
        window.open(url, '_blank');
    }

    // New feature: Show directory tree
    showTree() {
        this.print(`
/home/shibam/portfolio
├── about.txt
├── skills.txt
├── projects.txt
├── education.txt
├── experience.txt
├── contact.txt
├── CV.pdf
└── README.md

8 files, 0 directories`);
    }

    // New feature: Fortune cookies
    showFortune() {
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
        this.print(`\n"${fortune}"\n`);
    }

}

// Initialize terminal when DOM is loaded
window.portfolioStartTime = Date.now();

document.addEventListener('DOMContentLoaded', () => {
    window.terminal = new Terminal();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Could update portrait size here if needed
});

// Prevent default context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// ============================================
// Draggable Terminal Window
// ============================================

class DraggableTerminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.header = document.querySelector('.terminal-header');
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.offsetX = 0;
        this.offsetY = 0;

        this.init();
    }

    init() {
        // Center terminal initially
        this.centerTerminal();

        // Mouse events
        this.header.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.stopDrag());

        // Touch events for mobile
        this.header.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        document.addEventListener('touchend', () => this.stopDrag());

        // Double-click to center
        this.header.addEventListener('dblclick', () => this.centerTerminal());

        // Window resize handler
        window.addEventListener('resize', () => this.keepInBounds());
    }

    centerTerminal() {
        const rect = this.terminal.getBoundingClientRect();
        const x = (window.innerWidth - rect.width) / 2;
        const y = (window.innerHeight - rect.height) / 2;

        this.terminal.style.left = `${Math.max(0, x)}px`;
        this.terminal.style.top = `${Math.max(0, y)}px`;
    }

    startDrag(e) {
        // Don't drag if clicking on buttons
        if (e.target.classList.contains('btn-close') ||
            e.target.classList.contains('btn-minimize') ||
            e.target.classList.contains('btn-maximize')) {
            return;
        }

        this.isDragging = true;
        this.header.classList.add('dragging');

        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        const rect = this.terminal.getBoundingClientRect();
        this.offsetX = clientX - rect.left;
        this.offsetY = clientY - rect.top;

        if (e.type === 'touchstart') {
            e.preventDefault();
        }
    }

    drag(e) {
        if (!this.isDragging) return;

        e.preventDefault();

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        let newX = clientX - this.offsetX;
        let newY = clientY - this.offsetY;

        // Keep terminal within viewport bounds
        const rect = this.terminal.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        this.terminal.style.left = `${newX}px`;
        this.terminal.style.top = `${newY}px`;
    }

    stopDrag() {
        this.isDragging = false;
        this.header.classList.remove('dragging');
    }

    keepInBounds() {
        const rect = this.terminal.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        let currentX = parseInt(this.terminal.style.left) || 0;
        let currentY = parseInt(this.terminal.style.top) || 0;

        if (currentX > maxX) this.terminal.style.left = `${Math.max(0, maxX)}px`;
        if (currentY > maxY) this.terminal.style.top = `${Math.max(0, maxY)}px`;
    }
}

// Initialize draggable terminal
document.addEventListener('DOMContentLoaded', () => {
    window.draggableTerminal = new DraggableTerminal();
});
