const core = require('@actions/core');
const github = require('@actions/github');
const semver = require('semver');

const GetVersion = require('./checkversiontag');

if (require.main === module)
{
    main();
}

module.exports = main;

function main()
{
    try
    {
        if (GetVersion.checkVersionTag(github.context))
        {
            let versionFormat = core.getInput('version-format');
            let version = GetVersion.getVersionTag(github.context, versionFormat);
            core.setOutput("release_version", version);
            core.notice(`Release version found: release_version ${version} using format: version-format ${versionFormat}`);
        }
        else
        {
            core.notice('No version tag found.');
        }
    }
    catch (error)
    {
        core.setFailed(error.message);
    }
}