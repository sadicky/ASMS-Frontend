import type { MenuItemType } from "@/components/layouts/SideNav/menu";

export const filterMenuByRole = (
  menus: MenuItemType[],
  userRoles: string[]
): MenuItemType[] => {
  return menus
    .map(menu => {
      // 🔐 SI roles existe → vérifier
      if (menu.roles && !menu.roles.some(r => userRoles.includes(r))) {
        return null;
      }

      // 🔁 gérer enfants
      if (menu.children) {
        const filteredChildren = filterMenuByRole(menu.children, userRoles);

        // ❌ cacher parent si aucun enfant visible
        if (filteredChildren.length === 0) return null;

        return {
          ...menu,
          children: filteredChildren,
        };
      }

      return menu;
    })
    .filter(Boolean) as MenuItemType[];
};