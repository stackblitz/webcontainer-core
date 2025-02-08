import { Terminal } from 'xterm';
import { WebContainer } from '@webcontainer/api';

class TerminalManager {
  constructor(containerId) {
    this.terminal = new Terminal();
    this.container = document.getElementById(containerId);
    this.webContainer = null;
  }

  async initialize() {
    this.terminal.open(this.container);
    this.webContainer = await WebContainer.boot();
  }

  async executeCommand(command) {
    const process = await this.webContainer.spawn('jsh', {
      terminal: {
        columns: this.terminal.cols,
        rows: this.terminal.rows,
      },
    });

    process.output.pipeTo(new WritableStream({
      write: (data) => {
        this.terminal.write(data);
      },
    }));

    const writer = process.input.getWriter();
    writer.write(`${command}\n`);
    writer.close();

    await process.exit;
  }
}

export default TerminalManager;
