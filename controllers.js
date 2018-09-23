const _ = require('lodash');
let currentDirectories = ['/'];
let currentDirectoryPaths = {};
let pwd = '/';

//the app's functions
const makeDirectory = (commandContents) => {
  const numberOfDirectories = commandContents.length - 2;
  let counter = 0;
  while (counter < numberOfDirectories) {
    makeDirectoryHelper(commandContents[counter + 2]);
    counter++;
  }
  if (counter == numberOfDirectories) {
    console.log('SUCC: CREATED');
  }
}

const getKey = (obj) => {
  return Object.keys(obj)[0];
}

const clearSession = () => {
  currentDirectories = [];
  currentDirectoryPaths = {};
  pwd = '/';
  console.log('SUCC: CLEARED: RESET TO ROOT');
}

const getFinalDirectory = (commandContents) => {
  let pwdDuplicate = pwd, i = 0, directory = '';
  let pwdArray = currentDirectoryPaths[pwdDuplicate];
  for (i = 2; i < commandContents.length; i++) {
    if (commandContents[i] == '/') {
      continue;
    }
    const result = _.find(pwdArray, (path) => {
      return _.has(path, commandContents[i]);
    });
    if (result) {
      directory = getKey(result);
      pwdArray = result[directory];
    } else {
      break;
    }
  }
  return [i, directory];
}

const removeDirectory = (commandContents) => {
  const result = getFinalDirectory(commandContents);
  const currentDirectory = currentDirectoryPaths[pwd];
  if (result[1]) {
    _.remove(currentDirectory, dir => {
      return _.has(dir, result[1]);
    });
    console.log('SUCC: DELETED');
  } else {
    console.log('ERR: DIRECTORY DOESN\'T EXIST');
  }
}

const showDirectories = () => {
  const directories = currentDirectoryPaths[pwd];
  let dirString = '';
  _.forEach(directories, directory => {
    dirString += (getKey(directory) + ' ');
  });
  console.log('DIRS: ', dirString);
}

const showContents = () => {
  console.log('Directories: ', currentDirectories);
  console.log('\nDirectoryPaths: ', currentDirectoryPaths);
}

const initializeStartDirectory = () => {
}

const changeDirectory = (commandContents) => {
  if (commandContents[2] == '/') {
    pwd = '/';
    console.log('SUCC: REACHED');
  } else {
    const result = getFinalDirectory(commandContents);
    if (result[0] == commandContents.length) {
      console.log('SUCC: REACHED');
      pwd = result[1];
    } else {
      console.log('ERR: INVALID PATH');
    }
  }
}

const showPresentWorkingDirectory = () => {
  if (pwd != '/') {
    pwd = '/' + pwd;
  }
  console.log('PATH: ', pwd);
}

const makeDirectoryHelper = (nameOfDirectory) => {
  if (_.includes(currentDirectories, nameOfDirectory)) {
    console.log('ERR: DIRECTORY ALREADY EXISTS');
  } else {
    currentDirectories.push(nameOfDirectory);
    // currentDirectoryPaths.push({ [pwd]: { [nameOfDirectory]: 'empty subdirectory' } });
    if (!currentDirectoryPaths[pwd]) {
      currentDirectoryPaths[pwd] = [];
    }
    currentDirectoryPaths[pwd].push({ [nameOfDirectory]: [] });
  }
}

module.exports = {
  showContents,
  removeDirectory,
  makeDirectory,
  showPresentWorkingDirectory,
  changeDirectory,
  showDirectories,
  clearSession
};