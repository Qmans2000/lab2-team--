# Minimalistic Calculator

## Overview
A beautiful, minimalistic calculator web application with a clean interface, smooth interactions, and full keyboard support. Built with React, TypeScript, and Tailwind CSS following Apple HIG design principles.

## Features
- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, division
- **Clean Interface**: Minimalist design with focus on clarity and usability
- **Keyboard Support**: Full keyboard navigation (numbers, operators, Enter, Escape, Backspace)
- **Dark/Light Mode**: Toggle between themes with persistent localStorage
- **Responsive Design**: Works beautifully on all screen sizes
- **Smooth Interactions**: Subtle hover and active states on all buttons
- **Error Handling**: Division by zero detection and error display

## User Interface
- **Display Panel**: Large, monospace number display with right-aligned text
- **Number Buttons (0-9)**: Clean gray buttons with smooth hover effects
- **Operator Buttons (+, −, ×, ÷)**: Slightly darker styling for distinction
- **Special Buttons**: 
  - AC (All Clear): Resets calculator
  - +/− (Negate): Toggles positive/negative
  - % (Percent): Converts to percentage
  - = (Equals): Primary blue accent button for calculation
- **Zero Button**: Spans 2 columns for ergonomic thumb typing

## Keyboard Shortcuts
- `0-9`: Number input
- `.`: Decimal point
- `+`, `-`, `*`, `/`: Operators
- `Enter` or `=`: Calculate result
- `Escape` or `C`: Clear all
- `Backspace`: Delete last digit

## Design System
- **Color Scheme**: Monochromatic with blue accent for primary action
- **Typography**: SF Mono/Roboto Mono for display, Inter for buttons
- **Spacing**: Consistent 12px gaps between buttons
- **Interactions**: Subtle brightness adjustments on hover/active states
- **Shadows**: Subtle depth with card shadow and inner shadow on display

## Technical Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI (Button, Card)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: Express (serves frontend only)

## Project Structure
```
client/src/
  ├── pages/
  │   └── Calculator.tsx    # Main calculator component
  ├── App.tsx               # App router
  └── index.css             # Design tokens and utility classes
```

## Recent Changes
- October 19, 2025: Initial calculator implementation
  - Built complete calculator UI with grid layout
  - Implemented calculation logic with operator precedence
  - Added keyboard support for all functions
  - Integrated dark/light mode toggle
  - Added error handling for division by zero
  - Configured design tokens following minimalist guidelines
