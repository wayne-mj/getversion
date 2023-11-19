// Check for the presence of the version tag
function checkVersionTag(ghcontext, ghcore)
{
    // const { ref } = ghcontext;

    // if (ref && ref.startsWith('refs/tags/')) {
    //     // This is a tag event, and you can proceed with your logic
    //     //ghcore.info('A version tag exists.');
    //     return true;
    // } else {
    //     //ghcore.info('No version tag found.');
    //     return false;
    // }
    if (ghcontext.ref && ghcontext.ref.startsWith('refs/tags/'))
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Get the version tag
function getVersionTag(ghcontext, versionFormat)
{
    const { ref } = ghcontext;
    const tagName = ref.replace('refs/tags/', '');
    const tagVersion = tagName.replace('v', '');
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
getVersionTag
};