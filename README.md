# Zine
A micro front-end for viewing my photography the way I intended.

- [Templates and components](#templates-and-components)
- [The framework directory](#the-framework-directory)

## Overview

Photography has been made more accessible than ever with the advances in mobile imaging
and the ability to share high-resolution media across the internet. However great the
tools have become, what we've made with it -- namely Instagram -- prioritizes private
interests linked with application engagement and advertising, rather than preserving the integrity of
the art viewing experience. 

The `Zine` front-end serves as an interface that can be configured to present my art
with integrity and intent. The main phenomenon that made me exit the Instagram platform
(and the photography industry as a whole) is the appeal to validation: arguably the key
factor in social media's negative mental health effects. I wanted to slow my
viewers down and impose upon them the burden of consuming art instead of scrolling
infinitely through it. That's when I came up with the idea to compose a zine from React
components that require a timeout before revealing the next image.

Since I eventually want to serve zines from an external service, I needed to build this as a
framework, not just a front-end application. Below are the details of how I created a page templating
system that validates props from the server and renders hydrated components. 

## Engineering

### Stack

- Language: `TypeScript`
- UI: `react` via `create-react-app`
- Styling: `styled-components`

---

### Templates and components

#### The distinction

Because there's easily-blurred lines between a component and template, I decided anything I can produce with `styled-components` (blocks) AND anything that adds functionality but does not directly render JSX (logical) is a `component`. 

A `template` utilizes block components to build interfaces. They can take advantage of extensions of functionality through hooks, but are primarily composed of JSX.

#### How templates work

Templates are declared without any null checks, hence my validation system for props. This simplifies writing the visual markup and keeps the `jsx` clean. Instead of relying on conditional render logic, I've outsourced the validation of props to the `Template` object. Each template can define a set of rules to check props against. This lets me build templates free of any conditional renders.

```typescript jsx
/** TEMPLATE: A single image in a frame. */
export const SingleFrame: React.FC<BasicTemplateProps> = (props) => {
  return (
    <Container>
      <Frame width={90} height={90}>
        <Image src={props.images[0]} />
      </Frame>
    </Container>
  );
};
```

For example, above, I'm referencing `images[0]` without an optional chain or checking the length first. Because of how the framework validates props, I can rest assured `images[0]` won't be undefined here. No back-up UI needed.

For context, here's that page configuration from the server:

```json
{
  "images": ["/images/img002.jpg"],
  "templateId": "main-frame"
}
```

#### Add a Template to `Zine`

To accompany a template file, there's a setup file. This will include my template rules, such as `maxImagesLengthCheck(1)`, which tells the templating system that this template only takes one image. It'll also include a generator function which stands to take in the page config, and pass the props into the component, returning the `JSX.Element`, fully hydrated.

```typescript jsx
export const mainFrameGenerator = (props: ZinePageConfig) => (
  <MainFrameTemplate
    images={props.images}
    viewTimeRequirement={props.viewTimeRequirement}
  />
);
```

Once your rules array and generator function are exported from the file, I'll head over into `templates/index.ts` and add my setup to the `TEMPLATES` export. This exported map uses a key from the `TemplateNames` enumerated class and matches it to a setup. A `Template` object, when initialized, will seek out the right template setup, and throw if it cannot find it in this map.

```typescript
const myTemplateSetup: TemplateSetup = { 
    rules: myTemplateRules, 
    generator: myTemplateGenerator 
}

TEMPLATES.set(TemplateNames.MY_TEMPLATE, myTemplateSetup);
```

---

### The `/framework` directory:

#### Template.ts

This is the bread and butter of the framework: when I render a new page with a config, the config is fed into `Template.constructor` and it triages the process of validating and retrieving my bundled template, and gives me back two methods that help me validate, hydrate, and render my template.

```typescript
const template = new Template(configFromServer);
template.validateProps() // Throws from broken rules
template.hydrate() // Returns fully hydrated JSX.Element to render
```

These methods are used within `react` components and hooks to render the templates, rather than rendering them directly in JSX. This allows me to extract things like template rules and form more robust systems around reporting errors with page configurations. 

The goal is to not have to ever hard-code a zine: just load the page and whatever zine I've released via my zine delivery service will populate on the page. 

Furthermore, this mimics the artistic process I follow. Template design here is akin to page layout design in something like Adobe inDesign. Letting me focus solely on the design and **not** the logic when working within my `zine` repository is a major win.

#### configs (and evolving Zine)

While `Zine` is built to be a dynamic templating system for online photography zines, it theoretically can be adapted to take many types of configs. Using classes for server-returned props lets me check `instanceof` and conditionally render different experiences. The main issue with this is that templates would become mixed, and it'd be unclear which template was for what experience. To combat this, what I might consider doing is packaging the framework and using it across other micro front-ends.

#### errors

Custom errors were a must when considering my developer experience. I'm not going to be adding or removing data in _this_ app once the delivery service is stood up, so I need my console and my UI to _really_ give me the details of these errors. Right now, there's no custom error UI, but my console messaging is top-notch. The `react` error boundary is a "catch-all" `catch` block for failures within the applications. Since this is a micro front-end, there's little to no need to use this boundary outside of `App.tsx`

#### extensions-hooks

Hook design is something I'm still working out. Most features thus far have taken the shape of non-returning hooks, or "effects". This seems to be the best way to hook `react` into my `Template` framework. So far, I've added two app-level hooks for validation of props, which is non-returning and throws on invalid props, and a page timer that uses a timeout to trigger an action after a given amount of time.

Returning hooks, hooks that require being stored as variables, aren't necessarily out of the question, but I haven't found a use for them _yet_ beyond delivering my context (`usePageContext`). As the UI evolves, I think more UI controller-based extensions could show up.

#### extensions-rules

Rules are the _most_ fun part of this system, to me. These replace the need for conditionals inside templates, but best of all, they're _suuuuper_ customizable. I could run _deep_ checks on data before rendering if I wanted. I could validate props against network data, something that'd be super messy when built into a `react` component with an effect hook.

Future considerations for rules are always flying through my head. One formidable challenge would be measuring whether an image is portrait or landscape and defining a rule around that.
