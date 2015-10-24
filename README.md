# Bulbs CMS

## Development

### Fetching changes from bulbs-cms
This repo should be following the changes in [bulbs-cms/relocated-cms ](https://github.com/theonion/bulbs-cms/tree/relocated-cms) until that branch is deleted.

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

Now, to merge in changes from ```old-bulbs-cms/relocated-cms```:
```bash
$ git fetch old-bulbs-cms
$ git merge old-bulbs-cms/relocated-cms
```

Resolve any differences, then commit without a message (just use the default message provided):
```bash
$ git commit
```

Then push to master:
```bash
$ git push
```
