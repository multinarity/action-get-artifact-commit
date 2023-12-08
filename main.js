const core = require('@actions/core')

async function main() {
    try {
        const artifacts = JSON.parse(core.getInput("artifacts", { required: true }))

        if (artifacts.length != 1) {
            throw new Error("Artifact count must be 1, got " + artifacts.length)
        }

        core.info(JSON.stringify(artifacts));
        const commit_hash = artifacts[0].workflow_run.head_sha
        core.info("Found commit hash: " + commit_hash);
        core.setOutput("commit_hash", commit_hash)
    } catch (error) {
        core.error("get-artifact-commit action failed: " + error.message)
        core.setFailed(error.message)
    }
}

main()