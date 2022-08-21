# Zine
A micro front-end for viewing my photography the way I intended.

## Overview

Photography has been made more accessible than ever with the advances in mobile imaging
and the ability to share high-resolution media across the internet. However great the
tools have become, what we've made with it -- namely Instagram -- prioritize private
interests linked with application engagement, rather than preserving the integrity of
the art viewing experience. 

The `Zine` front-end serves as an interface that can be configured to present my art
with integrity and intent. The main phenomenon that made me exit the Instagram platform
(and the photography industry as a whole) is the appeal to validation: arguably the key
factor in social media's negative mental health effects. Second, I wanted to slow my
viewers down and impose upon them the burden of consuming art instead of scrolling
infinitely through it. That's when I came up with the idea to compose a zine from React
components.

## Engineering

### Stack

- Language: `TypeScript`
- UI: `react` via `create-react-app`
- Styling: `styled-components`

### Templates and components

#### Components

Because there's often blurred lines between a component, module, and page when you don't define them intentionally, I decided components are strictly what I can produce with `styled-components`. Everything else is considered a `template` or a module.

> There are no modules, by this definition, in the application as of Aug 21, 2022.

#### Templates

Templates are specific, hence my validation system for props. Because of this, though, you can utilize `components` to make highly declarative UIs.

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

For example, above, I'm strictly referencing `images[0]` and expecting it to be there. Because of how the framework validates props, you can rest assured `images[0]` won't be undefined here.

For context, here's that page configuration from the server:

```json
{
  "images": ["/images/img002.jpg"],
  "viewTimeRequirement": 1000,
  "templateId": "main-frame"
}
```

### The `/framework` directory:

#### Template.ts

This is the bread and butter of the framework. When a new `ZinePage` is created, it'll pass the page configuration into the `Template` constructor and get back the tools necessary for validation and rendering. This includes a `TemplateBundle`, which houses your validation rules and generator function.

The `Template` object allows you to validate and render using this retrieved bundle.

```typescript
const template = new Template(configFromServer);
template.validateProps() // Throws from broken rules
template.useTemplate() // Returns fully hydrated JSX.Element to render
```

#### configs

Home of the aforementioned `ZinePageConfig`. To adapt a new data shape from my service to this micro front-end, I can add a new configuration. I may also need to alter all type checks to consider a union type of possible responses; they currently only accept the one config.

#### errors

Custom error types allow me to package additional functionality as well as conditionally render on a generic error page. Right now, there's a `TemplateErrorBoundary` wrapping the app to catch errors.

#### extensions-hooks

React hooks have become one of my favorite things about the library. The way they, pun intended, react like a nervous system to data really entices me, and gets me excited to engineer things. While the _core_ features of my mvp include things like `usePropValidator` and `useAvailablePages`, theoretically _anything_ can be added to the bank of functionality accessible to templates by adding a new hook.

#### extensions-rules

Part of validating your props is setting your template's rules. All of my basic rules will be housed in `common-rules`, but this directory allows me to create endless custom rules for validating incoming page configurations against template requirements.
