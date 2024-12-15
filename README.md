
# 🌱 Greenspark Product Widgets - Frontend Task

![Node Version](https://img.shields.io/badge/node-22.12.0-brightgreen)
![npm](https://img.shields.io/badge/npm-10.9.0-blue)
![Vue Version](https://img.shields.io/badge/vue-3.5.13-brightgreen)

This project implements a widget management system, allowing users to view and customize product widgets dynamically. Below is a guide to understanding the project, setting it up, and exploring its structure.

Demo: [Greenspark Product Widgets](https://lustrous-gaufre-75edec.netlify.app/) 🌐
---

## 📖 Table of Contents
1. [Project Overview](#-project-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Installation and Setup](#%EF%B8%8F-installation-and-setup)
5. [File Structure](#-file-structure)
6. [Files Overview](#-files-overview)
7. [Design Choices](#-design-choices)
8. [Lottie Player Integration](#-lottie-player-integration)

---

## 🌟 Project Overview

This project involves creating a **frontend service** for managing **product widgets**. Users can:
* View a list of available widgets.
* Customize widget properties such as colors, active state, and linking to a profile.
* Ensure that only one widget is active at a time.

The project is built with **production-ready**, clean, and maintainable code following modern development practices.

---

## 🎨 Features
* **Dynamic Widget Display**: Fetch data from a mock API and display widgets.
* **Customizable Properties**: Modify widget colors, active state, and profile linkage.
* **Responsive Design**: Ensure the UI works across devices.
* **Component-based Architecture**: Modular and reusable Vue.js components.
* **Animation**: Integrated smooth animations using Lottie Player.

---

## 🛠 Tech Stack
* **Framework**: Vue.js
* **State Management**: Vuex
* **Styling**: CSS
* **Assets**: SVG icons and fonts
* **Animations**: Lottie Player for JSON-based animations
* **Build Tool**: Vue CLI

---

## ⚙️ Installation and Setup

To run the project locally:

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd greenspark-product-widgets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run serve
   ```
   The app will be accessible at the port indicated in the terminal (e.g., `http://localhost:<PORT>`).
   
4. To generate a production-ready build in the `dist/` folder, run:

   ```bash
   npm run build
   ```
   The optimized production files will be located in the `dist/` directory.

---

## 🗂 File Structure

Here is the structure of the repository:

```
greenspark-product-widgets/
├── dist/                  # Compiled production build
├── node_modules/          # Project dependencies
├── public/                # Public assets
│   ├── animations/        # Lottie JSON animations
│   │   ├── plant.json     # Example animation file
│   │   └── zoom.json
│   ├── favicon.ico        # Application favicon
│   └── index.html         # Entry point HTML file
├── src/
│   ├── assets/            # Static assets
│   │   ├── fonts/         # Font files
│   │   └── img/           # Images and SVG icons
│   ├── components/        # Vue components
│   │   ├── ProductWidget.vue       # Handles widget customization
│   │   ├── ProductWidgetList.vue   # Displays all widgets
│   │   ├── controls/
│   │   │   ├── ColorPicker.vue     # Badge color selector
│   │   │   ├── ToggleSwitch.vue    # Activation toggle
│   │   │   └── CustomCheckbox.vue  # Linked state management
│   │   ├── HeaderSvg.vue           # Displays static SVG icons
│   │   └── InfoTooltip.vue         # Tooltip for additional information
│   ├── styles/            # Global and component-specific styles
│   ├── store/             # Vuex state management
│   ├── App.vue            # Root Vue component
│   ├── main.js            # Application entry point
│   └── index.js           # Store initialization
├── .gitignore             # Files and folders to ignore in version control
└── package.json           # Project dependencies and scripts
```

---

## 🔍 Files Overview

### **store/index.js**
Manages global state with Vuex. Key features include:
* **State**: Tracks widgets, loading, and active widget ID.
* **Mutations**: Update state with functions like `setWidgets` and `setActiveWidget`.
* **Actions**: Fetch widgets from a mock API or `localStorage`.
* **Getters**: Retrieve state for components.

### **components/ProductWidgetList.vue**
The main container for listing widgets:
* Handles **state management**, **dynamic rendering**, and **user interactions**.
* Integrates Lottie animations for loading and empty states.

### **components/ProductWidget.vue**
Represents an individual widget:
* Includes controls like **ColorPicker**, **ToggleSwitch**, and **CustomCheckbox** for customization.
* Manages the widget’s active state and appearance.

### **controls/ColorPicker.vue**
Allows users to select a widget badge color:
* Validates colors and provides keyboard accessibility.
* Emits a `select` event to update parent components.

### **controls/ToggleSwitch.vue**
Handles widget activation:
* Designed for **radio-like behavior** to manage active states.
* Emits events for updates to the parent component.

### **controls/CustomCheckbox.vue**
A custom checkbox for toggling linked states:
* Provides a clean design with two-way binding via `change` events.

### **HeaderSvg.vue**
Displays static SVG icons:
* Encapsulates reusable graphics for consistent use across components.

### **InfoTooltip.vue**
Interactive tooltip for additional information:
* Supports hover, focus, and click triggers.
* Includes a default slot for flexible content.

---

## 🎯 Development Approach
* **Reusable Components**: Modular components for scalability and maintainability.
* **State Management**: Centralized handling with Vuex.
* **Animations**: Lottie Player for smooth visual effects.

---

## 📦 Lottie Player Integration
Lottie Player is integrated to enhance the UI with animations:
* Example animations: `plant.json` and `zoom.json`.
* Fully managed via npm with no extra setup required.

---
