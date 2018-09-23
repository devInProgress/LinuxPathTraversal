// App's Pre-start declarations
const _ = require('lodash');
const rl = require('./readline');
const controllers = require('./controllers');

// Main application
const application = () => {
  console.log('> <Starting your application...>');
  rl.write('> ');
  rl.on('line', (command) => {
    const commandContents = command.split(" ");
    console.log(commandContents);
    let operation = commandContents[1];
    switch (operation) {
      case 'mkdir':
        controllers.makeDirectory(commandContents);
        break;
      case 'rm': 
        controllers.removeDirectory(commandContents);
        break;
      case 's':
        controllers.showContents();
        break;
      case 'cd':
        controllers.changeDirectory(commandContents);
        break;
      case 'ls':
        controllers.showDirectories();
        break;
      case 'pwd':
        controllers.showPresentWorkingDirectory();
        break;
      default:
        if (commandContents[1] == 'session' && commandContents[2] == 'clear') {
          controllers.clearSession();
        } else {
          console.log('ERR: CANNOT RECOGNIZE INPUT.');
        }
        break;
    }
    rl.write('> ');
  });
}

application();