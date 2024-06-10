import inquirer from 'inquirer';
import fs from 'fs';

// Define a function to generate the license badge and link
const getLicenseBadge = (license) => {
  const badges = {
    'MIT': `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
    'GPLv3': `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`,
    'Apache 2.0': `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
    'BSD 3-Clause': `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`,
    'None': ''
  };
  return badges[license];
};

// Define a function to generate the license section text
const getLicenseText = (license) => {
  const texts = {
    'MIT': `This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,
    'GPLv3': `This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details.`,
    'Apache 2.0': `This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.`,
    'BSD 3-Clause': `This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.`,
    'None': 'This project is not licensed.'
  };
  return texts[license];
};

// Define a function to generate tool badges
const getToolBadges = (tools) => {
  const toolBadges = {
    'Node.js': `[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)`,
    'Express': `[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)`,
    'React': `[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)`,
    'MongoDB': `[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)`,
    'Inquirer': `[![Inquirer](https://img.shields.io/badge/Inquirer-13805b?logo=inquirer&logoColor=white)](https://www.npmjs.com/package/inquirer)`
  };
  return tools.map(tool => toolBadges[tool]).join(' ');
};

// Prompt the user for input using Inquirer
inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions:'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage information:'
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide contribution guidelines:'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None']
  },
  {
    type: 'checkbox',
    name: 'tools',
    message: 'Select the tools used in your project:',
    choices: ['Node.js', 'Express', 'React', 'MongoDB', 'Inquirer']
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:'
  }
]).then((answers) => {
  const { title, description, installation, usage, contributing, tests, license, tools, github, email } = answers;

  const licenseBadge = getLicenseBadge(license);
  const licenseText = getLicenseText(license);
  const toolBadges = getToolBadges(tools);

  // Generate the content of the README file
  const readmeContent = `
# ${title}

${licenseBadge}

## Description
${description}

## Badges
${toolBadges}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Screenshots](#screenshots)
- [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## License
${licenseText}

## Contributing
${contributing}

## Tests
${tests}

## Screenshots
![Screenshot 1](./assets/Capture1.png)
![Screenshot 2](./assets/Capture2.png)
![Screenshot 3](./assets/Capture3.png)
![Screenshot 4](./assets/Capture4.png)

## Questions
If you have any questions, please open an issue or contact me via email at [${email}](mailto:${email}).
You can find more of my work at [${github}](https://github.com/${github}).
`;

  // Write the README file
  fs.writeFileSync('README.md', readmeContent.trim());
  console.log('README.md generated successfully!');
});
