# TalentBridge Gaza

A job platform connecting talented individuals with opportunities in Gaza, Palestine.

## 🎨 Design System

This project uses a custom Tailwind CSS design system with the following color palette:

### Colors
- `primary-green` (#4A6741) - Brand identity, buttons, titles
- `warm-sand` (#EADBB0) - Backgrounds, secondary UI
- `crimson-red` (#D63C3C) - Warnings, delete actions
- `sky-blue` (#4A90E2) - Links, success messages
- `charcoal` (#2F2F2F) - Text, dark sections
- `light-gray` (#F2F2F2) - Backgrounds

### Components

#### Form Components
- `Input` - Text, email, password, tel, url inputs
- `Select` - Dropdown selections
- `Textarea` - Multi-line text input
- `RadioGroup` - Radio button groups
- `Checkbox` - Single checkbox
- `Form` - Form wrapper with React Hook Form + Zod

#### UI Components
- `Button` - Primary, secondary, destructive variants
- `Alert` - Success, error, warning messages
- `Badge` - Status indicators (applied, pending, rejected, remote)
- `Card` - Content containers

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm start
   ```

3. View the design system demo:
   Navigate to `/demo` to see all components in action.

## 📝 Form Validation

The project uses React Hook Form with Zod validation. Available schemas include:
- `userRegistrationSchema`
- `userLoginSchema`
- `jobApplicationSchema`
- `contactFormSchema`

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- React Router
