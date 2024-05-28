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
  const { title, description, installation, usage, contributing, tests, license, github, email } = answers;

  const licenseBadge = getLicenseBadge(license);
  const licenseText = getLicenseText(license);

  // Generate the content of the README file
  const readmeContent = `
# ${title}

${licenseBadge}

## Description
${description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
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

## Questions
If you have any questions, please open an issue or contact me via email at [${email}](mailto:${email}).
You can find more of my work at [${github}](https://github.com/${github}).
`;

  // Write the README file
  fs.writeFileSync('README.md', readmeContent.trim());
  console.log('README.md generated successfully!');
});
