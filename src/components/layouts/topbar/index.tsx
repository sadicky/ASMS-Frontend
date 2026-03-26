import FrenchFlag from '@/assets/images/flags/french.jpg';
import UsFlag from '@/assets/images/flags/us.jpg';
import avatar1 from '@/assets/images/user/avatar-1.png';
import { Link, useNavigate } from 'react-router';
import { TbSearch } from 'react-icons/tb';
import SidenavToggle from './SidenavToggle';
import ThemeModeToggle from './ThemeModeToggle';
import { getUser } from "@/utils/getUser";
import { logout } from "@/services/auth.service";
import {
  LuLogOut,
  LuSettings,
} from 'react-icons/lu';
import type { ReactNode } from 'react';
import { appName } from '@/helpers/constants';



type Language = {
  src: string;
  label: string;
};


type ProfileMenuItem = {
  icon?: ReactNode;
  label?: string;
  to?: string;
  action?:  () => void;
  badge?: string;
  divider?: boolean;
};

const languages: Language[] = [
  { src: UsFlag, label: 'English' },
  { src: FrenchFlag, label: 'French' },
];


const Topbar = () => {
  const navigate = useNavigate();
const user = getUser();

const handleLogout = async () => {
  await logout();
  navigate("/auth");
};

const profileMenu: ProfileMenuItem[] = [
  {
    icon: <LuLogOut className="size-4" />,
    label: 'Sign Out',
    action: handleLogout,
  },
];
  return (
    <div className="app-header min-h-topbar-height flex items-center sticky top-0 z-30 bg-(--topbar-background) border-b border-default-200">
      <div className="w-full flex items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <SidenavToggle />

          <div className="lg:flex hidden items-center relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <TbSearch className="text-base" />
            </div>
            <input
              type="search"
              id="topbar-search"
              className="form-input px-12 text-sm rounded border-transparent focus:border-transparent w-60"
              placeholder="Search something..."
            />
            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-4">
              <span className="ms-auto font-medium">⌘ K</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="topbar-item hs-dropdown [--placement:bottom-right] relative inline-flex">
            <button
              className="hs-dropdown-toggle btn btn-icon size-8 hover:bg-default-150 rounded-full relative"
              type="button"
            >
              <img src={UsFlag} alt="us-flag" className="size-4.5 rounded" />
            </button>
            <div className="hs-dropdown-menu" role="menu">
              {languages.map((lang, i) => (
                <Link
                  key={i}
                  to="#"
                  className="flex items-center gap-x-3.5 py-1.5 px-3 text-default-600 hover:bg-default-150 rounded font-medium"
                >
                  <img src={lang.src} alt={lang.label} className="size-4 rounded-full" />
                  {lang.label}
                </Link>
              ))}
            </div>
          </div>

          <ThemeModeToggle />

            {/* setting */}
          <div className="topbar-item">
            <button
              className="btn btn-icon size-8 hover:bg-default-150 rounded-full"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="theme-customization"
              data-hs-overlay="#theme-customization"
            >
              <LuSettings className="size-4.5" />
            </button>
          </div>

          {/* user */}
          <div className="topbar-item hs-dropdown relative inline-flex">
            <button className="cursor-pointer bg-pink-100 rounded-full">
              <img src={avatar1} alt="user" className="hs-dropdown-toggle rounded-full size-9.5" />
            </button>
            <div className="hs-dropdown-menu min-w-48">
              <div className="p-2">
                <h6 className="mb-2 text-default-500">Welcome to {appName}</h6>
                <Link to="#!" className="flex gap-3">
                  <div className="relative inline-block">
                    <img src={avatar1} alt="user" className="size-12 rounded" />
                    <span className="-top-1 -end-1 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <h6 className="mb-1 text-sm font-semibold text-default-800"> {user?.email || "User"}</h6>
                    <p className="text-default-500">{user?.roles?.join(", ") || "No role"}</p>
                  </div>
                </Link>
              </div>

              <div className="border-t border-default-200 -mx-2 my-2"></div>

              <div className="flex flex-col gap-y-1">
                {profileMenu.map((item, i) =>
                  item.divider ? (
                    <div key={i} className="border-t border-default-200 -mx-2 my-1"></div>
                  ) : (
                    <Link
                      key={i}
                      onClick = {item.action}
                      className="flex items-center gap-x-3.5 py-1.5 px-3 text-default-600 hover:bg-default-150 rounded font-medium"
                    >
                      {item.icon}
                      {item.label}
                      {item.badge && (
                        <span className="size-4.5 font-semibold bg-danger rounded text-white flex items-center justify-center text-xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
