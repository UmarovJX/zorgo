const routeToPermission = {
    roles: ["show-role", false],
    "role-create": ["create-role", false],
    "role-update": ["update-role", false],
    users: ["show-user", false],
    "user-create": ["create-user", false],
    "user-update": ["update-user", false],
    services: ["show-service", false],
    "service-create": ["create-service", false],
    "service-update": ["update-service", false],
    brands: ["show-brand", false],
    "brand-create": ["create-brand", false],
    "brand-update": ["update-brand", false],
    years: ["show-year", false],
    "year-create": ["create-year", false],
    "year-update": ["update-year", false],
    models: ["show-model", false],
    "model-create": ["create-model", false],
    "model-update": ["update-model", false],
    osago: ["show-osago", false],
    "osago-show": ["show-osago", false],
    
};

export default function isRouteAvailable(name, params) {
    if (name === "auth-login") return true;
}
