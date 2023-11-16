// test/action.test.js

const core = require('@actions/core');
const exec = require('@actions/exec');
const CheckVersionTag = require('../src/checkversiontag');

// Mock GitHub context
const github = {
  context: {
    ref: 'refs/tags/v1.0.0', // Simulate the version tag
  },
};

// Mock GitHub actions
const actions = {
  core,
  exec,
};

// Mock options
const options = {
    withV: 'with-v',
    withoutV: 'without-v',
    default: ''
}

// Test the checkVersionTag function
test('Test checkVersionTag', async () => {
    const result = CheckVersionTag.checkVersionTag(github.context, actions.core);
    expect(result).toBe(true);
});

// Test the getVersionTag function and see if it returns the correct version
// depending the version format
test('Test getVersionTag with-v', async () => {
    const versionWithV = CheckVersionTag.getVersionTag(github.context, options.withV);
    expect(versionWithV).toBe('v1.0.0');
});

test('Test getVersionTag without-v', async () => {
    const versionWithoutV = CheckVersionTag.getVersionTag(github.context, options.withoutV);
    expect(versionWithoutV).toBe('1.0.0');
});
test('Test getVersionTag default', async () => {
    const versionDefault = CheckVersionTag.getVersionTag(github.context, options.default);
    expect(versionDefault).toBe('1.0.0');
});
