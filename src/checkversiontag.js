const semver = require('semver');

// Check for the presence of the version tag
function checkVersionTag(ghcontext)
{
    if (ghcontext.ref && ghcontext.ref.startsWith('refs/tags/'))
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Read the version tag
function readVersionTag(ghcontext)
{
    let versionTag = ghcontext.ref.replace("refs/tags/", "");
    versionTag = versionTag.replace("v", "");
    return versionTag;
}

// Verify that the version tag is a valid semver
function verifyVersionTag(versionTag)
{
    if (semver.valid(versionTag))
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Sanitise the version tag to a valid semver
function sanitiseVersionTag(versionTag)
{
   return semver.valid(semver.coerce(versionTag)); 
}

// Get the version tag
function getVersionTag(ghcontext, versionFormat)
{
    // const { ref } = ghcontext;
    // const tagName = ref.replace('refs/tags/', '');
    // const tagVersion = tagName.replace('v', '');
    let tagVersion = readVersionTag(ghcontext);
    
    // Attempt to sanitise the version tag
    if (!verifyVersionTag(tagVersion))
    {
        tagVersion = sanitiseVersionTag(tagVersion);
    }

    let formattedVersion = "";

    switch (versionFormat)
    {
        case 'with-v':
            formattedVersion = `v${tagVersion}`;
            break;
        case 'without-v':
            formattedVersion = tagVersion;
            break;
        default:
            formattedVersion = tagVersion;
            break;
    }

    return formattedVersion;
    
}

module.exports = {
checkVersionTag,
getVersionTag,
readVersionTag,
verifyVersionTag,
sanitiseVersionTag
};