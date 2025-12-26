import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function UserSidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
            <div className="px-6 py-4 text-lg font-semibold border-b border-gray-700">
                User Menu
            </div>

            <nav className="mt-4 space-y-1">
                <ResponsiveNavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                    className="block px-6 py-2 hover:bg-gray-700"
                >
                    Dashboard
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('products.index')}
                    active={route().current('products.index')}
                    className="block px-6 py-2 hover:bg-gray-700"
                >
                    Products
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('cart.index')}
                    active={route().current('cart.index')}
                    className="block px-6 py-2 hover:bg-gray-700"
                >
                    Cart / Orders
                </ResponsiveNavLink>

                <ResponsiveNavLink
                    href={route('profile.edit')}
                    active={route().current('profile.edit')}
                    className="block px-6 py-2 hover:bg-gray-700"
                >
                    Profile
                </ResponsiveNavLink>
            </nav>
        </aside>
    );
}
