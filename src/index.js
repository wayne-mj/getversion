const core = require('@actions/core');
const github = require('@actions/github');
const GetVersion = require('./checkversiontag');

try
{
    if (GetVersion.checkVersionTag(github.context, core))
    {
        let versionFormat = core.getInput('version-format');
        let version = GetVersion.getVersionTag(github.context, versionFormat);
        core.setOutput("release_version", version);
        core.notice(`Release version found: release_version ${version} using format: version-format ${versionFormat}`);
    }
}
catch (error)
{
    core.setFailed(error.message);
}