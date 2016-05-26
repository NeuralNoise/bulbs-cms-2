# Bulbs CMS

<!-- markdown-toc -->

- [Development](#development)
  * [Local](#local)
    + [Running](#running)
    + [Tests](#tests)
    + [Linting](#linting)
    + [Running all code checks](#running-all-code-checks)
    + [Test build](#test-build)
  * [Fetching changes from bulbs-cms](#fetching-changes-from-bulbs-cms)
  * [Creating a new release](#creating-a-new-release)
    + [Create a 'temp' release](#create-a--temp--release)

<!-- markdown-toc-stop -->

<sub>**Note**: update table of contents with `./scripts/update-readme-toc`</sub>

## Development

### Local

#### Running
To run this project locally, based on mocked out data:
```bash
$ ./scripts/dev-setup
$ ./scripts/dev-start
```

#### Tests
To run tests:
```bash
$ ./scripts/test-js
```

#### Linting
To run the linter:
```bash
$ ./scripts/lint
```

#### Running all code checks
To do all code integrity checks, as Travis and the release process will:
```bash
$ ./scripts/check-code-integrity
```

#### Test build
To check that your changes build cleanly before you do a release:
```bash
$ ./scripts/build
```

### Fetching changes from bulbs-cms
This repo should be following the changes in [bulbs-cms/relocated-cms](https://github.com/theonion/bulbs-cms/tree/relocated-cms) until that branch is deleted.

To merge in changes from that branch, first, add the original ```bulbs-cms``` repo as a fetch-only remote:
```bash
$ git remote add old-bulbs-cms git@github.com:theonion/bulbs-cms.git
$ git remote set-url --push old-bulbs-cms no_push
```

Verify that your remote urls to ```old-bulbs-cms``` are correct:
```bash
$ git remote -v
old-bulbs-cms	git@github.com:theonion/bulbs-cms.git (fetch)
old-bulbs-cms	no_push (push)
origin	git@github.com:theonion/bulbs-cms-2.git (fetch)
origin	git@github.com:theonion/bulbs-cms-2.git (push)
```

Now, to merge in changes from ```old-bulbs-cms/master``` into a new branch:
```bash
$ git checkout -b <YOUR_BRANCH_NAME>
$ git fetch old-bulbs-cms
$ git merge old-bulbs-cms/master
```

Resolve any differences, then commit without a message (just use the default message provided):
```bash
$ git commit
```

Then push to your branch:
```bash
$ git push
```

### Creating a new release
To create a new release: stop any running build scripts and ensure you're on the ```master``` branch, then:
```bash
$ ./scripts/tag-and-release <versioning-type>
```
where ```versioning-type``` is one of ```major```, ```minor```, or ```patch```. See [semver](http://semver.org/) for an explanation of what each of these types of versionings mean.

This will build, version up, and push the dist to a tag identified by the new version.

#### Create a 'temp' release

To create a tag not associated with any particular version run:
```bash
$ ./scripts/tag-and-release temp
```

This will build and push the dist to a tag identified by `temp-<last commit hash>-<current branch name>`.

Use this in situations where you need to point someone else to a distribution for some analysis or testing.
