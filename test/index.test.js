const core = require('@actions/core');
const exec = require('@actions/exec');

// Mock GitHub context
process.env.GITHUB_REF = 'refs/tags/v1.0.0';

const options = {
    withV: 'with-v',
    withoutV: 'without-v',
    default: ''

}

// Mock GitHub actions
const actions = {
    core,
    exec,
};

// Import and test your action
const yourAction = require('../src/index');

// Test with-v
test('Test action called with-v', async () => {
    // Set up a spy to check if certain functions are called
    const getInputMock  = jest.spyOn(core, 'getInput').mockReturnValue(options.withV);
    const setOutputMock = jest.spyOn(core, 'setOutput');
  
    // Run your action
    await yourAction();
  
    // Add your assertions
    expect(getInputMock ).toHaveBeenCalledWith('version-format');
    expect(setOutputMock).toHaveBeenCalledWith('release_version', 'v1.0.0');
  
    // Clean up
    getInputMock .mockRestore();
    setOutputMock.mockRestore();
});

// Test without-v
test('Test action called without-v', async () => {
    // Set up a spy to check if certain functions are called
    const getInputMock  = jest.spyOn(core, 'getInput').mockReturnValue(options.withoutV);
    const setOutputMock = jest.spyOn(core, 'setOutput');
  
    // Run your action
    await yourAction();
  
    // Add your assertions
    expect(getInputMock ).toHaveBeenCalledWith('version-format');
    expect(setOutputMock).toHaveBeenCalledWith('release_version', '1.0.0');
  
    // Clean up
    getInputMock .mockRestore();
    setOutputMock.mockRestore();
});

// Test default
test('Test action called with any options - default to without-v', async () => {
    // Set up a spy to check if certain functions are called
    const getInputMock  = jest.spyOn(core, 'getInput').mockReturnValue(options.default);
    const setOutputMock = jest.spyOn(core, 'setOutput');
  
    // Run your action
    await yourAction();
  
    // Add your assertions
    expect(getInputMock ).toHaveBeenCalledWith('version-format');
    expect(setOutputMock).toHaveBeenCalledWith('release_version', '1.0.0');
  
    // Clean up
    getInputMock .mockRestore();
    setOutputMock.mockRestore();
});