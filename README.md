# Using Darkglow UI Components in Another Project

This guide explains how to use the Darkglow UI components in another project after copying the `darkglow` folder from the `dist` directory.

## Step 1: Copy the Darkglow Folder

Copy the entire `darkglow` folder from the `dist` directory of this project to your target project. This folder contains:

- `darkglow.js` - ES module format
- `darkglow.umd.cjs` - UMD format for CommonJS environments
- `style.css` - CSS styles for the components
- `fonts` directory - Font files used by the components

## Step 2: Import and Register the Components

### Using ES Modules (Modern Browsers)

Create a JavaScript file (e.g., `init-darkglow.js`) in your project and add the following code:

```javascript
// Import the components from the darkglow.js file
import { registerComponents } from './path/to/darkglow/darkglow.js';

// Register all components with the default 'darkglow' prefix
registerComponents();

// Alternatively, you can use a custom prefix
// registerComponents('custom');
```

Then import this file in your HTML:

```html
<script type="module" src="./path/to/init-darkglow.js"></script>
```

### Using UMD (Older Browsers or Node.js)

For older browsers or Node.js environments, use the UMD version:

```html
<script src="./path/to/darkglow/darkglow.umd.cjs"></script>
<script>
  // The components are available under the global 'darkglow' namespace
  darkglow.registerComponents();
</script>
```

## Step 3: Include the CSS Styles

Add the following line to the `<head>` section of your HTML:

```html
<link rel="stylesheet" href="./path/to/darkglow/style.css">
```

## Step 4: Use the Components in HTML

Now you can use the components in your HTML:

```html
<darkglow-layout title="My Page">
  <div slot="header">
    <h1>My Application</h1>
  </div>
  <darkglow-container>
    <h2>Buttons</h2>
    <darkglow-button>Primary</darkglow-button>
    <darkglow-button variant="secondary">Secondary</darkglow-button>
    <darkglow-button variant="danger">Danger</darkglow-button>
    <darkglow-button variant="ghost">Ghost</darkglow-button>
  </darkglow-container>
  <div slot="footer">Footer Content</div>
</darkglow-layout>
```

## Available Components

The following components are available:

- `darkglow-button` - Button component
- `darkglow-button-group` - Button group component
- `darkglow-card` - Card component
- `darkglow-container` - Container component
- `darkglow-fader` - Fader component
- `darkglow-grid` - Grid component
- `darkglow-knob` - Knob component
- `darkglow-pad` - Pad component
- `darkglow-typography` - Typography component
- `darkglow-layout` - Layout component

## Example Project Structure

```
my-project/
├── index.html
├── js/
│   └── init-darkglow.js
└── darkglow/
    ├── darkglow.js
    ├── darkglow.js.map
    ├── darkglow.umd.cjs
    ├── darkglow.umd.cjs.map
    ├── style.css
    └── fonts/
        ├── Orbitron/
        └── Raleway/
```

## Requirements

- Modern browser with Web Components support
- No additional dependencies required

## Development

### TypeScript Implementation

This project uses TypeScript for type safety and better developer experience. The TypeScript implementation has been optimized for scalability with:

- A base component class for code reuse
- Centralized type system
- Component registry for easier management
- Path aliases for better imports
- Component-specific type definitions

For more details on the TypeScript implementation, see [TYPESCRIPT.md](./TYPESCRIPT.md).

## Customization

You can customize the component prefix when registering the components:

```javascript
// Register with a custom prefix
registerComponents('custom');
```

This would change the component names to `custom-button`, `custom-card`, etc.