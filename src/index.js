import AIAgent from './aiAgent';
import TerminalManager from './terminal';

const aiAgent = new AIAgent();
const terminalManager = new TerminalManager('terminal-container');

async function initialize() {
  await terminalManager.initialize();

  // Example usage of AI agent and terminal manager
  const codeSuggestion = aiAgent.provideCodeSuggestions('const x = 10;');
  console.log(codeSuggestion);

  const projectSetup = aiAgent.setupProject({ name: 'MyProject', language: 'JavaScript' });
  console.log(projectSetup);

  const tutorial = aiAgent.provideTutorial('JavaScript', 'React');
  console.log(tutorial);

  await terminalManager.executeCommand('echo Hello, World!');
}

initialize();
