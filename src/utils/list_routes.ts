import express from 'express';

export const listRoutes = (app: express.Express) => {
    const routes: any[] = [];

    // Function to extract route info
    const extractRouteInfo = (layer: any) => {
        if (layer.route) {

            // Route directly on app
            const path = layer.route.path;
            const methods = Object.keys(layer.route.methods)
                .filter(method => layer.route.methods[method])
                .map(method => method.toUpperCase());
            if (methods.includes("MIDDLEWARE")) {
                return;
            }
            console.log(`1st`);
            routes.push({
                path,
                methods,
                middleware: layer.route.stack
                    .filter((handler: any) => handler.name !== 'bound dispatch')
                    .map((handler: any) => handler.name || '<anonymous>')
            });
        } else if (layer.name === 'router') {
            console.log("2nd", layer);

            // Router middleware
            layer.handle.stack.forEach(extractRouteInfo);
        }
    };

    // Extract routes from main app
    app._router.stack.forEach(extractRouteInfo);

    // Format and log routes
    console.log('\n=== Registered Routes ===\n');
    routes.forEach(route => {
        console.log(`Path: ${route.path}`);
        console.log(`Methods: ${route.methods.join(', ')}`);
        console.log(`Middleware: ${route.middleware.join(', ')}`);
        console.log('------------------------\n');
    });

    return routes; // Return routes array for programmatic use if needed
};
