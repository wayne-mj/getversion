const semver = require('semver');

// Check for the presence of the version tag
function checkVersionTag(ghcontext)
{
    if (!ghcontext?.ref)
    {
        throw new Error("Invalid Github context: missing ref");
    }
    return ghcontext.ref.startsWith("refs/tags/");
}

// Read the version tag
function readVersionTag(ghcontext)
{
    if (!ghcontext.ref)
    {
        throw new Error("Invalid Github context: missing ref");
    }
    const versionTag = ghcontext.ref
                        .replace("refs/tags/", "")
                        .replace("v","");
    return versionTag;
}

// Verify that the version tag is a valid semver
function verifyVersionTag(versionTag)
{
    return semver.valid(versionTag) !== null;
}

// Sanitise the version tag to a valid semver
function sanitiseVersionTag(versionTag)
{
   const sanitised = semver.valid(semver.coerce(versionTag));
   if (!sanitised)
   {
        throw new Error(`Unable to sanitize version tag: ${versionTag}`);
   }
   return sanitised;
}

// Get the version tag
function getVersionTag(ghcontext, versionFormat)
{
    const tagVersion = readVersionTag(ghcontext);
    
    const sanitisedVersion = verifyVersionTag(tagVersion)
        ? tagVersion
        : sanitiseVersionTag(tagVersion);

    switch(versionFormat?.toLowerCase())
    {
        case "with-v":
            return `v${sanitisedVersion}`;
        case "without-v":
            return sanitisedVersion;
        default:
            return sanitisedVersion;
    }    
}

module.exports = {
checkVersionTag,
getVersionTag,
readVersionTag,
verifyVersionTag,
sanitiseVersionTag
};