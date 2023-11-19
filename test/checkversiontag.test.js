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
    const result = CheckVersionTag.checkVersionTag(github.context);
    expect(result).toBe(true);
});

test('getVersionTag() returns the version tag from the ref', async () => {
  expect(CheckVersionTag.readVersionTag(github.context)).toBe("1.0.0");
}
);

test('verifyVersionTag() returns false when the version tag is not a valid semver', async () => {
  expect(CheckVersionTag.verifyVersionTag("a.b.c")).toBe(false);
}
);

test('sanitiseVersionTag() returns a valid semver when the version tag is not a valid semver', async () => {
  expect(CheckVersionTag.sanitiseVersionTag("1.0.0nonsense")).toBe("1.0.0");
}
);
