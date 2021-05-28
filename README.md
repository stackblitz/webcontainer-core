# WebContainer

This repository serves as a coordination point for the WebContainer working group. Chat with our team live on [Discord](https://discord.gg/stackblitz). See how you can [get involved](#getting-involved) below.

## Browser Support

|![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)<br>Chrome|![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)<br>Edge|![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/brave/brave_48x48.png)<br>Brave|![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)<br>Safari|![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)<br>Firefox|
|:---:|:---:|:---:|:---:|:---:|
|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:<br>[Config needed](browsers/brave/brave.md)|:soon:|:soon:|

## Explainer

The web has evolved to a point where it can provide most of the capabilities of an application that's natively installed. With the power of [WebAssembly](https://webassembly.org/), modern browser API's like Web/ServiceWorker and SharedArrayBuffer, and the increased access to hardware, the ingredients to unlock the Web's full potential has been created, and the line between native and web based applications has never been thinner. Solutions like [Electron](https://www.electronjs.org/) have helped fill this gap in the past by creating a sandbox for web-based applications to have access to System level resources. With standardization around interfaces like [WASI](https://wasi.dev/), we can actually have a portable runtime that matches the capabilities of native applications, while maintaining the security and consistency of the Web as we've come to expect. While WASI aims to bring a modular system interface, there still needs to be an operating system for WASI modules to interface with within browsers. WebContainer provides a small portable container and operating system designed for modern applications. The WebContainer working group aims to bridge this gap and help accelerate the world's transition to the WebAssembly based computing.

The initial focus for the applications of WebContainer will be Node.js based development toolchains. Software development toolchains tend to be slow, insecure, and inconsistent across platforms, largely due to the variance in underlying operating system and machine architectures. They also have a thorough and tangible scope of what's required to be implemented in an operating system (process management, File System access, multi-threaded computation, networking stacks, etc). By doing so, we can bring the web to an inflection point where the Web can be natively used to build the web, which is an important step in bringing the Web to even more production workflows.

While containerization solutions like Docker and VMs have improved environment portability, they still leave much to be desired in terms of speed, security, consistency, and accessibility. A full operating system is brought along (and ideally secured and hardened) with each virtual instance, and system resources are difficult to efficiently share between containers. Operating systems and browsers have a lot in common. They're both [user agents](https://en.wikipedia.org/wiki/User_agent) that run multi-tenant environments containing arbitrary (and possibly insecure) code. The browser provides a better primitive for a modern operating system, being networked, secure, and multi-tenant by default.

The advent of WebAssembly has introduced an opportunity to fix these problems in a fundamentally new way. Initiatives like WASI have paved the way for a new type of operating system interface. But to date, nearly all software development continues to be done with local binaries. Other initiatives focus on lower level APIs that are required for this change. This is important work, but the feedback loop is impaired without developers being able to 'dogfood' their normal development toolchains on top of these APIs.

# Key goals

Provide developers fast, secure and consistent development environments for real world workloads. 

- Speed
  - Seeing the results of changes to code can help drive new development decisions. By focusing on speed, we can help developers see the results they want and make new decisions faster.
- Security
  - In a world where cyber security attacks are becoming increasingly prevalent, security can't be an afterthought. Development environments must be secure by default in order to have a maintainable security posture.
- Consistency
  - "Worked on my machine" is one of the most common sayings when bugs are first discovered due to inconsistencies between environments. Containers can help abstract the complexity between different systems and environemnts.
- Development Experience
  - Frictionless
    - Adopting a new tool shouldn't mean rewriting a codebase. Great tools should be a joy to use and should minimize disruption to existing workflows.
  - Reduce Pain
    - Complex programs that require multiple processes or threads have been cumbersome to work with on the Web. The web won't remain single-threaded for long, but developers must be empowered to help create a multi-threaded Web.
- Research
  - Take the knowledge gained from this to help improve existing standards and introduce new ones where necessary.

# Key WebContainer Components

- Virtual File System with lazy-loading capabilities
- Virtual Networking
- Multi-threaded/multi-process application support
- Inter-Process communication/process signaling
- POSIX-esque shell with ability to shell out between processes

# Limitations

As with many new technologies, there are inherent technical limitations of what's possible. Over time these limitations will get worked around and smoothed out as browsers become more powerful, but some things may never be supported.

- Node.js Runtime
  - We plan on bringing support for other languages to WebContainer in the future, but the only supported runtime is currently Node.js.
- Native binaries and NPM `postinstall` scripts
  - While many `postinstall` scripts are harmless to run, most are used for setting up/compiling native binaries, and can often times be run in privileged root contexts, giving system-wide access to arbitrary code. This [vulnerability](https://www.kb.cert.org/vuls/id/319816) is [known by NPM](https://blog.npmjs.org/post/141702881055/package-install-scripts-vulnerability.html) with no plans on remediating the behavior, and goes against the secure-by-default nature of the Web.
- HTTP Networking
  - We're limited by the browser's ability to make network requests, so connecting to processes like MongoDB, Redis, PostgreSQL, etc. are not currently possible. This may change as [Chromium plans to ship Native Sockets](https://bugs.chromium.org/p/chromium/issues/detail?id=909927&can=2&q=proj-fugu&sort=pri&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified&x=m&y=releaseblock&cells=ids) in the future. For now, we're limited to HTTP connections, but we're able to support other protocols that run on HTTP such as WebSockets. HTTP requests to external services must be allowed with CORS or a CORS proxy.
- Module support
  - ESM is currently supported with the use of transpilers, but native ESM support will be coming in the future.

# Security

WebContainers are designed to be secure by default and run within the browser's security sandbox without any extensions or services needed to run. WebContainers are subject to the same cross-origin security constraints as any ordinary JavaScript code in the browser. Many development environments are run in environments with an excess amount of privilege, giving third party dependencies complete access over the operating system. By containing runtime environments within a browser context, we get an additional layer of security and process isolation when compared to running code locally on an operating system.

# Upcoming Support

During the beta, compatibility efforts will be focused on Next.js development, with additional environments soon to come. Check this repository regularly to see the latest updates and plans for WebContainer.

See [Supported Frameworks](Supported_frameworks.md) for details.

# FAQs

- Is there a developer API?
  - Not yet. Once we reach General Availability for WebContainer we plan to release an API surface.
- Is this open source?
  - Today no, but the API will be open source to developers at GA.
- What can't this run?
  - Non WebAssembly native binaries. Native binaries must be compiled as WASM, which is a more portable and secure format for native binaries.
- Is this a Docker container?
  - It's similar in the way that you can package and run Node.js code with minimal modifications, but your Browser serves as the operating system instead of a separately managed virtual machine.
- Can I connect to a server I'm running in WebContainer from an external tool (e.g. Postman) or another website?
  - WebContainer runs in the security sandbox of your browser, which means that if you call an endpoint you created from within your browser you can reach it, but from outside of the browser, it won't. We are working on a way to enable it in the future though: with a toggle switch you'll be able to proxy requests directly into your browser's running webcontainer, similar to ngrok.
- Which Node.js version can I run?
  - Current version we support is 14.6, other versions will be available as we head into General Availability.
- Is there a way to install private npm packages?
  - Not yet. While we're in beta we're not enabling private npm registry support (largely for security reasons). We're going to have full private npm registry support once we head into General Availability later this year. We do have private npm registry support available in our enterprise version of stackblitz v1 today though. 
- How can I deploy my app?
  - You can connect your StackBlitz project to a GitHub repository, and use CI workflows to configure such deployment. We are currently looking into integrations with partners such as Vercel, that will allow you to build and deploy to a hosting provider with a single click!
- Do you support yarn or only npm?
  - We are using Turbo, our own npm client. It's faster, and optimized for running in a browser, and we've designed it to be as similar in use to yarn or npm as possible. So you can run `npm i` or `yarn add` or any other command inside of a StackBlitz V2 project and its calling `turbo` under the hood.
- Why WebContainers don't run on Safari/iOS/Android?
  - We are ready, but some browsers are still missing features (e.g. SharedArrayBuffer) needed for WebContainers to run. We are super excited to be able to run StackBlitz on mobile devices!
- Can I connect to any database?
  - We're going to roll out SQLite support in the next few weeks. You'll be able to run it natively in the same WebContainer!
- Do you support vim or vim mode?
  - It's on our radar, with a prerequisite of enabling full VSC extensions support. We expect to have an announcement about this closer to GA.
- Can I change the editor keybindings?
  - Soon!
- Do you support ES modules?
  - Working on it right now!
- Will you support other languages? Ruby? Python? PHP?
  - The crazy thing is, depending on wasm support for those, it now might be possible. We're expecting some announcements about this over the coming months.
- How can I help?
  - Check out the [Getting Involved](#getting-involved) section here to see how you can get involved, or [try out WebContainers on StackBlitz.com](https://stackblitz.com/edit/next-starter)

# Getting Involved

The core working group communicates on our Discord and you can get an invite [here](https://discord.gg/stackblitz).

## Port binaries to WebAssembly
While many binaries are now available as WASMs, many still need to be converted over. These also tie into the webcontainer-registry for seamlessly swapping out legacy binaries with their corresponding WebAssembly counterparts during installs.

## Test compatibility of new toolchains
It's important for us to identify toolchains that are currently broken so our team can investigate & release runtime compatiblity improvements. Follow our [supported frameworks guide](https://github.com/stackblitz/webcontainer-core/blob/main/Supported_frameworks.md) to help test new frameworks and provide feedback.

## Enable live environments for open source projects

Integrating live WebContainer environments in OSS GitHub issue templates, documentation and learning resources is key: open source projects have instant reliable bug reproductions, newcomers to those libraries have an instant environment to learn in, and the WebContainer runtime becomes more robust against any edge cases.
