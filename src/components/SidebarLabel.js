import React from 'react';
import { splitPlatformLabel } from './platformBadges';

// Sidebar entry label: a colour-coded SoC chip followed by the model name.
// Rendered inside the native <a class="menu__link">, so hover / active states
// and keyboard focus keep working unchanged.
export default function SidebarLabel({ item }) {
  const { label, platform } = splitPlatformLabel(
    item.label || '',
    item.href || '',
  );

  if (!platform) {
    return label;
  }

  return (
    <>
      <span className={`tb-plat tb-plat--${platform.key}`}>
        {platform.label}
      </span>
      <span className="tb-plat-model">{label}</span>
    </>
  );
}
