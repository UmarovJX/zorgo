export default {
    sortedItems() {
        return [
            { type: "", permissions: [], header: "Общее" },
            ...this.commonItems,
            { type: "", permissions: [], header: "Страхование" },
            ...this.insuranseItems,
            { type: "", permissions: [], header: "Маркетплейс" },
            ...this.marketplaceItems,
            { type: "", permissions: [], header: "Машины" },
            ...this.autoItems,
            { type: "", permissions: [], header: "Пользователи" },
            ...this.userItems,
        ];
    },
    commonItems() {
        const res = [];
        res.push(this.items.find((el) => el.type === "partner"));
        res.push(this.items.find((el) => el.type === "section"));
        res.push(this.items.find((el) => el.type === "setting"));
        res.push(this.items.find((el) => el.type === "notification"));
        return res;
    },
    insuranseItems() {
        const res = [];
        res.push(this.items.find((el) => el.type === "service"));
        res.push(this.items.find((el) => el.type === "osago"));
        res.push(this.items.find((el) => el.type === "kasko"));
        res.push(this.items.find((el) => el.type === "travel"));
        res.push(this.items.find((el) => el.type === "description"));
        res.push(this.items.find((el) => el.type === "public-offer"));
        res.push(this.items.find((el) => el.type === "company"));
        res.push(this.items.find((el) => el.type === "wallet-transaction"));
        res.push(this.items.find((el) => el.type === "client"));
        return res;
    },
    marketplaceItems() {
        const res = [];
        res.push(this.items.find((el) => el.type === "dealer"));
        res.push(this.items.find((el) => el.type === "category"));
        res.push(this.items.find((el) => el.type === "order"));
        res.push(this.items.find((el) => el.type === "product"));
        res.push(this.items.find((el) => el.type === "promo-code"));
        res.push(this.items.find((el) => el.type === "compilation"));
        res.push(this.items.find((el) => el.type === "banner"));
        res.push(this.items.find((el) => el.type === "specification"));
        res.push(this.items.find((el) => el.type === "unit"));
        res.push(this.items.find((el) => el.type === "region"));
        res.push(this.items.find((el) => el.type === "city"));
        res.push(this.items.find((el) => el.type === "feedback"));
        return res;
    },
    autoItems() {
        const res = [];
        res.push(this.items.find((el) => el.type === "brand"));
        res.push(this.items.find((el) => el.type === "model"));
        res.push(this.items.find((el) => el.type === "year"));
        return res;
    },
    userItems() {
        const res = [];
        res.push(this.items.find((el) => el.type === "user"));
        res.push(this.items.find((el) => el.type === "role"));
        return res;
    },
};
