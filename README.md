# Bulbs CMS

## Development

### Running locally
To run this project locally, based on mocked out data:
```bash
$ npm install && bower install
$ npm run example
```

### Creating a new release
Releases are located in [bulbs-cms-2-release](https://github.com/theonion/bulbs-cms-2-release).

To create a new release there, first ensure you're on the ```master``` branch, then:
```bash
$ npm run release <versioning-type>
```
where ```versioning-type``` is one of ```major```, ```minor```, or ```patch```.
See [semver](http://semver.org/) for an explanation of what each of these types
of versionings mean.

Which will build, version up, push your changes to ```bulbs-cms-2-release```, then
create a new release tag in that repo.

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

Now, to merge in changes from ```old-bulbs-cms/relocated-cms``` into a new branch:
```bash
$ git checkout -b <YOUR_BRANCH_NAME>
$ git fetch old-bulbs-cms
$ git merge old-bulbs-cms/relocated-cms
```

Resolve any differences, then commit without a message (just use the default message provided):
```bash
$ git commit
```

Then push to your branch:
```bash
$ git push
```

Now, create a PR and get verification to merge into master.
