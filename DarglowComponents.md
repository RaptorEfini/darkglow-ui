# Darkglow UI Components Documentation

This document provides comprehensive information about all available components in the Darkglow UI library, their properties, and usage examples.

## Table of Contents

1. [Introduction](#introduction)
2. [Common Attributes](#common-attributes)
3. [Layout Components](#layout-components)
   - [darkglow-layout](#darkglow-layout)
   - [darkglow-container](#darkglow-container)
   - [darkglow-grid](#darkglow-grid)
4. [Input Components](#input-components)
   - [darkglow-button](#darkglow-button)
   - [darkglow-button-group](#darkglow-button-group)
5. [Display Components](#display-components)
   - [darkglow-typography](#darkglow-typography)
   - [darkglow-card](#darkglow-card)
6. [Control Components](#control-components)
   - [darkglow-knob](#darkglow-knob)
   - [darkglow-pad](#darkglow-pad)
   - [darkglow-fader](#darkglow-fader)

## Introduction

Darkglow UI is a web component library designed with a dark, glowing aesthetic suitable for music applications, dashboards, and other interactive interfaces. The components are built as standard web components and can be used in any web project.

## Common Attributes

These attributes are supported by multiple components:

| Attribute | Type | Description | Components |
|-----------|------|-------------|------------|
| `variant` | String | Visual style variant. Options: `primary`, `secondary`, `danger`, `accent`, `outlined`, `ghost` | Most components |
| `disabled` | Boolean | Disables the component | Interactive components |
| `active` | Boolean | Sets the component to an active state | Interactive components |

## Layout Components

### darkglow-layout

A page layout component that provides structure with header, main content, and footer areas.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | String | `""` | Sets the page title |

**Slots:**

| Slot Name | Description |
|-----------|-------------|
| `header` | Content for the header section |
| `default` | Main content area (no slot name needed) |
| `footer` | Content for the footer section |

**Example:**

```html
<darkglow-layout title="My Application">
  <div slot="header">
    <h1>Application Header</h1>
  </div>
  
  <darkglow-container>
    <!-- Main content goes here -->
    <h2>Main Content</h2>
    <p>This is the main content area of the application.</p>
  </darkglow-container>
  
  <div slot="footer">Footer Content</div>
</darkglow-layout>
```

### darkglow-container

A container component that provides consistent padding and styling for content sections.

**Example:**

```html
<darkglow-container>
  <h2>Section Title</h2>
  <p>Content inside a container has consistent padding and styling.</p>
</darkglow-container>
```

### darkglow-grid

A grid layout component for organizing content in rows and columns.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `columns` | String | `"1"` | Number of columns in the grid |
| `gap` | String | `"10px"` | Gap between grid items |
| `max-width` | String | `"100%"` | Maximum width of the grid |
| `variant` | String | `""` | Visual style variant |

**Example:**

```html
<darkglow-grid columns="3" gap="20px" max-width="800px" variant="primary">
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
  <div>Grid Item 4</div>
  <div>Grid Item 5</div>
  <div>Grid Item 6</div>
</darkglow-grid>
```

## Input Components

### darkglow-button

A button component with various style variants.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | String | `"primary"` | Button style variant |
| `disabled` | Boolean | `false` | Disables the button |

**Example:**

```html
<darkglow-button>Primary Button</darkglow-button>
<darkglow-button variant="secondary">Secondary Button</darkglow-button>
<darkglow-button variant="danger">Danger Button</darkglow-button>
<darkglow-button variant="ghost">Ghost Button</darkglow-button>
<darkglow-button disabled>Disabled Button</darkglow-button>
```

### darkglow-button-group

A component for grouping related buttons together.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `orientation` | String | `"horizontal"` | Layout orientation: `horizontal` or `vertical` |
| `align` | String | `"center"` | Alignment of buttons: `start`, `center`, or `end` |

**Example:**

```html
<!-- Horizontal button group (default) -->
<darkglow-button-group>
  <darkglow-button>Button 1</darkglow-button>
  <darkglow-button variant="secondary">Button 2</darkglow-button>
  <darkglow-button variant="danger">Button 3</darkglow-button>
</darkglow-button-group>

<!-- Vertical button group with left alignment -->
<darkglow-button-group orientation="vertical" align="start">
  <darkglow-button>Button 1</darkglow-button>
  <darkglow-button variant="secondary">Button 2</darkglow-button>
  <darkglow-button variant="danger">Button 3</darkglow-button>
</darkglow-button-group>
```

## Display Components

### darkglow-typography

A component for consistent text styling.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | String | `"text"` | Text type: `title`, `subtitle`, or `text` |
| `variant` | String | `""` | Color variant |
| `light-off` | Boolean | `false` | Disables glow effects and reduces opacity |

**Example:**

```html
<darkglow-typography type="title">Title Text</darkglow-typography>
<darkglow-typography type="subtitle">Subtitle Text</darkglow-typography>
<darkglow-typography type="text">Regular paragraph text</darkglow-typography>

<darkglow-typography type="title" variant="primary">Primary Title</darkglow-typography>
<darkglow-typography type="text" variant="accent">Accent Text</darkglow-typography>
<darkglow-typography type="subtitle" light-off>Disabled Subtitle</darkglow-typography>
```

### darkglow-card

A card component for grouping related content.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | String | `""` | Card style variant |
| `elevated` | Boolean | `false` | Adds stronger shadow for elevated appearance |

**Example:**

```html
<darkglow-card>
  <h3>Default Card</h3>
  <p>This is a standard card component.</p>
</darkglow-card>

<darkglow-card variant="primary">
  <h3>Primary Card</h3>
  <p>This card has a primary accent on the left border.</p>
</darkglow-card>

<darkglow-card variant="outlined" elevated>
  <h3>Elevated Outlined Card</h3>
  <p>This card has an outlined style with increased elevation.</p>
</darkglow-card>
```

## Control Components

### darkglow-knob

A rotary control component typically used for parameter adjustment.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | Number | `0` | Current value (0-100) |
| `variant` | String | `""` | Visual style variant |
| `disabled` | Boolean | `false` | Disables the knob |

**Example:**

```html
<darkglow-knob value="75">Volume</darkglow-knob>
<darkglow-knob variant="secondary" value="50">Pan</darkglow-knob>
<darkglow-knob variant="danger" value="25" disabled>Filter</darkglow-knob>
```

### darkglow-pad

A pad component typically used for triggering actions or samples.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `number` | Number | `null` | Pad number identifier |
| `variant` | String | `""` | Visual style variant |
| `size` | String | `"m"` | Size of the pad: `s` (small) or `m` (medium) |
| `active` | Boolean | `false` | Sets the pad to active state |
| `disabled` | Boolean | `false` | Disables the pad |

**Example:**

```html
<darkglow-pad number="1">Pad 1</darkglow-pad>
<darkglow-pad number="2" variant="secondary">Pad 2</darkglow-pad>
<darkglow-pad number="3" variant="danger" size="s">Small Pad</darkglow-pad>
<darkglow-pad number="4" active>Active Pad</darkglow-pad>
<darkglow-pad number="5" disabled>Disabled Pad</darkglow-pad>
```

### darkglow-fader

A slider control component typically used for volume or parameter adjustment.

**Attributes:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | Number | `0` | Current value (0-100) |
| `orientation` | String | `"vertical"` | Orientation: `vertical` or `horizontal` |
| `variant` | String | `""` | Visual style variant |
| `disabled` | Boolean | `false` | Disables the fader |

**Example:**

```html
<!-- Vertical faders -->
<darkglow-fader value="75">Volume</darkglow-fader>
<darkglow-fader variant="secondary" value="50">Pan</darkglow-fader>

<!-- Horizontal faders -->
<darkglow-fader orientation="horizontal" value="60">Track Volume</darkglow-fader>
<darkglow-fader orientation="horizontal" variant="accent" value="80" disabled>Master</darkglow-fader>
```