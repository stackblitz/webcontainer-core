# Useful Bug Reports for WebContainer issues

In general, we always prefer a [minimal, reproducible example](https://stackoverflow.com/help/minimal-reproducible-example) when looking at a bug report. Here are a few things you can do to write the perfect example when you encounter an issue with WebContainer.


## Auto-execute Erroneous Command
We always ask you to include a link to a blitz that shows the erroneous behavior. You can make things even easier to reproduce if you configure it so the command that triggers the error is run automatically on start. You can do that by including a [custom `.stackblitzrc` configuration file](https://developer.stackblitz.com/docs/platform/project-config).


## Isolate Faulty API Calls

WebContainer does not cover the whole [Node.js API](https://nodejs.org/dist/v14.6.0/docs/api/), so most of the times the underlying issue is a single API call that is not behaving properly. You might find the issue when trying some script or workflow in your favorite framework, but ideally the reproduction example would be a simple Node.js script, with few or even no dependencies at all, that triggers the faulty API call immediately.

Remember that WebContainer allows you to debug your code! If you open the DevTools panel, all your code plus all your dependencies is there. You can also edit individual files and add `debugger` statements at will. It's almost magical!

## Read the Error

This is always good advice! But seriously, sometimes the error message will give you strong hints of what's going on. For instance, it might report that it did not find an executable file that it's usually available on local environments, or that it attempted to run a shell script with features we don't support yet.
