/** @type {import('ts-jest').JestConfigWithTsJest} */
// export const preset = 'ts-jest';
export default {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  preset: 'ts-jest'
}



// export const transform = {};


// testEnvironment: 'node',


// module.exports = {
//   preset: 'ts-jest',
//   transform: {},
// };