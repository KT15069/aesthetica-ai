import { Home, Image, User, Moon, Sun } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { title: 'Home', url: '/', icon: Home },
    { title: 'My Generations', url: '/generations', icon: Image },
    { title: 'Profile', url: '/profile', icon: User },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-6"
          >
            <h1 className="text-xl font-bold gradient-text">AI Studio</h1>
          </motion.div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `transition-all duration-300 ${
                            isActive
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-accent/50'
                          }`
                        }
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.div>
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: menuItems.length * 0.1 }}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={toggleTheme} className="transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </motion.div>
                    <span>Toggle Theme</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </motion.div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
