# Minimalistic Calculator - Design Guidelines

## Design Approach
**System Selected:** Apple Human Interface Guidelines (HIG) with Material Design button principles  
**Rationale:** Calculator is a utility-focused tool requiring clarity, precision, and zero cognitive load. Apple's minimalist approach combined with Material's tactile button feedback creates the optimal experience.

**Key Design Principles:**
- Clarity over decoration - every pixel serves function
- Instant visual feedback for all interactions
- Zero learning curve - intuitive button hierarchy
- Monochromatic elegance with subtle depth

---

## Color Palette

**Dark Mode (Primary):**
- Background: `220 15% 12%` (deep charcoal)
- Display panel: `220 15% 8%` (darker inset)
- Number buttons: `220 10% 22%` (medium gray)
- Operator buttons: `220 12% 18%` (slightly darker)
- Equals/Primary action: `210 100% 50%` (crisp blue accent)
- Text on display: `0 0% 98%` (near white)
- Button text: `0 0% 92%` (soft white)

**Light Mode:**
- Background: `0 0% 98%` (off-white)
- Display panel: `0 0% 100%` (pure white)
- Number buttons: `220 10% 90%` (light gray)
- Operator buttons: `220 8% 80%` (medium-light gray)
- Equals/Primary action: `210 100% 50%` (same blue)
- Text: `220 15% 20%` (dark charcoal)

---

## Typography

**Font Family:** 
- Display numbers: `'SF Mono', 'Roboto Mono', monospace` (tabular numerals)
- Button labels: `'Inter', 'SF Pro', system-ui, sans-serif`

**Sizing:**
- Display: `text-4xl md:text-5xl` (48-60px) - Right-aligned
- Primary buttons: `text-2xl` (24px) - Numbers
- Operator buttons: `text-xl` (20px) - Symbols

**Weights:**
- Display: `font-light` (300)
- Buttons: `font-medium` (500)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of `2, 4, 6, 8, 12, 16`

**Container:**
- Max width: `400px` centered on viewport
- Padding: `p-6 md:p-8`
- Border radius: `rounded-2xl`
- Subtle shadow: `shadow-2xl` for depth

**Grid Structure:**
```
Display Panel (1 row, full width)
- Height: h-24 (96px)
- Padding: p-6
- Right-aligned text

Button Grid (5 rows × 4 columns)
- Gap: gap-2 or gap-3 (8-12px)
- Equal button sizes: aspect-square
- Responsive: Full width on mobile, fixed on desktop
```

**Button Layout:**
```
[AC] [+/-] [%]  [÷]
[7]  [8]   [9]  [×]
[4]  [5]   [6]  [−]
[1]  [2]   [3]  [+]
[0 - spans 2 cols] [.] [=]
```

---

## Component Library

**Display Panel:**
- Inset appearance with subtle inner shadow
- Right-aligned monospace numbers
- Show current input OR result
- Truncate overflow with ellipsis
- Min-height to prevent layout shift

**Number Buttons (0-9):**
- Rounded corners: `rounded-xl`
- Hover: Brightness increase 10%
- Active: Scale down slightly `scale-95`
- Transition: `transition-all duration-150`
- Zero button spans 2 columns (rectangular)

**Operator Buttons (+, −, ×, ÷):**
- Slightly darker than number buttons
- Same size and rounding as numbers
- Distinct visual weight through color

**Special Buttons:**
- AC (All Clear): Standard operator styling
- +/− (Negate): Standard operator styling  
- % (Percent): Standard operator styling
- = (Equals): Primary blue accent color, most prominent

**Interactive States:**
- Hover: Subtle brightness increase
- Active/Pressed: `scale-95` transform
- Focus (keyboard): 2px blue ring offset
- No ripple effects (keep minimalist)

---

## Functional Specifications

**Keyboard Support:**
- Numbers 0-9: Direct input
- Operators: +, -, *, /
- Enter/Return: Calculate
- Escape: Clear (AC)
- Backspace: Delete last digit
- . (period): Decimal point

**Display Behavior:**
- Max digits: 12-15 before scientific notation
- Decimal precision: 8 places
- Auto-format large numbers with commas
- Error states: Show "Error" in red tint

**Accessibility:**
- All buttons have proper ARIA labels
- Tab navigation follows logical order
- Screen reader announces calculations
- High contrast mode support

---

## Animations

**Minimal Motion:**
- Button press: 150ms scale transform only
- NO loading spinners or complex animations
- Instant display updates (no counting effects)
- Smooth mode toggle: 200ms fade

**Purpose:** Every animation serves immediate tactile feedback, nothing decorative.

---

## Dark/Light Mode Toggle

- Subtle icon button in top-right corner of calculator
- Moon/Sun icon (16px)
- Smooth transition: 300ms for color changes
- Persist preference in localStorage

---

## Technical Notes

- Single-page application, no routing needed
- Center calculator on viewport (flexbox)
- Background: Subtle gradient or solid color
- No external images required
- Icons: Use Heroicons for mode toggle only

**Critical:** This is a focused utility tool. Every design decision prioritizes speed, clarity, and zero friction. No marketing elements, no hero sections, just pure functional excellence.