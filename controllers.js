const _ = require('lodash');
let currentDirectories = ['/'];
let currentDirectoryPaths = {};
let pwd = '/';

//the app's functions
// function to make a directory
const makeDirectory = (commandContents) => {
  const numberOfDirectories = commandContents.length - 2;
  let counter = 0, result = 0;
  while (counter < numberOfDirectories) {
    result = makeDirectoryHelper(commandContents[counter + 2]);
    counter++;
  }
  if (counter == numberOfDirectories && result != -1) {
    console.log('SUCC: CREATED');
  }
}

const getKey = (obj) => {
  return Object.keys(obj)[0];
}

//function to clear session
const clearSession = () => {
  currentDirectories = [];
  currentDirectoryPaths = {};
  pwd = '/';
  console.log('SUCC: CLEARED: RESET TO ROOT');
}

//function to get the directory
const getFinalDirectory = (commandContents) => {
  let pwdDuplicate = pwd, i = 0, directory = '';
  let pwdArray = currentDirectoryPaths[pwdDuplicate];
  let dirs = commandContents[2].split('/');
  for (i = 0; i < dirs.length; i++) {
    if (dirs[i] == '') {
      continue;
    }
    const result = _.find(pwdArray, (path) => {
      return _.has(path, dirs[i]);
    });
    if (result) {
      directory = getKey(result);
      pwdArray = result[directory];
    } else {
      break;
    }
  }
  return [i, dirs, directory];
}
//function to remove a directory
const removeDirectory = (commandContents) => {
  const result = getFinalDirectory(commandContents);
  const currentDirectory = currentDirectoryPaths[pwd];
  if (result[2]) {
    _.remove(currentDirectory, dir => {
      return _.has(dir, result[2]);
    });
    console.log('SUCC: DELETED');
  } else {
    console.log('ERR: DIRECTORY DOESN\'T EXIST');
  }
}
//function to implement ls
const showDirectories = () => {
  const directories = currentDirectoryPaths[pwd];
  let dirString = '';
  _.forEach(directories, directory => {
    dirString += (getKey(directory) + ' ');
  });
  console.log('DIRS: ', dirString);
}
//function to implement cd
const changeDirectory = (commandContents) => {
  if (commandContents[2] == '/') {
    pwd = '/';
    console.log('SUCC: REACHED');
  } else {
    const result = getFinalDirectory(commandContents);
    if (result[0] == result[1].length) {
      console.log('SUCC: REACHED');
      pwd = result[2];
    } else {
      console.log('ERR: INVALID PATH');
    }
  }
}
//function to implement pwd
const showPresentWorkingDirectory = () => {
  if (pwd != '/') {
    pwd = '/' + pwd;
  }
  console.log('PATH: ', pwd);
}

const makeDirectoryHelper = (nameOfDirectory) => {
  if (_.includes(currentDirectories, nameOfDirectory)) {
    console.log('ERR: DIRECTORY ALREADY EXISTS');
    return -1;
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
  removeDirectory,
  makeDirectory,
  showPresentWorkingDirectory,
  changeDirectory,
  showDirectories,
  clearSession
};