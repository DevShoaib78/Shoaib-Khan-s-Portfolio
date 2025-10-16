# Typography Quick Reference Guide

## 🎯 Quick Font Selection

### Need a heading? → **Syne**
```tsx
<h1 className="font-display font-extrabold" style={{ letterSpacing: '-0.03em' }}>
  Your Heading
</h1>
```

### Need body text? → **DM Sans**
```tsx
<p className="font-body" style={{ letterSpacing: '-0.01em' }}>
  Your paragraph text here.
</p>
```

### Need an accent? → **Manrope**
```tsx
<span className="font-accent font-medium" style={{ letterSpacing: '-0.01em' }}>
  Your accent text
</span>
```

---

## 📐 Common Patterns

### Hero Section Title
```tsx
<h1 className="text-6xl md:text-8xl font-display font-extrabold" 
    style={{ letterSpacing: '-0.03em' }}>
  <span className="gradient-text">Shoaib</span>
  <br />
  <span className="text-white">Khan</span>
</h1>
```

### Section Heading
```tsx
<h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8" 
    style={{ letterSpacing: '-0.02em' }}>
  About <span className="gradient-text">Me</span>
</h2>
```

### Subtitle/Caption
```tsx
<p className="text-xl md:text-2xl font-accent font-medium" 
   style={{ letterSpacing: '-0.01em' }}>
  Content Creator, Director, Video Editor & Entrepreneur
</p>
```

### Body Paragraph
```tsx
<p className="text-xl text-gray-300 font-body leading-relaxed" 
   style={{ letterSpacing: '-0.01em' }}>
  Your content here...
</p>
```

### Button
```tsx
<button className="px-8 py-4 bg-primary text-black font-body font-semibold rounded-full" 
        style={{ letterSpacing: '-0.01em' }}>
  Get In Touch
</button>
```

### Navigation Link
```tsx
<button className="font-body font-semibold" 
        style={{ letterSpacing: '-0.01em' }}>
  About
</button>
```

### Logo
```tsx
<h2 className="text-xl md:text-2xl font-display font-extrabold gradient-text" 
    style={{ letterSpacing: '-0.02em' }}>
  Shoaib Khan
</h2>
```

---

## 🎨 Font Weight Reference

| Weight | Value | Use Case |
|--------|-------|----------|
| Extrabold | 800 | Hero titles only |
| Bold | 700 | Section headings |
| Semibold | 600 | Buttons, navigation, emphasis |
| Medium | 500 | Accent text, subheadings |
| Regular | 400 | Body paragraphs |
| Light | 300 | Rarely used |

---

## 📏 Letter Spacing Reference

| Spacing | Value | Use Case |
|---------|-------|----------|
| Tight | -0.03em | Hero display text (Syne) |
| Tight | -0.02em | Section headings (Syne) |
| Slightly Tight | -0.01em | Body text (DM Sans), Accents (Manrope) |
| Wide | 0.05em | Special cases (e.g., "It's" in splash) |

---

## 🎯 Decision Tree

```
Need text? 
├─ Is it a major heading or logo?
│  └─ YES → Use Syne (font-display)
│     ├─ Hero title? → font-extrabold, -0.03em
│     └─ Section heading? → font-extrabold, -0.02em
│
├─ Is it body content, navigation, or a button?
│  └─ YES → Use DM Sans (font-body)
│     ├─ Paragraph? → font-regular, -0.01em
│     ├─ Button/Nav? → font-semibold, -0.01em
│     └─ Emphasis? → font-medium to font-semibold
│
└─ Is it a subtitle, caption, or accent?
   └─ YES → Use Manrope (font-accent)
      ├─ Service title? → font-semibold, -0.01em
      ├─ Caption? → font-medium, -0.01em
      └─ Special case? → font-normal, adjust spacing
```

---

## ✅ Dos and Don'ts

### ✅ DO
- Use Syne for all major headings
- Use DM Sans for all readable content
- Use Manrope for stylistic accents
- Apply consistent letter spacing
- Use appropriate font weights for hierarchy
- Keep color palette strict (black, gold, white)

### ❌ DON'T
- Mix all three fonts in one text block
- Use light weights for headings
- Use bold weights for body text
- Forget letter spacing inline styles
- Use colors outside the palette
- Use Syne for long paragraphs (readability)

---

## 🚀 Copy-Paste Snippets

### Complete Hero Title
```tsx
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.7 }}
  className="text-6xl md:text-8xl font-display font-extrabold mb-6"
  style={{ letterSpacing: '-0.03em' }}
>
  <span className="gradient-text">Shoaib</span>
  <br />
  <span className="text-white">Khan</span>
</motion.h1>
```

### Complete Section Header
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="text-center"
>
  <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8" 
      style={{ letterSpacing: '-0.02em' }}>
    About <span className="gradient-text">Me</span>
  </h2>
  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-body" 
     style={{ letterSpacing: '-0.01em' }}>
    Your content here...
  </p>
</motion.div>
```

### Complete Button
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => handleClick()}
  className="px-8 py-4 bg-primary text-black font-body font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300"
  style={{ letterSpacing: '-0.01em' }}
>
  Button Text
</motion.button>
```

---

## 🎨 Color Classes Reference

### Text Colors
- `text-white` - Primary text (#FFFFFF)
- `text-gray-300` - Secondary text (#D1D5DB)
- `text-black` - On gold backgrounds (#000000)
- `text-primary` - Gold text (#FFBD59)

### Background Colors
- `bg-black` - Main background (#000000)
- `bg-primary` - Gold background (#FFBD59)
- `bg-white/10` - Subtle white overlay
- `bg-black/80` - Semi-transparent black

### Special Classes
- `gradient-text` - Gold gradient text effect
- `glass` - Glass morphism effect

---

This quick reference should help you maintain consistent typography throughout the site!
