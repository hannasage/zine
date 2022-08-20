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

## The `Zine` component

The experience is simple: prevent infinite scroll by requiring the user to view an 
image for a configurable amount of time, **and** display the images without any
distraction.

It is the `Zine`'s job to control the page flow, "releasing" each next
page as the current page triggers it, after the configured timeout. Meanwhile, the
`ZinePage` displays the configured template and handles the timer logic.

To keep code clean and reusable, timer logic and page flow logic will be contained
within hooks, `usePageFlow` and `usePageTimer`. The page flow hook will receive an
array of page configurations, and conditionally add them to an array that's used to
render the viewable pages. Meanwhile, those page use the page timer hook to time the
user, and once they've viewed the artwork for the configured amount of time, the page
flow controller that was passed into the `ZinePage` will be called.

## Tech stack

- Components: `react` via `create-react-app`
- Styling: `styled-components`
- Fetching: `react-query` by TanStack
