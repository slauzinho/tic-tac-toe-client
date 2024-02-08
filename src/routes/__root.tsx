import { ModeToggle } from '@/components/mode-toggle';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex items-center justify-between h-16 gap-2 p-2 px-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <ModeToggle />
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
