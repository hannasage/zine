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

Because there's easily-blurred lines between a component and template, I decided components are strictly what I can produce with `styled-components` AND anything that exists as a means of rendering dynamic content (i.e. `ZinePage`) is a `component`. Everything else is considered a `template`.

#### How templates work

Templates are specific, hence my validation system for props. Because of this, though, you can utilize `props` to make highly specific UIs without providing failsafes for possible undefined values. This simplifies writing the visual markup and keeps the `jsx` clean. Additionally, the use of `styled-components` to generate these basline elements means styling is plugged in through props! No external `css`. 

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

For example, above, I'm referencing `images[0]` without an optional chain or checking the length first. Because of how the framework validates props, I can rest assured `images[0]` won't be undefined here.

For context, here's that page configuration from the server:

```json
{
  "images": ["/images/img002.jpg"],
  "templateId": "main-frame"
}
```

#### Add a Template to `Zine`

After I've built a template, to make it accessible to the framework, I have to export all necessary members from the template module. This inclueds a `RuleFunction[]` and `TemplateGenerator` function. In `templates/index`, add it to the `TEMPLATES` map with a unique `TemplateNames` key.

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

#### configs

Home of the aforementioned `ZinePageConfig`. To adapt a new data shape from my service to this micro front-end, I can add a new configuration. I would also need to alter all type checks to consider a union type of possible responses; they currently only accept the one config.

#### errors

Custom error types allow me to package additional functionality as well as conditionally render on a generic error page. Right now, there's a `TemplateErrorBoundary` wrapping the app to catch errors.

#### extensions-hooks

React hooks have become one of my favorite things about the library. The way they, pun intended, react like a nervous system to data really entices me, and gets me excited to engineer things. While the _core_ features of my mvp include things like `usePropValidator` and `useAvailablePages`, theoretically _anything_ can be added to the bank of functionality accessible to templates by adding a new hook.

#### extensions-rules

Part of validating my props is setting my template's rules. All of my basic rules will be housed in `common-rules`, but this directory allows me to create endless custom rules for validating incoming page configurations against template requirements.
