# Zine 
A micro front-end for creating onling photography zines to share.

- [Templates and components](#templates-and-components)
- [The framework directory](#the-framework-directory)
- [Zine CLI](#zine-cli)

## Overview 🔍

I'm exhausted by photography being crowded in an algorithmically-curated feed, limited by the platform's available tools, compressed, and viewed on a tiny screen. 

**It's sad.** 

Much like a physical book will always be better than a _Kindle_ 🤮, the `Zine` framework will always be inferior to printing a zine and sharing it with your friends. I fully intend to find a way to bridge the gap, and turn `Zine` into my own automated printing pipeline.

Until _that_ day, what `Zine` _does_ do is creates an easy framework to work within when designing and deploying your online zine. With the included [CLI](#setup-cli), I can extend the app endlessly by creating new templates, new extensions, and new components within my framework ✨ _a u t o m a g i c a l l y_ ✨!

>🔸**WIP** -  In forthcoming work, I will be building tools to create a zine, and deploy the updated front-end via the CLI. 

## Engineering 🧑🏻‍💻

### Stack

- Language(s): `TypeScript`, `JavaScript`
- UI: `react` via `create-react-app`
- Styling: `styled-components`
- CLI: `commander` to run `commonJS` in the terminal

### Framework element definitions

Basing the template system on `react` meant that I'd be drowning in a mix of my terms and their terms: template, component, element, block, provider, etc. I took a moment to define the elements of the `Zine` ecosystem:

- **Template** - A zine page layout that can enforce rules (checks) on props to allow highly-specific code (i.e. no need for any conditional rendering, `undefined` chceks, etc.)
- **Block Component** - Element made with `styled-components` as a building block for templates
- **Logic Component** - Element, often JSX, that the app uses to perform logic checks and conditionally render templates
- **Rule Function** - Function that enforces prop rules and throws a custom error if the props do not meet the rule's assertion
- **Feature Hook** - React hook that plugs into a template or logic component to provide new functionality

Additionally, **Errors**, a group of custom error classes, and **Configs**, where the potential of the `Zine` ecosystem _truly_ expands.


### The Zine page config

The intent is to deliver a zine over the air. The `ZinePageConfig` is the expected shape of the incoming data from my zine delivery service. **However**, this _does_ mean that if I want to extend the functionality to template out other types of pages, I could introduce a new config and a new set of logic components to handle it, and render the pages all the same - taking full advantage of the prop validation rules system, and the safe templating system.

### Safe templates and `props` validation


To subvert the need for conditional checks inside templates, leading to bloated JSX, I opted to build a safe templating system. Instead of writing a condition in my template, I write a Rule Function! This will throw a nice error for me whenever my rule is broken, with a customizable message out of the box.

When a rule is added to the exported array of rules in my template file, I can rest assured a prop is present, or contains only an acceptable value, and write your template without worry.

---

## Zine CLI ⚙️

I decided to build a cli to assist in the generation of new templates, components, and extensions. It's built using commonJS in a node environment using the `commander` npm package to run it as a cli.

To set up:

```
yarn cli:init
```

### Commands

- [`component <name> -t <type>`](#add-a-component-to-zine) - Generates a new Zine component
- [`template <name>`](#add-a-template-to-zine) - Generates a new Zine template

### Debugging

You can utilize the `-d` or `--debug` flag with any command to access debugging features. The `debug.js` module has functions that act as debug features.

### Add a Component to Zine

[Back to top](#zine-cli)

To add a component to Zine, I can use the new `zine component <name>` command. The required `-t` or `--type` flag is how I indicate whether I want a `block` or `logic` component. Names **must** follow be strictly alphabetical and extended names must be hyphenated.

```
zine component --type logic myNewThing ❌
zine component --type logic my-new-thing ✅
```

This generates a component file in the proper subdirectory with the filename structure, following the above example input, of `MyNewThing.ts` or `MyNewThing.tsx`. It'll also add the exports to `components/index.ts`

### Add a Template to Zine

[Back to top](#zine-cli)

To set up a new template, I use the new `zine template <name>` cli command. Names **must** follow be strictly alphabetical and extended names must be hyphenated. The template generator handles appending `template` to your desired template name.

```
zine template awesomeSauce ❌
zine template awesome-sauce ✅
```

This generates `/AwesomeSauceTemplate.tsx`, and exports the setup from `templates/index.ts`. Inside the new template file, there is an empty rules array, a pre-made generator, and an empty template.

### Add an Extension to Zine

[Back to top](#zine-cli)

To set up a new extension, I use the new `zine extension <name>` cli command. The required `-t` or `--type` flag is how I indicate whether I want a new `rule` or `hook`. Names **must** follow be strictly alphabetical and extended names must be hyphenated. The template generator handles name transformation, including appending the `use` prefix for hooks

```
zine extension -t hook use-new-hook ❌
zine extension -t hook new-hook ✅

zine extension -t rule newRule ❌
zine extension -t rule new-rule ✅
```

If creating a rule, it'll output the new file in `framework/extension-rules`, and likewise it'll output to `framework/extension-hooks` for hooks.
