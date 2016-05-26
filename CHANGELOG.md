# bulbs-cms-2 Change Log

<!-- markdown-toc -->

- [1.0.0](#100)
- [0.12.0](#0120)
  * [Fixed](#fixed)
- [0.11.0](#0110)
  * [Updated](#updated)
- [0.6.1](#061)
  * [Fixes](#fixes)
- [0.6.0](#060)
- [0.5.1](#051)
- [0.5.0](#050)
  * [Updated](#updated)
    + [`CurrentUser` Changes](#-currentuser--changes)
    + [Token Auth](#token-auth)
  * [Breaking](#breaking)

<!-- markdown-toc-stop -->

<sub>**Note**: update table of contents with `./scripts/update-changelog-toc`.</sub>

## 1.0.0

1. Merge in changes from bulbs-cms https://github.com/theonion/bulbs-cms-2/pull/25.

## 0.12.0

Autocomplete component usage changed with new `<campaign-autocomplete>`, didn't change `<content-edit-section>` to match.

### Fixed
1. `<content-edit-section>` uses new autocomplete spec

## 0.11.0

Logs a warning with a stacktrace if cms is using the default nav bar instead of a site-specific configured nav bar. Also, added a script `check-code-integrity` that can be used to run all other scripts that check the integrity of the code.

### Updated
1. Falls back to default nav bar and warns when site has not configured a `"nav"` toolbar template.

## 0.6.1

### Fixes

1. Fix unpublish button on content list page.

## 0.6.0

Version [`cms-components`](https://github.com/theonion/cms-components) to `0.5.0`.

## 0.5.1

Version [`cms-components`](https://github.com/theonion/cms-components) to `0.4.2`.

## 0.5.0

PR [#16](https://github.com/theonion/bulbs-cms-2/pull/16)

Use token auth from [cms-components](https://github.com/theonion/cms-components/pull/7) instead of `token-auth-frontend` library.

### Updated

#### `CurrentUser` Changes

References to what was previously `bulbs-cms-2`'s `CurrentUser` model have been changed to the `cms-components` `CurrentUser` model in the following:

1. `logged-in-user` directive.
1. `cms-notifications` and related libraries.
1. `nav-bar` directive now uses `cms-components` `CurrentUser` model.
1. Firebase libraries now use `cms-

#### Token Auth

1. Token auth now uses `cms-components` token auth library and directives.

### Breaking

1. Removed `coveralls` from travis, this should be added back once the build process is in better order.
1. `app/components/login/login.html` removed in favor of `cms-components` `cms-token-auth-login-form`.
1. Moved `logged-in-user` to its own module `'cms.loggedInUser'`.
1. Removed `setLogoutCallback` and `logoutCallback` from `CmsConfig`. These are now handled by `cms-components` token auth library.
1. Removed `app/shared/current-user/current-user.js` in favor of `cms-components` `CurrentUser` model.
1. All `package.json` scripts have been removed in favor of shell scripts in the `./scripts/` directory.
