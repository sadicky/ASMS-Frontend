export const filterMenuByRole = (
  menus: MenuItemType[],
  userRoles: string[]
): MenuItemType[] => {
  return menus
    .map(menu => {
      // 🔐 Vérifier accès menu parent
      const hasAccess =
        !menu.roles || menu.roles.some(role => userRoles.includes(role));

      if (!hasAccess) return null;

      // 🔁 Si children → filtrer récursivement
      if (menu.children) {
        const filteredChildren = filterMenuByRole(menu.children, userRoles);

        // ❌ Si aucun enfant autorisé → cacher le parent
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