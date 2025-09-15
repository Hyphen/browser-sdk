![Hyphen AI](https://github.com/Hyphen/nodejs-sdk/raw/main/logo.png)

[![tests](https://github.com/Hyphen/nodejs-toggle-sdk/actions/workflows/tests.yaml/badge.svg)](https://github.com/Hyphen/nodejs-toggle-sdk/actions/workflows/tests.yaml)
[![npm](https://img.shields.io/npm/v/@hyphen/toggle)](https://www.npmjs.com/package/@hyphen/toggle)
[![npm](https://img.shields.io/npm/dm/@hyphen/toggle)](https://www.npmjs.com/package/@hyphen/toggle)
[![license](https://img.shields.io/github/license/Hyphen/nodejs-toggle-sdk)](https://github.com/hyphen/nodejs-toggle-sdk/blob/main/LICENSE)

# Hyphen Browser SDK

The Hyphen Browser SDK is used as a base library to get evaluations and works for browsers and the base for javascript libraries such as react, vuejs, svelte, etc . For the full featured nodejs sdk use [@hyphen/sdk](https://npmjs.com/package/@hyphen/sdk)

# Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Setup](#basic-setup)
  - [Using Helper Methods](#using-helper-methods)
    - [Boolean Toggles](#boolean-toggles)
    - [String Toggles](#string-toggles)
    - [Number Toggles](#number-toggles)
    - [Object Toggles](#object-toggles)
  - [Using the Generic `get()` Method](#using-the-generic-get-method)
  - [Context Override](#context-override)
  - [Browser Integration Example](#browser-integration-example)
    - [Using ES Modules](#using-es-modules)
    - [Using jsDelivr CDN](#using-jsdelivr-cdn)
- [API Reference](#api-reference)
  - [Constructor Options](#constructor-options)
  - [Helper Methods](#helper-methods)
- [Contributing](#contributing)
- [License and Copyright](#license-and-copyright)

# Installation

Install the package using npm, yarn, or pnpm:

```bash
npm install @hyphen/browser-sdk
```

For browser usage via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@hyphen/browser-sdk@latest/dist/index.browser.js"></script>
```

# Usage

## Basic Setup

```javascript
import { Toggle } from '@hyphen/browser-sdk';

// Initialize the Toggle client
const toggle = new Toggle({
  publicApiKey: 'public_your-api-key-here',
  applicationId: 'your-app-id',
  environment: 'production', // or 'development'
  defaultContext: {
    targetingKey: 'user-123',
    user: {
      id: 'user-123',
      email: 'user@example.com',
      name: 'John Doe'
    }
  }
});
```

## Using Helper Methods

The SDK provides type-safe helper methods for common data types:

### Boolean Toggles

```javascript
const isFeatureEnabled = await toggle.getBoolean('feature-flag', false);
if (isFeatureEnabled) {
  console.log('Feature is enabled!');
}
```

### String Toggles

```javascript
const welcomeMessage = await toggle.getString('welcome-message', 'Hello World');
document.getElementById('welcome').textContent = welcomeMessage;
```

### Number Toggles

```javascript
const maxRetries = await toggle.getNumber('max-retries', 3);
const timeout = await toggle.getNumber('api-timeout', 5000);
```

### Object Toggles

```javascript
const config = await toggle.getObject('app-config', { theme: 'light' });
console.log('App configuration:', config);
```

## Using the Generic `get()` Method

```javascript
// Generic method with type parameter
const feature = await toggle.get<boolean>('feature-toggle', false);
const settings = await toggle.get<object>('user-settings', {});
```

## Context Override

You can override the default context for specific evaluations:

```javascript
const customContext = {
  targetingKey: 'special-user',
  user: { id: 'special-user', plan: 'premium' },
  customAttributes: { region: 'us-west' }
};

const result = await toggle.getBoolean('premium-feature', false, {
  context: customContext
});
```

## Browser Integration Example

### Using ES Modules

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hyphen Toggle Example</title>
</head>
<body>
  <div id="feature-content" style="display: none;">
    <h2>Premium Feature</h2>
    <p>This content is only shown when the feature is enabled!</p>
  </div>

  <script type="module">
    import { Toggle } from '@hyphen/browser-sdk';

    const toggle = new Toggle({
      publicApiKey: 'public_your-api-key-here',
      applicationId: 'your-app-id',
      defaultContext: {
        targetingKey: 'anonymous-user',
        customAttributes: {
          plan: 'free'
        }
      }
    });

    // Check if premium feature is enabled
    const isPremiumEnabled = await toggle.getBoolean('premium-feature', false);
    
    if (isPremiumEnabled) {
      document.getElementById('feature-content').style.display = 'block';
    }

    // Dynamic configuration
    const theme = await toggle.getString('app-theme', 'light');
    document.body.className = `theme-${theme}`;
  </script>
</body>
</html>
```

### Using jsDelivr CDN

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hyphen Toggle Example</title>
  <script src="https://cdn.jsdelivr.net/npm/@hyphen/browser-sdk@latest/dist/index.browser.js"></script>
</head>
<body>
  <div id="feature-content" style="display: none;">
    <h2>Premium Feature</h2>
    <p>This content is only shown when the feature is enabled!</p>
  </div>

  <script>
    // HyphenBrowserSDK is available as a global variable
    const { Toggle } = HyphenBrowserSDK;

    const toggle = new Toggle({
      publicApiKey: 'public_your-api-key-here',
      applicationId: 'your-app-id',
      defaultContext: {
        targetingKey: 'anonymous-user',
        customAttributes: {
          plan: 'free'
        }
      }
    });

    // Use async function for top-level await support
    (async () => {
      // Check if premium feature is enabled
      const isPremiumEnabled = await toggle.getBoolean('premium-feature', false);
      
      if (isPremiumEnabled) {
        document.getElementById('feature-content').style.display = 'block';
      }

      // Dynamic configuration
      const theme = await toggle.getString('app-theme', 'light');
      document.body.className = `theme-${theme}`;
    })();
  </script>
</body>
</html>
```

# API Reference

## Constructor Options

- `publicApiKey` (string): Your Hyphen public API key
- `applicationId` (string): Your application identifier
- `environment` (string, optional): Environment name (default: 'development')
- `defaultContext` (ToggleContext, optional): Default evaluation context
- `horizonUrls` (string[], optional): Custom Horizon endpoint URLs
- `defaultTargetKey` (string, optional): Default targeting key

## Helper Methods

- `getBoolean(toggleKey, defaultValue, options?)` - Get boolean toggle
- `getString(toggleKey, defaultValue, options?)` - Get string toggle  
- `getNumber(toggleKey, defaultValue, options?)` - Get number toggle
- `getObject<T>(toggleKey, defaultValue, options?)` - Get object toggle
- `get<T>(toggleKey, defaultValue, options?)` - Generic toggle getter

# Contributing

We welcome contributions to the Hyphen Node.js SDK! If you have an idea for a new feature, bug fix, or improvement, please follow the [Contribution](./CONTRIBUTING.md) guidelines and our [Code of Conduct](./CODE_OF_CONDUCT.md).

# License and Copyright
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
The copyright for this project is held by Hyphen, Inc. All rights reserved.