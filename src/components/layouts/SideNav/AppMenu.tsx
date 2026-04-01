import { ROLE_BASE_PATH } from "@/helpers/constants";
import { Link, useLocation } from 'react-router-dom';
import { LuChevronRight } from 'react-icons/lu';
import { menuItemsData, type MenuItemType } from './menu';
import { filterMenuByRole } from '@/utils/menuFilter';
import { useEffect, useState } from 'react';

// Vérifie si un item ou ses enfants sont actifs
const isItemActive = (
  item: MenuItemType,
  pathname: string,
  basePath: string
): boolean => {
  if (item.href && pathname === `${basePath}${item.href}`) return true;

  if (item.children) {
    return item.children.some(child =>
      isItemActive(child, pathname, basePath)
    );
  }

  return false;
};

// Menu avec sous-menu
const MenuItemWithChildren = ({ item, basePath }: { item: MenuItemType; basePath: string }) => {
  const { pathname } = useLocation();
  const Icon = item.icon;

  // 🔹 state local pour savoir si le sous-menu est ouvert
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 ouvrir automatiquement si un enfant est actif
  const isItemActive = (
  item: MenuItemType,
  pathname: string,
  basePath: string
): boolean => {
  if (item.href && pathname === `${basePath}${item.href}`) return true;

  if (item.children) {
    return item.children.some(child =>
      isItemActive(child, pathname, basePath)
    );
  }

  return false;
};

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <li className={`menu-item hs-accordion ${isOpen ? 'active' : ''}`}>
      <button
        className={`hs-accordion-toggle menu-link ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu} // 🔹 toggle sur clic
      >
        {Icon && <span className="menu-icon"><Icon /></span>}
        <span className="menu-text">{item.label}</span>
        <span className="menu-arrow"><LuChevronRight /></span>
      </button>

      <ul className={`sub-menu ${isOpen ? 'block' : 'hidden'}`}>
        {item.children?.map((child: MenuItemType) =>
          child.children ? (
            <MenuItemWithChildren key={child.key} item={child} basePath={basePath} />
          ) : (
            <MenuItem key={child.key} item={child} basePath={basePath} />
          )
        )}
      </ul>
    </li>
  );
};

// Menu simple
const MenuItem = ({ item, basePath }: { item: MenuItemType; basePath: string }) => {
  const { pathname } = useLocation();
  const Icon = item.icon;
  const isActive = pathname === `${basePath}${item.href}`;

  return (
    <li className={`menu-item ${isActive ? 'active' : ''}`}>
      <Link to={`${basePath}${item.href}`} className={`menu-link ${isActive ? 'active' : ''}`}>
        {Icon && <span className="menu-icon"><Icon /></span>}
        <div className="menu-text">{item.label}</div>
      </Link>
    </li>
  );
};

// Menu principal
const AppMenu = () => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const [basePath, setBasePath] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const role = user?.roles?.[0];
    const base = ROLE_BASE_PATH[role] || "";

    setBasePath(base);

    const filteredMenu = filterMenuByRole(menuItemsData, user.roles || []);
    setMenu(filteredMenu);
  }, []);

  return (
    <ul className="side-nav p-3">
      {menu.map((item: MenuItemType) =>
        item.isTitle ? (
          <li className="menu-title" key={item.key}>
            <span>{item.label}</span>
          </li>
        ) : item.children ? (
          <MenuItemWithChildren key={item.key} item={item} basePath={basePath} />
        ) : (
          <MenuItem key={item.key} item={item} basePath={basePath} />
        )
      )}
    </ul>
  );
};

export default AppMenu;