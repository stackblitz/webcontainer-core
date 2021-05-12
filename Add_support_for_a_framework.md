## Add support for a framework

On the [Supported frameworks](Supported_frameworks.md) page you can find all officially supported frameworks. But, since our technology allows you to run node programs in the secure context of your browser, it could be that the framework you wanna use 'just works'. The following list has a number of steps you can try to see if this is the case.

1. Go to <a href="https://stackblitz.com/fork/node" target="_blank">our node starter</a>
2. Add a dependency to the framework you wanna try out by using `npm i ${framework}`
3. Add the necessary files to the stackblitz example.
4. See if it works!
  
If it works, great! Feel free to open a PR on the [Supported frameworks](Supported_frameworks.md) page and add the give us the url you used to try it. We will verify if everything works after that.

If it doesn't work, you can file an issue by clicking the button in the editor or by creating an issue on this repo and we will try and figure out what went wrong.

In both cases: Thanks for helping us!
