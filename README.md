# React Grid Resizer

A lightweight React hook and context provider for implementing **resizable columns** in any table or grid layout.

## ✨ Features

- Easy-to-use hook: `useColumnResizer`
- Centralized config with context: `ColumnConfigProvider`
- Supports multiple grid/table contexts
- Clamp resizing between min/max widths
- Resize preview and visual feedback support

## 📦 Installation

```bash
npm install react-grid-resizer
```

> Note: This library requires React 17 or higher to be installed in your project.

---

## 🚀 Quick Start

### 1. Wrap your app in the provider

```tsx
import { ColumnConfigProvider } from 'react-grid-resizer';

const COLUMN_CONFIG = {
  myTable: [
    { id: 'name', label: 'Name', width: '2fr' },
    { id: 'age', label: 'Age', width: '1fr' },
    { id: 'email', label: 'Email', width: '2fr' },
  ]
};

function App() {
  return (
    <ColumnConfigProvider initialConfig={COLUMN_CONFIG}>
      <MyTable />
    </ColumnConfigProvider>
  );
}
```

---

### 2. Use the hook in your table component

```tsx
import { useColumnResizer } from 'react-grid-resizer';

function MyTable() {
  const { getContextConfig, resizePreviewLeft, startResize } =
    useColumnResizer({ context: 'myTable', minWidth: 60, maxWidth: 300 });

  const columns = getContextConfig('myTable');

  return (
    <div style={{ display: 'flex' }}>
      {columns.map((col) => (
        <div
          key={col.id}
          style={{ width: col.width, position: 'relative' }}
        >
          {col.label}
          <div
            onMouseDown={(e) =>
              startResize({ e, colId: col.id, colElement: e.currentTarget.parentElement! })
            }
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '4px',
              cursor: 'col-resize',
              background: 'transparent',
            }}
          />
        </div>
      ))}
      {/* Optional resize preview line */}
      {resizePreviewLeft !== null && (
        <div
          style={{
            position: 'absolute',
            left: resizePreviewLeft,
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: 'blue',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
```

---

## 🧠 Types

```ts
type ConfigItem = {
  id: string;
  label: string;
  width: string; // e.g. "2fr" or "150px"
};

type ColumnConfig<K extends string = string> = Record<K, ConfigItem[]>;
```

---

## 💡 Tip

Add this to your global CSS for smooth UX while resizing:

```css
.noselect {
  user-select: none;
}
```

---

## 📄 License

MIT © [Cristian Cureu](https://github.com/CristianCureu)
