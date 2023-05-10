import { axiosInstance } from "@/services/core/base";

import Auth from "@/services/auth";
import Common from "@/services/common";
import Roles from "@/services/roles";
import Permissions from "@/services/permissions";
import Users from "@/services/users";
import Services from "@/services/services";
import Brands from "@/services/brands";
import Years from "@/services/years";
import Models from "@/services/models";
import Osago from "@/services/osago";
import Travels from "@/services/travels";
import Companies from "@/services/companies";
//Marketplace
import MarketplaceCommon from "@/services/marketplace/common";
import MarketplaceCategories from "@/services/marketplace/categories";
import MarketplaceOrders from "@/services/marketplace/orders";
import MarketplaceProducts from "@/services/marketplace/products";
import MarketplaceSpecifications from "@/services/marketplace/specifications";
import MarketplaceUnits from "@/services/marketplace/units";
import MarketplaceDealers from "@/services/marketplace/dealers";
import MarketplaceCompilations from "@/services/marketplace/compilations";

export default {
    getBaseURL() {
        return axiosInstance.defaults.baseURL;
    },
    common: new Common(),
    auth: new Auth(),
    roles: new Roles(),
    permissions: new Permissions(),
    users: new Users(),
    services: new Services(),
    brands: new Brands(),
    years: new Years(),
    models: new Models(),
    osago: new Osago(),
    travels: new Travels(),
    companies: new Companies(),
    //Marketplace
    marketplaceCommon: new MarketplaceCommon(),
    categories: new MarketplaceCategories(),
    orders: new MarketplaceOrders(),
    products: new MarketplaceProducts(),
    specifications: new MarketplaceSpecifications(),
    units: new MarketplaceUnits(),
    dealers: new MarketplaceDealers(),
    compilations: new MarketplaceCompilations(),
};
